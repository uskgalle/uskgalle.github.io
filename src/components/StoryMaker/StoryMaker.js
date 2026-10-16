'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './StoryMaker.module.css';

const CAPTION = 'A little of Galle, through my sketchbook. 🎨\nSketched on location with Urban Sketchers Galle.\n\nScan the QR code or visit my profile to explore more of my work.';
const HASHTAGS = '#USKGalle #UrbanSketchersGalle #UrbanSketchers';
const PRESETS = { current: '#f6f0e6', white: '#ffffff', black: '#000000' };

function textColor(background) {
    const channels = background.match(/[a-f\d]{2}/gi).map(value => {
        const channel = parseInt(value, 16) / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    const luminance = channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    return luminance > 0.179 ? '#171717' : '#ffffff';
}

function drawHeading(ctx, text) {
    const words = text.trim().split(/\s+/);
    let lines = [];
    let size = 60;
    do {
        ctx.font = `${size}px Georgia`;
        lines = [''];
        for (const word of words) {
            const index = lines.length - 1;
            const candidate = lines[index] ? `${lines[index]} ${word}` : word;
            if (lines[index] && ctx.measureText(candidate).width > 936) lines.push(word);
            else lines[index] = candidate;
        }
        if (lines.length <= 2) break;
        size -= 2;
    } while (size > 28);
    lines.slice(0, 2).forEach((line, index) => ctx.fillText(line, 72, 320 + index * 62, 936));
}

// Published files have sequential numbers; event numbers identify newer meetups.
function newestFirst(artworks) {
    return [...artworks].sort((a, b) =>
        (Number(b.event?.match(/\d+$/)?.[0]) || 0) - (Number(a.event?.match(/\d+$/)?.[0]) || 0) ||
        (parseInt(b.filename, 10) || 0) - (parseInt(a.filename, 10) || 0));
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('An image could not be loaded. Please try again.'));
        image.src = src;
    });
}

function placeImage(ctx, image, x, y, width, height, cover = false, alignX = 0.5, alignY = 0.5) {
    const scale = (cover ? Math.max : Math.min)(width / image.width, height / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, width, height); ctx.clip();
    ctx.drawImage(image, x + (width - w) * alignX, y + (height - h) * alignY, w, h);
    ctx.restore();
}

function placeLogo(ctx, image) {
    // The logo files include transparent padding. Align the visible pixels.
    const buffer = document.createElement('canvas');
    buffer.width = image.width; buffer.height = image.height;
    const bufferContext = buffer.getContext('2d');
    bufferContext.drawImage(image, 0, 0);
    const pixels = bufferContext.getImageData(0, 0, image.width, image.height).data;
    let left = image.width, top = image.height, right = -1, bottom = -1;
    for (let y = 0; y < image.height; y++) {
        for (let x = 0; x < image.width; x++) {
            if (pixels[(y * image.width + x) * 4 + 3] > 32) {
                left = Math.min(left, x); right = Math.max(right, x);
                top = Math.min(top, y); bottom = Math.max(bottom, y);
            }
        }
    }
    if (right < left) return;
    const width = right - left + 1, height = bottom - top + 1;
    const scale = Math.min(288 / width, 96 / height);
    ctx.drawImage(image, left, top, width, height, 72, 112, width * scale, height * scale);
}

function drawName(ctx, name) {
    const words = name.trim().split(/\s+/);
    const split = Math.ceil(words.length / 2);
    const lines = words.length > 1 ? [words.slice(0, split).join(' '), words.slice(split).join(' ')] : [name];
    let size = 52;
    do {
        ctx.font = `bold ${size}px Georgia`;
        if (lines.every(line => ctx.measureText(line).width <= 414)) break;
        size -= 2;
    } while (size > 24);
    lines.forEach((line, index) => ctx.fillText(line, 312, 1548 + index * 62, 414));
}

export default function StoryMaker({ artist, artworks, profileImage, onClose, format = 'story' }) {
    const isPost = format === 'post';
    const label = isPost ? 'post' : 'story';
    const sorted = newestFirst(artworks);
    const [selected, setSelected] = useState(() => sorted.slice(0, 1).map(art => art.id));
    const [choosing, setChoosing] = useState(true);
    const [preset, setPreset] = useState('current');
    const [customColor, setCustomColor] = useState('#f6f0e6');
    const [artworkDisplay, setArtworkDisplay] = useState('full');
    const background = preset === 'custom' ? customColor : PRESETS[preset];
    const [ready, setReady] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [retry, setRetry] = useState(0);
    const canvasRef = useRef(null);
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const url = typeof window === 'undefined' ? '' : `${window.location.origin}/artists/${artist.slug}`;
    const caption = `${CAPTION}\n${url}\n\n${HASHTAGS}`;

    useEffect(() => {
        const previous = document.activeElement;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => { document.body.style.overflow = overflow; previous?.focus(); };
    }, []);

    useEffect(() => {
        let cancelled = false;
        setReady(false); setError('');
        async function render() {
            try {
                const chosen = selected.map(id => artworks.find(art => art.id === id)).filter(Boolean);
                const foreground = textColor(background);
                const [{ default: QRCode }, avatar, images, logo] = await Promise.all([
                    import('qrcode'),
                    loadImage(profileImage || '/artists-images/no_profile.png').catch(() => loadImage('/artists-images/no_profile.png')),
                    Promise.all(chosen.map(art => loadImage(art.src))),
                    loadImage(foreground === '#ffffff' ? '/usk-galle-logo-white-shadow.png' : '/usk-galle-logo-black.png'),
                ]);
                const qr = await loadImage(await QRCode.toDataURL(url, { width: 260, margin: 4, errorCorrectionLevel: 'M', color: { dark: '#2a1f14', light: '#ffffff' } }));
                if (cancelled) return;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = background; ctx.fillRect(0, 0, 1080, isPost ? 1080 : 1920);
                if (isPost) {
                    ctx.fillStyle = foreground;
                    ctx.font = 'bold 42px Georgia'; ctx.fillText(artist.name, 54, 86, 820);
                    ctx.font = '24px Arial'; ctx.fillText('Urban Sketchers Galle', 54, 128);
                    const pictures = images.length ? images : [avatar];
                    const columns = pictures.length > 1 ? 2 : 1;
                    const rows = Math.ceil(pictures.length / columns);
                    pictures.forEach((image, index) => {
                        const w = (972 - 18 * (columns - 1)) / columns;
                        const h = (646 - 18 * (rows - 1)) / rows;
                        const x = 54 + (index % columns) * (w + 18);
                        const y = 176 + Math.floor(index / columns) * (h + 18);
                        placeImage(ctx, image, x, y, w, h, artworkDisplay !== 'full',
                            artworkDisplay === 'left' ? 0 : artworkDisplay === 'right' ? 1 : 0.5,
                            artworkDisplay === 'top' ? 0 : artworkDisplay === 'bottom' ? 1 : 0.5);
                    });
                    ctx.drawImage(qr, 844, 866, 162, 162);
                    ctx.font = '30px Georgia'; ctx.fillText('From my sketchbook, in Galle.', 54, 936, 740);
                    ctx.font = '23px Arial'; ctx.fillText('Scan to explore my artist profile', 54, 984, 740);
                    setReady(true);
                    return;
                }
                placeLogo(ctx, logo);
                ctx.fillStyle = foreground;
                drawHeading(ctx, images.length > 1 ? 'My sketchbook, in Galle.' : images.length ? chosen[0].title : 'Meet the sketcher.');
                const top = 420, areaHeight = 980, gap = 22;
                const columns = images.length > 2 ? 2 : 1;
                const rows = Math.ceil(images.length / columns);
                images.forEach((image, index) => {
                    const width = (936 - gap * (columns - 1)) / columns;
                    const height = (areaHeight - gap * (rows - 1)) / rows;
                    const x = 72 + (index % columns) * (width + gap);
                    const y = top + Math.floor(index / columns) * (height + gap);
                    ctx.fillStyle = '#fffdf9'; ctx.fillRect(x, y, width, height);
                    placeImage(ctx, image, x + 18, y + 18, width - 36, height - 36,
                        artworkDisplay !== 'full',
                        artworkDisplay === 'left' ? 0 : artworkDisplay === 'right' ? 1 : 0.5,
                        artworkDisplay === 'top' ? 0 : artworkDisplay === 'bottom' ? 1 : 0.5);
                });
                if (!images.length) {
                    placeImage(ctx, avatar, 220, 500, 640, 640);
                    ctx.fillStyle = foreground; ctx.font = '32px Georgia';
                    ctx.fillText('Sketching our city, one page at a time.', 220, 1250, 640);
                }
                ctx.strokeStyle = foreground; ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.moveTo(72, 1450); ctx.lineTo(1008, 1450); ctx.stroke(); ctx.globalAlpha = 1;
                ctx.save(); ctx.beginPath(); ctx.arc(180, 1614, 102, 0, Math.PI * 2); ctx.clip();
                placeImage(ctx, avatar, 78, 1512, 204, 204, true); ctx.restore();
                ctx.fillStyle = foreground;
                drawName(ctx, artist.name);
                ctx.font = '27px Arial'; ctx.fillText('I sketched at USK Galle', 312, 1674, 414);
                ctx.drawImage(qr, 748, 1480, 260, 260);
                ctx.font = '28px Arial'; ctx.textAlign = 'left';
                ctx.fillText('Scan and see my full profile', 312, 1726, 344);
                // A small right-pointing arrow, matching the reference layout.
                ctx.beginPath(); ctx.moveTo(674, 1704); ctx.lineTo(687, 1715); ctx.lineTo(674, 1726); ctx.closePath(); ctx.fill();
                setReady(true);
            } catch (err) { if (!cancelled) setError(err.message || 'Could not create your story. Please try again.'); }
        }
        render();
        return () => { cancelled = true; };
    }, [selected, artworks, artist.name, profileImage, url, retry, background, artworkDisplay, isPost]);

    function toggle(id) {
        setReady(false); setNotice('');
        setSelected(current => current.includes(id) ? current.filter(value => value !== id) : current.length < 4 ? [...current, id] : current);
    }

    function download() {
        canvasRef.current.toBlob(blob => {
            if (!blob) { setError('Could not save the image. Please try again.'); return; }
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a'); link.href = href; link.download = `${artist.slug}-usk-galle-${label}.png`;
            document.body.appendChild(link); link.click(); link.remove();
            setTimeout(() => URL.revokeObjectURL(href), 60000);
            setNotice(isPost ? 'Your post is ready. Share the downloaded image with the caption.' : 'Your story is ready. Add the downloaded image to your Instagram Story.');
        }, 'image/png');
    }

    function handleKey(event) {
        if (event.key === 'Escape') onClose();
        if (event.key !== 'Tab') return;
        const controls = [...dialogRef.current.querySelectorAll('button:not(:disabled), textarea, input, select')];
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    return <div className={styles.overlay} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
        <section ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="story-title" onKeyDown={handleKey}>
            <header className={styles.header}><div><span className={styles.eyebrow}>FROM YOUR SKETCHBOOK</span><h2 id="story-title">Make your {label}</h2><p>Choose your sketches. We’ll take care of the rest.</p></div><button ref={closeRef} onClick={onClose} aria-label={`Close ${label} maker`} className={styles.close}>×</button></header>
            <div className={styles.layout}><div className={styles.controls}>
                {artworks.length > 0 ? <><div className={styles.modes}>
                    <button aria-expanded={choosing} aria-controls="story-sketches" onClick={() => setChoosing(value => !value)}>Choose sketch(s)</button>
                </div><p className={styles.help}>{selected.length} of 4 selected · choose one or more published sketches.</p>
                {choosing && <div id="story-sketches" className={styles.gallery}>{sorted.map(art => <button key={art.id} aria-pressed={selected.includes(art.id)} aria-label={`${selected.includes(art.id) ? 'Remove' : 'Select'} ${art.title}`} disabled={!selected.includes(art.id) && selected.length >= 4} onClick={() => toggle(art.id)}><img src={art.src} alt={art.title} loading="lazy"/><span>{selected.includes(art.id) ? '✓ ' : ''}{art.title}</span></button>)}</div>}
                </> : <p className={styles.help}>No published sketches yet. You can still share an image with your profile photo and QR code.</p>}
                {artworks.length > 0 && !selected.length && <p className={styles.help}>Select at least one published sketch.</p>}
                {artworks.length > 0 && <div className={styles.displayChoice}>
                    <label htmlFor="story-artwork-display">Show sketches</label>
                    <select id="story-artwork-display" value={artworkDisplay} onChange={event => { setReady(false); setArtworkDisplay(event.target.value); }}>
                        <option value="full">Full · centered (default)</option>
                        <option value="fill">Fill · crop to fit</option>
                        <option value="left">Fill · left aligned</option>
                        <option value="right">Fill · right aligned</option>
                        <option value="top">Fill · top aligned</option>
                        <option value="bottom">Fill · bottom aligned</option>
                    </select>
                    <p className={styles.help}>{artworkDisplay !== 'full' ? 'Fills each frame; the edges of your sketches may be cropped. Applies to all selected sketches.' : 'Keeps the whole sketch visible. Applies to all selected sketches.'}</p>
                </div>}
                <fieldset className={styles.colors}><legend>Background color</legend>
                    <div className={styles.presets}>{[['white', 'White'], ['black', 'Black'], ['current', 'Warm paper'], ['custom', 'Custom']].map(([value, label]) => <button key={value} aria-pressed={preset === value} onClick={() => { if ((value === 'custom' ? customColor : PRESETS[value]) !== background) setReady(false); setPreset(value); }}><i aria-hidden="true" style={{ background: value === 'custom' ? customColor : PRESETS[value] }}/>{label}</button>)}</div>
                    {preset === 'custom' && <label className={styles.custom}>Choose a color <input type="color" value={customColor} onChange={event => { if (event.target.value !== customColor) setReady(false); setCustomColor(event.target.value); }}/></label>}
                </fieldset>
                {error && <div role="alert"><p>{error}</p><button onClick={() => setRetry(value => value + 1)}>Try again</button></div>}
                <label htmlFor="story-caption" className={styles.captionLabel}>A caption to go with it</label><textarea id="story-caption" value={caption} readOnly rows={6}/>
                <button className={styles.copy} onClick={async () => { try { await navigator.clipboard.writeText(caption); setNotice('Caption copied!'); } catch { setNotice('Select the caption above and copy it manually.'); } }}>Copy caption</button>
                <p role="status" className={styles.help}>{notice}</p>
            </div><div className={styles.preview}><canvas ref={canvasRef} width={1080} height={isPost ? 1080 : 1920} aria-label={`${label} preview for ${artist.name}`} /><span>{isPost ? 'YOUR POST PREVIEW' : 'YOUR STORY PREVIEW'}</span><button className={styles.download} disabled={!ready || (artworks.length > 0 && !selected.length)} onClick={download}>{error ? 'Preview unavailable' : ready ? `Download ${isPost ? 'Post' : 'Story'} PNG` : `Creating your ${label}…`}</button></div></div>
        </section>
    </div>;
}
