'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '../../register/register.module.css';
import { sendBlog } from './send-blog';

const ENDPOINT = process.env.NEXT_PUBLIC_BLOG_SUBMISSION_URL || '';
const TYPES = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', txt: 'text/plain', md: 'text/markdown' };

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(new Error('Could not read this file. Please select it again.'));
    reader.readAsDataURL(file);
  });
}

export default function SubmitBlogClient({ artists }) {
  const [artistId, setArtistId] = useState('');
  const [mode, setMode] = useState('link');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [link, setLink] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const pending = useRef(null);
  const busy = useRef(false);
  const artist = artists.find(item => item.id === artistId);
  const example = artistId === 'USKG0';

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (artists.some(item => item.id === id)) setArtistId(id);
  }, [artists]);

  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    setError('');
    if (!artist || !title.trim()) { setError('Select an artist and enter an article title.'); return; }
    if (mode === 'link') {
      try { if (new URL(link).protocol !== 'https:') throw Error(); }
      catch { setError('Enter a complete HTTPS document link.'); return; }
    }
    if (mode === 'text' && !body.trim()) { setError('Write or paste your article.'); return; }
    if (mode === 'file' && (!file || !file.size || file.size > 5 * 1024 * 1024 || !TYPES[file.name.split('.').pop().toLowerCase()])) {
      setError('Choose a PDF, DOC, DOCX, TXT or MD file, up to 5 MB.'); return;
    }
    if (!example && !ENDPOINT) { setError('Blog submissions are being set up. Please check back soon.'); return; }
    busy.current = true; setSubmitting(true);
    try {
      if (!example) {
        if (!pending.current) pending.current = {
          artistId, title: title.trim(), notes: notes.trim(), mode,
          link: mode === 'link' ? link.trim() : '', body: mode === 'text' ? body.trim() : '',
          file: mode === 'file' ? await readFile(file) : '',
          extension: mode === 'file' ? file.name.split('.').pop().toLowerCase() : '',
          requestId: crypto.randomUUID(), receiptToken: crypto.randomUUID(), returnOrigin: window.location.origin,
        };
        await sendBlog(pending.current, ENDPOINT);
      }
      setSubmitted(true);
    } catch (failure) {
      if (failure.canEdit) pending.current = null;
      setError(failure.message || 'Your submission could not be confirmed. Please retry.');
    } finally { busy.current = false; setSubmitting(false); }
  }

  return <main className={styles.page}>
    <div className={styles.back}><Link href={artist ? `/artists/${artist.slug}` : '/blog'}>← {artist ? 'Back to Profile' : 'Back to Blog'}</Link></div>
    <header className={styles.hero}>
      <span className={styles.eyebrow}>Stories from our sketchbooks</span>
      <h1 className={styles.title}>Write a Blog</h1>
      <p className={styles.subtitle}>Share a sketching story, field notes or a guide. Send your draft for review before it appears on your profile.</p>
    </header>
    <div className={styles.formCard}>
      {submitted ? <div className={styles.successCard} role="status">
        <h2 className={styles.successTitle}>{example ? 'Example Preview Complete' : 'Blog Received'}</h2>
        <p className={styles.successText}><strong>{title}</strong> — {artist.name} ({artist.id})</p>
        <p className={styles.infoBox}>{example ? 'This was a demonstration. Nothing was uploaded, saved or submitted.' : 'Your draft is awaiting review. It will appear on your profile only after approval and publication.'}</p>
        <Link href={`/artists/${artist.slug}`} className={styles.backBtn}>Back to Profile</Link>
      </div> : <form onSubmit={submit} className={styles.form}>
        <fieldset className={styles.fields} disabled={submitting || Boolean(pending.current)}>
          <div className={styles.fieldGroup}>
            <label htmlFor="blog-artist" className={styles.label}>Artist *</label>
            <select id="blog-artist" required className={styles.input} value={artistId} onChange={e => setArtistId(e.target.value)}>
              <option value="">Select your artist ID</option>
              {artists.map(item => <option key={item.id} value={item.id}>{item.id} — {item.name}</option>)}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="blog-title" className={styles.label}>Article title *</label>
            <input id="blog-title" required maxLength={160} value={title} onChange={e => setTitle(e.target.value)} className={styles.input} />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="blog-mode" className={styles.label}>How would you like to send your draft?</label>
            <select id="blog-mode" value={mode} onChange={e => { setMode(e.target.value); setError(''); }} className={styles.input}>
              <option value="link">Document link</option><option value="file">Upload a file</option><option value="text">Write or paste text</option>
            </select>
          </div>
          {mode === 'link' && <div className={styles.fieldGroup}>
            <label htmlFor="blog-link" className={styles.label}>Document link *</label>
            <input id="blog-link" type="url" required maxLength={2000} value={link} onChange={e => setLink(e.target.value)} placeholder="https://docs.google.com/document/…" className={styles.input} aria-describedby="blog-link-help" />
            <span id="blog-link-help" className={styles.helpText}>Google Docs, Drive, Dropbox or another HTTPS document link. Make sure the team can open it with view access.</span>
          </div>}
          {mode === 'file' && <div className={styles.fieldGroup}>
            <label htmlFor="blog-file" className={styles.label}>Draft file *</label>
            <input id="blog-file" type="file" required accept=".pdf,.doc,.docx,.txt,.md" className={styles.fileInput} onChange={e => setFile(e.target.files?.[0] || null)} aria-describedby="blog-file-help" />
            <span id="blog-file-help" className={styles.helpText}>One PDF, Word document, plain text or Markdown file, up to 5 MB.</span>
          </div>}
          {mode === 'text' && <div className={styles.fieldGroup}>
            <label htmlFor="blog-body" className={styles.label}>Your article *</label>
            <textarea id="blog-body" required rows={14} maxLength={30000} value={body} onChange={e => setBody(e.target.value)} className={styles.textarea} />
            <span className={styles.helpText}>{body.length.toLocaleString()} / 30,000 characters</span>
          </div>}
          <div className={styles.fieldGroup}>
            <label htmlFor="blog-notes" className={styles.label}>Notes for the team (optional)</label>
            <textarea id="blog-notes" rows={3} maxLength={2000} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Image links, captions, credits or anything we should know…" className={styles.textarea} />
          </div>
          <p className={styles.helpText}><strong>A little submission guide:</strong> Share your own words and stories. Only include images or other material you created or have permission to share, and credit the creators. Please keep it kind and respectful—we’ll review your draft before publishing.</p>
        </fieldset>
        <p className={styles.infoBox} role="status">{example ? 'Example mode: try the form without sending or saving anything.' : ENDPOINT ? 'Drafts are reviewed before publication.' : 'Blog submissions are being set up. You can prepare your draft here, but sending is not available yet.'}</p>
        {error && <p className={styles.errorBox} role="alert">{error}</p>}
        <button className={styles.submitBtn} type="submit" disabled={submitting || (!ENDPOINT && !example)} aria-busy={submitting}>
          {submitting && <span className={styles.spinner} aria-hidden="true" />}
          {submitting ? 'Submitting…' : example ? 'Preview Example Submission' : pending.current ? 'Retry Submission' : 'Submit Blog for Review'}
        </button>
      </form>}
    </div>
  </main>;
}
