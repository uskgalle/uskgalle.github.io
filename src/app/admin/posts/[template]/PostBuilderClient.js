'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faDownload,
  faFloppyDisk,
  faFolderOpen,
  faSliders,
  faUpload,
  faCheck,
  faBolt,
  faRotateRight,
  faPalette,
  faShareNodes,
  faQrcode,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../builder.module.css';

const TEMPLATE_OPTIONS = [
  { value: 'split', label: '⚡ Modern Split Meetup (4:5)' },
  { value: 'blog', label: '📰 Blog Article Hook & QR (4:5)' },
  { value: 'classic', label: '📜 Classic Meetup Flyer (4:5)' },
  { value: 'overlay', label: '🌆 Full-Bleed Image Overlay (4:5)' },
  { value: 'minimal', label: '🗞️ Minimalist Magazine (4:5)' },
  { value: 'story', label: '📱 Instagram Story Flyer (9:16)' },
];

export default function PostBuilderClient({ initialTemplate = 'split', events = [], blogPosts = [] }) {
  const router = useRouter();
  const [activeTemplate, setActiveTemplate] = useState(initialTemplate);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Template Form Fields
  const [selectedEventSlug, setSelectedEventSlug] = useState(events[0]?.slug || 'meet-up-05');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState(blogPosts[0]?.slug || '');

  const [eyebrow, setEyebrow] = useState('UPCOMING');
  const [title, setTitle] = useState('Sketch Meet-Up #5');
  const [intro, setIntro] = useState(
    'Join fellow sketchers for a relaxed outdoor sketchwalk through the streets, corners, and historic ramparts of Galle Fort.'
  );
  const [date, setDate] = useState('03 October 2026');
  const [location, setLocation] = useState("ART'O'SAN Gallery, Galle Fort");
  const [time, setTime] = useState('8:45 AM – 12:30 PM');
  const [who, setWho] = useState('Everyone. All skill levels.');
  const [imgUrl, setImgUrl] = useState('/doodles/meetup-sketch.jpg');

  // QR settings
  const [qrUrl, setQrUrl] = useState('https://uskgalle.github.io/events/meet-up-05/register');
  const [qrTag, setQrTag] = useState('INSTANT ACCESS');
  const [qrHeadline, setQrHeadline] = useState('Register via QR Code');
  const [qrSubtext, setQrSubtext] = useState('Point camera to register • Link in bio @urbansketchersgalle');

  // Color Theme (Classic & Overlay)
  const [theme, setTheme] = useState('warm-paper'); // warm-paper, terracotta, charcoal, ocean

  // Refs
  const canvasRef = useRef(null);
  const qrCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((cur) => (cur === msg ? null : cur));
    }, 3000);
  };

  // Generate QR Code onto canvas
  useEffect(() => {
    if (qrCanvasRef.current && qrUrl) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        qrUrl,
        {
          width: 72,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error('QR generation error:', error);
        }
      );
    }
  }, [qrUrl, activeTemplate]);

  // Autofill from Event Data
  const handleAutofillEvent = (slug) => {
    setSelectedEventSlug(slug);
    const ev = events.find((e) => e.slug === slug);
    if (!ev) return;

    setTitle(ev.title || 'Sketch Meet-Up');
    setEyebrow(ev.upcoming ? 'UPCOMING' : 'MEETUP');
    setIntro(ev.description || '');
    setDate(`${ev.date?.day || ''} ${ev.date?.month || ''} ${ev.year || ''}`);
    setTime(ev.time || '');
    setLocation(ev.location || '');
    setWho(ev.whoCanJoin?.[0] || 'Everyone. All skill levels.');
    setImgUrl(ev.image || '/doodles/meetup-sketch.jpg');
    setQrUrl(`https://uskgalle.github.io${ev.registerLink || `/events/${ev.slug}/register`}`);
    setQrTag('INSTANT ACCESS');
    setQrHeadline('Register via QR Code');
    setQrSubtext('Point camera to register • Link in bio @urbansketchersgalle');

    showToast(`Autofilled from ${ev.title}`);
  };

  // Autofill from Blog Post Data
  const handleAutofillBlog = (slug) => {
    setSelectedBlogSlug(slug);
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return;

    setTitle(post.title || '');
    setEyebrow(post.category || 'Blog Edition');
    setIntro(post.excerpt || post.content?.match(/<p>(.*?)<\/p>/)?.[1] || '');
    setImgUrl(post.coverImage || '/blog-images/usk-galle-artist-profiles.webp');
    setQrUrl(`https://uskgalle.github.io/blog/${post.slug}`);
    setQrTag('READ ARTICLE');
    setQrHeadline('Scan to Read Online');
    setQrSubtext('Point phone camera to read full article • Link in bio');

    showToast(`Autofilled from ${post.title}`);
  };

  // Handle Switch Template
  const handleTemplateChange = (newTmpl) => {
    setActiveTemplate(newTmpl);
    window.history.pushState(null, '', `/admin/posts/${newTmpl}`);

    // If switching to blog, auto-load blog default
    if (newTmpl === 'blog' && blogPosts.length > 0) {
      handleAutofillBlog(selectedBlogSlug || blogPosts[0].slug);
    } else if (newTmpl !== 'blog' && events.length > 0 && selectedEventSlug) {
      handleAutofillEvent(selectedEventSlug);
    }
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      showToast(`Loaded ${file.name}`);
    }
  };

  // LocalStorage Draft
  const saveDraft = () => {
    const draft = {
      eyebrow,
      title,
      intro,
      date,
      location,
      time,
      who,
      imgUrl,
      qrUrl,
      qrTag,
      qrHeadline,
      qrSubtext,
      theme,
    };
    localStorage.setItem(`usk_draft_${activeTemplate}`, JSON.stringify(draft));
    showToast('Saved draft to local browser storage!');
  };

  const loadDraft = () => {
    const raw = localStorage.getItem(`usk_draft_${activeTemplate}`);
    if (!raw) {
      showToast('No saved draft found for this template.');
      return;
    }
    try {
      const d = JSON.parse(raw);
      if (d.eyebrow) setEyebrow(d.eyebrow);
      if (d.title) setTitle(d.title);
      if (d.intro) setIntro(d.intro);
      if (d.date) setDate(d.date);
      if (d.location) setLocation(d.location);
      if (d.time) setTime(d.time);
      if (d.who) setWho(d.who);
      if (d.imgUrl) setImgUrl(d.imgUrl);
      if (d.qrUrl) setQrUrl(d.qrUrl);
      if (d.qrTag) setQrTag(d.qrTag);
      if (d.qrHeadline) setQrHeadline(d.qrHeadline);
      if (d.qrSubtext) setQrSubtext(d.qrSubtext);
      if (d.theme) setTheme(d.theme);
      showToast('Loaded saved draft!');
    } catch {
      showToast('Error loading draft');
    }
  };

  // Download HD PNG
  const handleDownloadHd = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    showToast('Rendering Ultra-HD PNG export...');

    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      const cleanTitle = (title || 'post')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const link = document.createElement('a');
      link.download = `usk-galle-${activeTemplate}-${cleanTitle}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      showToast('HD PNG downloaded successfully!');
    } catch (err) {
      console.error('Export Error:', err);
      showToast('Export failed: Check console or image permissions');
    } finally {
      setIsExporting(false);
    }
  };

  const isStory = activeTemplate === 'story';
  const isBlog = activeTemplate === 'blog';

  return (
    <div className={styles.builderContainer}>
      {/* Toast Notification */}
      {toastMsg && (
        <div className={styles.toast} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
          <FontAwesomeIcon icon={faCheck} style={{ color: '#4ade80' }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Studio Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <Link href="/admin/posts" className={styles.backBtn}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Templates Hub</span>
          </Link>

          <div className={styles.templateSelectorGroup}>
            <span className={styles.templateLabel}>Active Template:</span>
            <select
              className={styles.templateSelect}
              value={activeTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
            >
              {TEMPLATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.toolbarRight}>
          <button
            type="button"
            className={styles.btnToolbar}
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            title="Toggle Controls Sidebar"
          >
            <FontAwesomeIcon icon={faSliders} />
            <span>{isSidebarCollapsed ? 'Show Controls' : 'Hide Controls'}</span>
          </button>

          <button type="button" className={styles.btnToolbar} onClick={saveDraft} title="Save Draft to Browser">
            <FontAwesomeIcon icon={faFloppyDisk} />
            <span>Save</span>
          </button>

          <button type="button" className={styles.btnToolbar} onClick={loadDraft} title="Load Draft from Browser">
            <FontAwesomeIcon icon={faFolderOpen} />
            <span>Load</span>
          </button>

          <button
            type="button"
            className={styles.btnExport}
            onClick={handleDownloadHd}
            disabled={isExporting}
          >
            <FontAwesomeIcon icon={faDownload} />
            <span>{isExporting ? 'Exporting...' : 'Download HD PNG'}</span>
          </button>
        </div>
      </div>

      {/* Workspace Split */}
      <div className={styles.workspace}>
        {/* Editor Sidebar */}
        <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
          {/* Data Autofill Section */}
          <div className={styles.sectionBox}>
            <div className={styles.autofillBanner}>
              <div className={styles.autofillLabel}>
                <FontAwesomeIcon icon={faBolt} />
                <span>1-Click Project Data Autofill</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                {isBlog
                  ? 'Select a published blog post to automatically populate title, cover, and QR code URL:'
                  : 'Select an event to automatically populate date, time, location, title, and registration QR URL:'}
              </div>

              {isBlog ? (
                <select
                  className={styles.select}
                  value={selectedBlogSlug}
                  onChange={(e) => handleAutofillBlog(e.target.value)}
                >
                  <option value="">-- Choose Blog Article --</option>
                  {blogPosts.map((post) => (
                    <option key={post.slug} value={post.slug}>
                      {post.title}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  className={styles.select}
                  value={selectedEventSlug}
                  onChange={(e) => handleAutofillEvent(e.target.value)}
                >
                  <option value="">-- Choose Event / Meetup --</option>
                  {events.map((ev) => (
                    <option key={ev.slug} value={ev.slug}>
                      {ev.title} ({ev.date?.day} {ev.date?.month} {ev.year})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Artwork / Cover Image Upload */}
          <div className={styles.sectionBox}>
            <div className={styles.sectionTitle}>
              <FontAwesomeIcon icon={faImage} style={{ color: '#c86d3b' }} />
              <span>Artwork / Hero Image</span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Image Path / URL</label>
              <input
                type="text"
                className={styles.input}
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileUpload}
            />

            <div
              className={styles.fileDropZone}
              onClick={() => fileInputRef.current?.click()}
            >
              <FontAwesomeIcon icon={faUpload} style={{ marginRight: '6px' }} />
              <span>Upload Local Photo from PC</span>
            </div>
          </div>

          {/* Content Texts */}
          <div className={styles.sectionBox}>
            <div className={styles.sectionTitle}>
              <FontAwesomeIcon icon={faPalette} style={{ color: '#c86d3b' }} />
              <span>Event / Article Details</span>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Badge / Eyebrow</label>
                <input
                  type="text"
                  className={styles.input}
                  value={eyebrow}
                  onChange={(e) => setEyebrow(e.target.value)}
                />
              </div>

              {(activeTemplate === 'classic' || activeTemplate === 'overlay') && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Color Theme</label>
                  <select
                    className={styles.select}
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="warm-paper">Warm Paper</option>
                    <option value="terracotta">Terracotta</option>
                    <option value="charcoal">Charcoal</option>
                    <option value="ocean">Ocean</option>
                  </select>
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{isBlog ? 'Article Headline' : 'Event Title'}</label>
              <input
                type="text"
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{isBlog ? 'Scroll-Stopping Hook Quote' : 'Intro Summary'}</label>
              <textarea
                className={styles.textarea}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
            </div>

            {!isBlog && (
              <>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Date</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Time</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Location</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Who Can Join</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={who}
                    onChange={(e) => setWho(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {/* QR Code Settings */}
          <div className={styles.sectionBox}>
            <div className={styles.sectionTitle}>
              <FontAwesomeIcon icon={faQrcode} style={{ color: '#c86d3b' }} />
              <span>QR Code Settings</span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Destination URL</label>
              <input
                type="text"
                className={styles.input}
                value={qrUrl}
                onChange={(e) => setQrUrl(e.target.value)}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>QR Tag</label>
                <input
                  type="text"
                  className={styles.input}
                  value={qrTag}
                  onChange={(e) => setQrTag(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>QR Heading</label>
                <input
                  type="text"
                  className={styles.input}
                  value={qrHeadline}
                  onChange={(e) => setQrHeadline(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>QR Subtext</label>
              <input
                type="text"
                className={styles.input}
                value={qrSubtext}
                onChange={(e) => setQrSubtext(e.target.value)}
              />
            </div>
          </div>
        </aside>

        {/* Live Preview Stage */}
        <main className={styles.previewStage}>
          <div className={styles.canvasWrapper}>
            {/* The exported canvas node */}
            <div
              ref={canvasRef}
              className={isStory ? styles.canvas916 : styles.canvas45}
            >
              {/* ═══════════ TEMPLATE 1: MODERN SPLIT MEETUP ═══════════ */}
              {activeTemplate === 'split' && (
                <div className={`${styles.splitCanvas} ${styles.canvas45}`}>
                  {/* Top Bar */}
                  <div className={styles.splitHeader}>
                    <div className={styles.splitBrand}>
                      <img src="/icon.png" alt="USK" className={styles.splitBrandLogo} />
                      <span className={styles.splitBrandText}>USK GALLE</span>
                    </div>
                    <div className={styles.splitHeaderRight}>
                      {eyebrow && <span className={styles.splitEyebrow}>{eyebrow}</span>}
                      <span className={styles.splitMeetupTitle}>{title}</span>
                    </div>
                  </div>

                  {/* Middle Body */}
                  <div className={styles.splitBody}>
                    <div
                      className={styles.splitArtworkFrame}
                      style={{ backgroundImage: `url('${imgUrl}')` }}
                    />
                    <div className={styles.splitDetailsCol}>
                      {intro && <p className={styles.splitIntro}>{intro}</p>}
                      <div className={styles.splitCardsStack}>
                        {date && (
                          <div className={styles.splitInfoCard}>
                            <span className={styles.splitCardLabel}>DATE</span>
                            <span className={styles.splitCardValue}>{date}</span>
                          </div>
                        )}
                        {location && (
                          <div className={styles.splitInfoCard}>
                            <span className={styles.splitCardLabel}>LOCATION</span>
                            <span className={styles.splitCardValue}>{location}</span>
                          </div>
                        )}
                        {time && (
                          <div className={styles.splitInfoCard}>
                            <span className={styles.splitCardLabel}>TIME</span>
                            <span className={styles.splitCardValue}>{time}</span>
                          </div>
                        )}
                        {who && (
                          <div className={styles.splitInfoCard}>
                            <span className={styles.splitCardLabel}>WHO CAN JOIN</span>
                            <span className={styles.splitCardValue}>{who}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom QR Card */}
                  <div className={styles.splitBottomCard}>
                    <div className={styles.splitQrText}>
                      <span className={styles.splitQrBadge}>{qrTag}</span>
                      <span className={styles.splitQrHeading}>{qrHeadline}</span>
                      <span className={styles.splitQrSub}>{qrSubtext}</span>
                    </div>
                    <canvas ref={qrCanvasRef} className={styles.qrCanvasElement} />
                  </div>
                </div>
              )}

              {/* ═══════════ TEMPLATE 2: BLOG ARTICLE HOOK ═══════════ */}
              {activeTemplate === 'blog' && (
                <div className={`${styles.blogCanvas} ${styles.canvas45}`}>
                  <div className={styles.blogTopHeader}>
                    <span className={styles.blogLogoText}>USK GALLE</span>
                    <span className={styles.blogCategoryPill}>{eyebrow}</span>
                  </div>

                  <div
                    className={styles.blogCoverImg}
                    style={{ backgroundImage: `url('${imgUrl}')` }}
                  />

                  <div className={styles.blogHookSection}>
                    <h2 className={styles.blogArticleTitle}>{title}</h2>
                    {intro && <blockquote className={styles.blogHookQuote}>&ldquo;{intro}&rdquo;</blockquote>}
                  </div>

                  <div className={styles.blogBottomBar}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, color: '#2a201a' }}>USK GALLE DISPATCH</span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#b8854a' }}>{qrHeadline}</span>
                      <span style={{ fontSize: '9px', color: '#6b5a47' }}>{qrSubtext}</span>
                    </div>
                    <canvas ref={qrCanvasRef} className={styles.qrCanvasElement} />
                  </div>
                </div>
              )}

              {/* ═══════════ TEMPLATE 3: CLASSIC EDITORIAL ═══════════ */}
              {activeTemplate === 'classic' && (
                <div className={`${styles.classicCanvas} ${styles.canvas45}`}>
                  <div className={styles.classicHeader}>
                    <span className={styles.classicBrand}>URBAN SKETCHERS GALLE</span>
                    {eyebrow && <span className={styles.classicEyebrow}>{eyebrow}</span>}
                  </div>

                  <div
                    className={styles.classicHeroImg}
                    style={{ backgroundImage: `url('${imgUrl}')` }}
                  />

                  <div>
                    <h2 className={styles.classicTitle}>{title}</h2>
                    {intro && <p className={styles.classicIntro}>{intro}</p>}
                  </div>

                  <div className={styles.classicGrid}>
                    <div className={styles.classicGridCard}>
                      <span className={styles.classicGridLabel}>DATE</span>
                      <span className={styles.classicGridValue}>{date}</span>
                    </div>
                    <div className={styles.classicGridCard}>
                      <span className={styles.classicGridLabel}>TIME</span>
                      <span className={styles.classicGridValue}>{time}</span>
                    </div>
                    <div className={styles.classicGridCard}>
                      <span className={styles.classicGridLabel}>LOCATION</span>
                      <span className={styles.classicGridValue}>{location}</span>
                    </div>
                    <div className={styles.classicGridCard}>
                      <span className={styles.classicGridLabel}>WHO CAN JOIN</span>
                      <span className={styles.classicGridValue}>{who}</span>
                    </div>
                  </div>

                  <div className={styles.classicQrRow}>
                    <div>
                      <div style={{ fontSize: '8px', fontWeight: 800, color: '#c86d3b', textTransform: 'uppercase' }}>
                        {qrTag}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#1f2421' }}>{qrHeadline}</div>
                      <div style={{ fontSize: '9px', color: '#5c645d' }}>{qrSubtext}</div>
                    </div>
                    <canvas ref={qrCanvasRef} className={styles.qrCanvasElement} />
                  </div>
                </div>
              )}

              {/* ═══════════ TEMPLATE 4: FULL-BLEED OVERLAY ═══════════ */}
              {activeTemplate === 'overlay' && (
                <div className={`${styles.overlayCanvas} ${styles.canvas45}`}>
                  <div
                    className={styles.overlayBgImage}
                    style={{ backgroundImage: `url('${imgUrl}')` }}
                  />
                  <div className={styles.overlayScrim} />

                  <div className={styles.overlayTop}>
                    <span className={styles.overlayBrand}>URBAN SKETCHERS</span>
                    {eyebrow && <span className={styles.overlayBadge}>{eyebrow}</span>}
                  </div>

                  <div className={styles.overlayBottomContent}>
                    <h2 className={styles.overlayTitle}>{title}</h2>
                    {intro && <p style={{ fontSize: '12px', color: '#e2e8f0', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{intro}</p>}

                    <div className={styles.overlayGrid}>
                      <div className={styles.overlayBox}>
                        <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#e76f51' }}>DATE &amp; TIME</div>
                        <div style={{ fontSize: '11px', fontWeight: 700 }}>{date} • {time}</div>
                      </div>
                      <div className={styles.overlayBox}>
                        <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#e76f51' }}>LOCATION</div>
                        <div style={{ fontSize: '11px', fontWeight: 700 }}>{location}</div>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '8px', fontWeight: 800, color: '#e76f51' }}>{qrTag}</div>
                        <div style={{ fontSize: '13px', fontWeight: 800 }}>{qrHeadline}</div>
                        <div style={{ fontSize: '9px', color: '#cbd5e1' }}>{qrSubtext}</div>
                      </div>
                      <canvas ref={qrCanvasRef} className={styles.qrCanvasElement} />
                    </div>
                  </div>
                </div>
              )}

              {/* ═══════════ TEMPLATE 5: MINIMALIST POSTER ═══════════ */}
              {activeTemplate === 'minimal' && (
                <div className={`${styles.minimalCanvas} ${styles.canvas45}`}>
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '1px', color: '#64748b', marginBottom: '4px' }}>
                      URBAN SKETCHERS GALLE
                    </div>
                    <h1 className={styles.minimalTitle}>{title}</h1>
                  </div>

                  <div
                    className={styles.minimalHeroImg}
                    style={{ backgroundImage: `url('${imgUrl}')` }}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '10px 0' }}>
                    <div style={{ borderLeft: '2px solid #0f172a', paddingLeft: '8px' }}>
                      <div style={{ fontSize: '8px', fontWeight: 800, color: '#64748b' }}>DATE &amp; TIME</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a' }}>{date} — {time}</div>
                    </div>
                    <div style={{ borderLeft: '2px solid #0f172a', paddingLeft: '8px' }}>
                      <div style={{ fontSize: '8px', fontWeight: 800, color: '#64748b' }}>LOCATION</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a' }}>{location}</div>
                    </div>
                  </div>

                  <div style={{ borderTop: '2px solid #0f172a', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f172a' }}>{qrTag}</div>
                      <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>{qrHeadline}</div>
                      <div style={{ fontSize: '9px', color: '#64748b' }}>{qrSubtext}</div>
                    </div>
                    <canvas ref={qrCanvasRef} className={styles.qrCanvasElement} />
                  </div>
                </div>
              )}

              {/* ═══════════ TEMPLATE 6: INSTAGRAM STORY (9:16) ═══════════ */}
              {activeTemplate === 'story' && (
                <div className={`${styles.storyCanvas} ${styles.canvas916}`}>
                  <div
                    className={styles.storyBgImg}
                    style={{ backgroundImage: `url('${imgUrl}')` }}
                  />
                  <div className={styles.storyScrim} />

                  <div className={styles.storyTopBar}>
                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                      USK GALLE
                    </span>
                    {eyebrow && (
                      <span style={{ background: '#c86d3b', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '12px' }}>
                        {eyebrow}
                      </span>
                    )}
                  </div>

                  <div className={styles.storyBottomContent}>
                    <h2 className={styles.storyTitle}>{title}</h2>

                    <div className={styles.storyPillStack}>
                      <div className={styles.storyPill}>
                        <span>📅</span>
                        <span>{date} • {time}</span>
                      </div>
                      <div className={styles.storyPill}>
                        <span>📍</span>
                        <span>{location}</span>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '8px', fontWeight: 800, color: '#e76f51' }}>{qrTag}</div>
                        <div style={{ fontSize: '12px', fontWeight: 800 }}>{qrHeadline}</div>
                        <div style={{ fontSize: '8.5px', color: '#cbd5e1' }}>Link in bio @urbansketchersgalle</div>
                      </div>
                      <canvas ref={qrCanvasRef} className={styles.qrCanvasElement} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
