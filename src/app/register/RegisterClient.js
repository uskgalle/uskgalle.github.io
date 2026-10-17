'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './register.module.css';
import { countries } from '../data/countries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCamera, faCheckCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const ENDPOINT = process.env.NEXT_PUBLIC_ARTIST_REGISTRATION_URL || '';
const EMPTY = { name: '', email: '', country: 'LK', bio: '', instagram: '', link2: '', link3: '', link4: '', website: '' };

async function preparePhoto(file) {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
  } finally { bitmap.close(); }
}

// POST into an iframe; Apps Script acknowledges storage via postMessage.
// Never treat an opaque no-cors fetch response as a successful registration.
function sendRegistration(payload, endpoint = ENDPOINT) {
  return new Promise((resolve, reject) => {
    const frame = document.createElement('iframe');
    frame.name = `registration-${crypto.randomUUID()}`;
    frame.hidden = true;
    frame.title = 'Registration submission';
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = endpoint;
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
      if (result?.type !== 'artist-registration' || result.requestId !== payload.requestId || result.receiptToken !== payload.receiptToken) return;
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

export default function RegisterClient({ artist = null, profileImage = '' }) {
  const editing = Boolean(artist);
  const endpoint = editing ? (process.env.NEXT_PUBLIC_ARTIST_EDIT_URL || '') : ENDPOINT;
  const initial = artist ? { ...EMPTY, name: artist.name || '', country: artist.country || '', bio: artist.bio || '', instagram: (artist.instagram || '').replace(/^https?:\/\/(?:www\.)?instagram\.com\//i, '').split(/[/?#]/)[0], link2: artist.link2 || '', link3: artist.link3 || '', link4: artist.link4 || '' } : EMPTY;
  const [data, setData] = useState(initial);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [localTestMode, setTestMode] = useState(false);
  const example = artist?.id === 'USKG0';
  const testMode = example || localTestMode;
  const [extraLinks, setExtraLinks] = useState(() => ['link2', 'link3', 'link4'].filter(key => artist?.[key]));
  const linkFocus = useRef(null);
  const pending = useRef(null);
  const busy = useRef(false);

  useEffect(() => {
    if (linkFocus.current) {
      document.getElementById(linkFocus.current)?.focus();
      linkFocus.current = null;
    }
  }, [extraLinks]);

  const addLink = () => {
    const next = ['link2', 'link3', 'link4'].find(key => !extraLinks.includes(key));
    if (!next) return;
    linkFocus.current = next;
    setExtraLinks(current => [...current, next]);
  };

  const removeLink = (name) => {
    setData(current => ({ ...current, [name]: '' }));
    linkFocus.current = 'add-artist-link';
    setExtraLinks(current => current.filter(key => key !== name));
  };

  useEffect(() => {
    // A local preview can exercise the form without sending personal data.
    setTestMode(process.env.NODE_ENV === 'development' && !endpoint &&
      ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname));
  }, [endpoint]);

  useEffect(() => {
    if (!photo) { setPreview(''); return; }
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const change = (event) => setData(previous => ({ ...previous, [event.target.name]: event.target.value }));
  const selectPhoto = (event) => {
    const file = event.target.files?.[0];
    setError(''); setPhoto(null);
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024 || !file.size) {
      event.target.value = '';
      setError('Choose a JPG, PNG or WebP photo up to 5 MB.'); return;
    }
    setPhoto(file);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (busy.current) return;
    setError('');
    if (!endpoint && !testMode) { setError('Registration is being set up. Please try again later.'); return; }
    if (['name', 'email', 'country', 'bio'].some(key => !data[key].trim())) {
      setError('Please complete all required artist information.'); return;
    }
    if (!editing && !photo && !pending.current) { setError('Please choose your profile picture.'); return; }
    busy.current = true; setSubmitting(true);
    try {
      if (!pending.current) {
        pending.current = {
          ...Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.trim()])),
          instagram: data.instagram.trim() ? `https://instagram.com/${data.instagram.trim().replace(/^@/, '')}` : '',
          requestId: crypto.randomUUID(), receiptToken: crypto.randomUUID(),
          returnOrigin: window.location.origin, photo: photo ? await preparePhoto(photo) : '',
          ...(editing ? { artistId: artist.id, artistSlug: artist.slug } : {}),
        };
      }
      if (!testMode) await sendRegistration(pending.current, endpoint);
      setSubmitted(true);
    } catch (failure) {
      if (failure.canEdit) pending.current = null;
      setError(failure.message || 'We could not submit your registration. Please retry.');
    } finally { busy.current = false; setSubmitting(false); }
  };

  return (
    <main className={styles.page}>
      <div className={styles.back}><Link href="/artists"><FontAwesomeIcon icon={faArrowLeft} /> All Artists</Link></div>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>{editing ? 'Your Artist Profile' : 'Join Our Community'}</span>
        <h1 className={styles.title}>{editing ? 'Edit Artist Details' : 'Artist Registration'}</h1>
        <p className={styles.subtitle}>{editing ? 'Request changes to your profile. Our team will verify and review them before publishing.' : 'Share your story and a profile picture. One submission is all it takes to join our artist community.'}</p>
      </header>
      <div className={styles.formCard}>
        {submitted ? (
          <div className={styles.successCard} role="status">
            <div className={styles.checkCircle}><FontAwesomeIcon icon={faCheckCircle} /></div>
            <h2 className={styles.successTitle}>{example ? 'Example Preview Complete' : testMode ? 'Local Test Complete!' : editing ? 'Change Request Received!' : 'Registration Received!'}</h2>
            <p className={styles.successText}>{testMode ? <>Thanks, <strong>{data.name}</strong>. Your form and photo passed the local preview.</> : <>Thank you, <strong>{data.name}</strong>. {editing ? 'Your requested changes have been received.' : 'Your details and profile picture have been received together.'}</>}</p>
            <div className={styles.infoBox}>{testMode ? 'Test only: nothing was sent or saved. Connect the registration service to receive real submissions.' : editing ? 'Our team will verify your request before updating your public profile.' : 'Our team will review your submission and manually create your artist profile.'}</div>
            <div className={styles.actionGroup}>
              <Link href={editing ? `/artists/${artist.slug}` : "/artists"} className={styles.backBtn}>{editing ? "Back to Profile" : "View Artists"}</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className={styles.form}>
            <div className={styles.formIntro}>
              <h2 className={styles.formSectionTitle}>Your Artist Information</h2>
              <p className={styles.formSectionDesc}>{editing ? `Editing ${artist.name} (${artist.id}). Leave the photo empty to keep your current picture. Clear an optional link to remove it. Fields marked * are required.` : 'Add your details and picture below. Fields marked * are required.'}</p>
            </div>
            <fieldset className={styles.fields} disabled={submitting || Boolean(pending.current)}>
              {[
                ['name', 'Name', 'text', 'Your full name', 120],
                ['email', editing ? 'Contact Email' : 'Email', 'email', 'you@example.com', 254],
              ].map(([name, label, type, placeholder, maxLength]) => (
                <div className={styles.fieldGroup} key={name}>
                  <label htmlFor={name} className={styles.label}>{label} <span className={styles.required}>*</span></label>
                  <input id={name} name={name} type={type} autoComplete={name} required maxLength={maxLength} placeholder={placeholder} value={data[name]} onChange={change} className={styles.input} />
                  {name === 'email' && <span className={styles.helpText}>Your email stays private. We only use it to contact you about your profile.</span>}
                </div>
              ))}
              <div className={styles.fieldGroup}>
                <label htmlFor="country" className={styles.label}>Country <span className={styles.required}>*</span></label>
                <select id="country" name="country" autoComplete="country" required value={data.country} onChange={change} className={styles.input}>
                  <option value="">Choose your country</option>
                  {countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="bio" className={styles.label}>Short Bio <span className={styles.required}>*</span></label>
                <textarea id="bio" name="bio" required maxLength={2000} rows={4} placeholder="Tell us about yourself and your sketching journey…" value={data.bio} onChange={change} className={styles.textarea} />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="photo" className={styles.label}><FontAwesomeIcon icon={faCamera} /> Profile Picture {!editing && <span className={styles.required}>*</span>}</label>
                <div className={styles.photoUpload}>
                  {(preview || (editing && profileImage)) && <img src={preview || profileImage} alt="Your selected profile picture" className={styles.photoPreview} />}
                  <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" required={!editing} onChange={selectPhoto} className={styles.fileInput} aria-describedby="photo-help" />
                  <span id="photo-help" className={styles.helpText}>Choose a clear portrait. JPG, PNG or WebP, up to 5 MB. We resize your photo for your profile.</span>
                </div>
              </div>
              <div className={styles.formIntro}>
                <h2 className={styles.formSectionTitle}>Find You Online <span className={styles.optionalTag}>(Optional)</span></h2>
                <p className={styles.formSectionDesc}>Share your Instagram handle and up to three other links for your public artist profile. Leave any of these blank.</p>
              </div>
              {[
                ['instagram', 'Instagram Handle', '@yourname'],
                ['link2', 'Link 2', 'https://www.behance.net/yourname'],
                ['link3', 'Link 3', 'https://yourportfolio.com'],
                ['link4', 'Link 4', 'https://example.com/yourname'],
              ].filter(([name]) => name === 'instagram' || extraLinks.includes(name)).map(([name, label, placeholder]) => (
                <div className={styles.fieldGroup} key={name}>
                  <div className={styles.linkHeading}>
                  <label htmlFor={name} className={styles.label}>{label} <span className={styles.optionalTag}>(Optional)</span></label>
                  {name !== 'instagram' && <button type="button" onClick={() => removeLink(name)} className={styles.removeLinkBtn} aria-label={`Remove ${label}`} title={`Remove ${label}`}><span aria-hidden="true">×</span></button>}
                  </div>
                  <input id={name} name={name} type={name === 'instagram' ? 'text' : 'url'} pattern={name === 'instagram' ? '@?[A-Za-z0-9._]{1,30}' : 'https?://.*'} title={name === 'instagram' ? 'Enter your Instagram handle, with or without @' : 'Use a full link starting with https:// or http://'} maxLength={name === 'instagram' ? 31 : 500} autoCapitalize="none" spellCheck={false} placeholder={placeholder} value={data[name]} onChange={change} className={styles.input} />
                </div>
              ))}
              {extraLinks.length < 3 && (
                <button id="add-artist-link" type="button" onClick={addLink} className={styles.addLinkBtn}>
                  <span aria-hidden="true">+</span> Add another link
                </button>
              )}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="website">Leave this empty</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={change} />
              </div>
              <p className={styles.helpText}>By submitting, you agree that we may publish your name, country, bio, picture and optional links on your artist profile after review.</p>
            </fieldset>
            {(example || !endpoint) && <p className={styles.infoBox} role="status">{example ? 'Example mode: try editing this profile. Nothing will be sent or saved.' : testMode ? 'Local test mode: try the form and upload a photo. Nothing will be sent or saved.' : editing ? 'Profile change requests are being set up. Please check back soon.' : 'Registration is being set up. Please check back soon.'}</p>}
            {error && <p className={styles.errorBox} role="alert">{error}</p>}
            <button type="submit" disabled={submitting || (!endpoint && !testMode)} aria-busy={submitting} className={styles.submitBtn}>
              {submitting ? <span className={styles.spinner} aria-hidden="true" /> : <FontAwesomeIcon icon={faUserPlus} />}
              {submitting ? (editing ? 'Submitting Changes…' : 'Submitting Details & Photo…') : testMode ? (editing ? 'Test Change Request' : 'Test Registration') : pending.current ? 'Retry Submission' : editing ? 'Submit Changes for Review' : 'Submit Registration'}
            </button>
            {pending.current && !submitting && <p className={styles.helpText}>Your original submission is kept for a safe retry. If you need to correct it, contact us with reference {pending.current.requestId}.</p>}
          </form>
        )}
      </div>
    </main>
  );
}
