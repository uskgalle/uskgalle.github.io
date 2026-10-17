'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '../../register/register.module.css';
import artworkStyles from './submit.module.css';

const ENDPOINT = process.env.NEXT_PUBLIC_ARTWORK_SUBMISSION_URL || '';
function sendArtwork(payload) {
  return new Promise((resolve, reject) => {
    const frame = document.createElement('iframe');
    frame.name = `registration-${crypto.randomUUID()}`;
    frame.hidden = true;
    frame.title = 'Registration submission';
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = ENDPOINT;
    form.target = frame.name;
    form.hidden = true;
    const input = document.createElement('input');
    input.name = 'payload';
    input.value = JSON.stringify(payload);
    form.append(input);
    let timer;
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener('message', receive);
      form.remove(); frame.remove();
    };
    const receive = (event) => {
      // HtmlService sandbox hosts use a -script suffix; some responses use
      // script.googleusercontent.com directly or its subdomains.
      if (!/^https:\/\/(?:script\.google\.com|script\.googleusercontent\.com|[a-z0-9-]+[.-]script\.googleusercontent\.com)$/.test(event.origin)) return;
      const result = event.data;
      if (result?.type !== 'artwork-submission' || result.requestId !== payload.requestId || result.receiptToken !== payload.receiptToken) return;
      cleanup();
      if (result.ok === true) resolve(result);
      else {
        const failure = new Error(result.message || 'Your registration could not be saved. Please retry.');
        failure.canEdit = result.canEdit === true;
        reject(failure);
      }
    };
    window.addEventListener('message', receive);
    timer = setTimeout(() => {
      cleanup();
      reject(new Error('We could not confirm your submission. Please retry on this page; your reference prevents duplicate registrations.'));
    }, 90000);
    document.body.append(frame, form);
    try { form.submit(); } catch (error) { cleanup(); reject(error); }
  });
}

function readImage(file) {
 return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result.split(',')[1]); reader.onerror = () => reject(new Error('Cannot read image.')); reader.readAsDataURL(file); });
}
export default function SubmitArtworkClient({ artists, sketchMeets = [] }) {
  const [artistId, setArtistId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sketchMeet, setSketchMeet] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [localTestMode, setTestMode] = useState(false);
  const example = artistId === 'USKG0';
  const testMode = example || localTestMode;
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const busy = useRef(false);
  const pending = useRef(null);
  const artist = artists.find(item => item.id === artistId);
  const meetNote = sketchMeets.some(meet => String(meet.number) === sketchMeet) ? `Sketch Meet #${sketchMeet}` : '';
  const submissionDescription = [description.trim(), meetNote].filter(Boolean).join('\n\n');

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (artists.some(item => item.id === id)) setArtistId(id);
    else if (id) setError('That artist ID was not found. Please select your registered artist ID below.');
    setTestMode(process.env.NODE_ENV === 'development' && !ENDPOINT && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname));
  }, [artists]);

  useEffect(() => {
    if (!file) { setPreview(''); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function selectImage(event) {
    const image = event.target.files?.[0];
    setFile(null); setError('');
    if (!image) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type) || !image.size || image.size > 10 * 1024 * 1024) {
      event.target.value = '';
      setError('Choose one JPG, PNG or WebP image up to 10 MB.');
      return;
    }
    setFile(image);
  }

  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    setError('');
    if (!artist || !title.trim() || !file) { setError('Select your registered artist ID, enter a title and choose an artwork image.'); return; }
    if (submissionDescription.length > 1000) { setError('Please shorten your description to leave room for the sketch meet.'); return; }
    if (!ENDPOINT && !testMode) { setError('Artwork submissions are being set up. Please check back soon.'); return; }
    busy.current = true; setSubmitting(true);
    try {
      // Validate the image without resizing or uploading the original artwork.
      const bitmap = await createImageBitmap(file);
      bitmap.close();
      if (!testMode) {
        if (!pending.current) pending.current = { artistId, title: title.trim(), description: submissionDescription, image: await readImage(file), imageType: file.type, requestId: crypto.randomUUID(), receiptToken: crypto.randomUUID(), returnOrigin: window.location.origin };
        await sendArtwork(pending.current);
      }
      setSubmitted(true);
    } catch (failure) {
      if (failure.canEdit) pending.current = null;
      setError(failure.message || 'Please choose a valid image.');
    } finally { busy.current = false; setSubmitting(false); }
  }

  return <main className={styles.page}>
    <div className={styles.back}><Link href="/artworks">← All Artworks</Link></div>
    <header className={styles.hero}>
      <span className={styles.eyebrow}>Share Your Sketchbook</span>
      <h1 className={styles.title}>Submit Artwork</h1>
      <p className={styles.subtitle}>For registered USK Galle artists. Submit one artwork at a time for review.</p>
    </header>
    <div className={styles.formCard}>
      {submitted ? <div className={styles.successCard} role="status">
        <h2 className={styles.successTitle}>{example ? 'Example Preview Complete' : testMode ? 'Artwork Test Complete!' : 'Artwork Received!'}</h2>
        <p className={styles.successText}><strong>{title.trim()}</strong> {testMode ? 'is ready for submission under' : 'was received for'} <strong>{artist.name} ({artist.id})</strong>.</p>
        <p className={styles.infoBox}>{example ? 'Example only. Nothing was uploaded, submitted or saved.' : testMode ? 'Local test only. Nothing was uploaded or saved.' : 'Our team will review your artwork before publishing it on your profile.'}</p>
        <Link href={`/artists/${artist.slug}`} className={styles.backBtn}>Back to Profile</Link>
      </div> : <form onSubmit={submit} className={styles.form}>
        <fieldset className={styles.fields} disabled={submitting || Boolean(pending.current)}>
          <div className={styles.fieldGroup}>
            <label htmlFor="artist-id" className={styles.label}>Artist ID <span className={styles.required}>*</span></label>
            <select id="artist-id" required value={artistId} onChange={event => setArtistId(event.target.value)} className={styles.input}>
              <option value="">Select your artist ID</option>
              {artists.map(item => <option key={item.id} value={item.id}>{item.id} — {item.name}</option>)}
            </select>
            {!artist && <span className={styles.helpText}>Not registered yet? <Link href="/register" className={styles.helpLink}>Register as an artist</Link> first.</span>}
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="artwork-title" className={styles.label}>Artwork Title <span className={styles.required}>*</span></label>
            <input id="artwork-title" required maxLength={160} value={title} onChange={event => setTitle(event.target.value)} placeholder="Give your sketch a title" className={styles.input} />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="artwork-meet" className={styles.label}>Sketch Meet <span className={styles.optionalTag}>(Optional)</span></label>
            <select id="artwork-meet" value={sketchMeet} onChange={event => setSketchMeet(event.target.value)} className={styles.input}>
              <option value="">No sketch meet selected</option>
              {sketchMeets.map(meet => <option key={meet.number} value={String(meet.number)}>{meet.title}</option>)}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="artwork-description" className={styles.label}>Short Description <span className={styles.optionalTag}>(Optional)</span></label>
            <textarea id="artwork-description" rows={3} maxLength={1000 - (meetNote ? meetNote.length + 2 : 0)} value={description} onChange={event => setDescription(event.target.value)} placeholder="A little about the place, moment or materials…" className={styles.textarea} />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="artwork-image" className={styles.label}>Artwork Image <span className={styles.required}>*</span></label>
            <div className={styles.photoUpload}>
              {preview && <img src={preview} alt="Selected artwork preview" className={artworkStyles.preview} />}
              <input id="artwork-image" type="file" required accept="image/jpeg,image/png,image/webp" onChange={selectImage} className={styles.fileInput} aria-describedby="artwork-image-help" />
              <span id="artwork-image-help" className={styles.helpText}>One JPG, PNG or WebP image, up to 10 MB. Selecting another image replaces the current selection.</span>
            </div>
          </div>
          <p className={styles.helpText}>Submit your own artwork. Your submission will be reviewed before it appears on the website.</p>
        </fieldset>
        <p className={styles.infoBox} role="status">{example ? 'Example mode: try the form and image preview. Nothing will be uploaded or saved.' : testMode ? 'Local test mode: try the form and image preview. Nothing will be uploaded or saved.' : ENDPOINT ? 'Your artwork will be reviewed before publishing.' : 'Artwork submissions are being set up. Please check back soon.'}</p>
        {error && <p className={styles.errorBox} role="alert">{error}</p>}
        <button type="submit" disabled={submitting || (!ENDPOINT && !testMode)} aria-busy={submitting} className={styles.submitBtn}>
          {submitting && <span className={styles.spinner} aria-hidden="true" />}
          {submitting ? 'Submitting Artwork…' : example ? 'Preview Example Submission' : testMode ? 'Test Artwork Submission' : pending.current ? 'Retry Submission' : 'Submit Artwork for Review'}
        </button>
      </form>}
    </div>
  </main>;
}
