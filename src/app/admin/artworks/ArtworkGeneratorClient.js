'use client';

import { useState, useMemo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faPlus,
  faRotateRight,
  faCopy,
  faCheck,
  faTrash,
  faFileCode,
  faUpload,
  faFolderTree,
  faDownload,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import styles from './artwork.module.css';

const TITLE_PRESETS = [
  'Galle Fort Lighthouse',
  'Galle Fort Clock Tower',
  'Symbols of Galle Fort',
  'Ramparts View',
  'Dutch Reformed Church',
  'Fish Market',
  'Lighthouse from Ramparts',
  'Leyn Baan Street',
];

const MEDIUM_PRESETS = [
  'Mix media (watercolor, ink, etc.)',
  'Watercolors & pen',
  'Watercolors and markers',
  'Pencil & watercolors',
  'Pen & ink wash on paper',
  'Quick sketch on location',
];

function getNextNumberForArtist(artworks, artistId) {
  if (!artistId) return 1;
  const idPrefix = `${artistId.toLowerCase()}-`;
  let maxNum = 0;
  for (const art of artworks) {
    if (art?.id && art.id.toLowerCase().startsWith(idPrefix)) {
      const numPart = art.id.toLowerCase().replace(idPrefix, '');
      const num = parseInt(numPart, 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }
  return maxNum + 1;
}

function formatArtworkObject(art, indent = '  ') {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: '${art.id}',`);
  lines.push(`${indent}  filename: '${art.filename}',`);
  lines.push(`${indent}  title: '${(art.title || '').replace(/'/g, "\\'")}',`);
  lines.push(`${indent}  description: '${(art.description || '').replace(/'/g, "\\'")}',`);
  if (art.event) {
    lines.push(`${indent}  event: '${art.event}',`);
  }
  lines.push(`${indent}},`);
  return lines.join('\n');
}

export default function ArtworkGeneratorClient({ initialArtists = [], initialArtworks = [], initialEvents = [] }) {
  const [artworksList, setArtworksList] = useState(initialArtworks);

  // Form State
  const [selectedArtistId, setSelectedArtistId] = useState(initialArtists[0]?.id || 'USKG1');
  const [artNumber, setArtNumber] = useState(() => getNextNumberForArtist(initialArtworks, initialArtists[0]?.id || 'USKG1'));
  const [extension, setExtension] = useState('webp');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(initialEvents[0]?.slug || 'meet-up-05');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [tableFilterArtist, setTableFilterArtist] = useState('all');
  const [activeTab, setActiveTab] = useState('snippet');
  const [toastMsg, setToastMsg] = useState(null);

  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((cur) => (cur === msg ? null : cur));
    }, 3000);
  };

  const copyToClipboard = async (text, successMsg) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMsg || 'Copied to clipboard!');
    } catch {
      showToast('Could not copy to clipboard');
    }
  };

  // Selected artist object
  const currentArtist = useMemo(() => {
    return initialArtists.find((a) => a.id.toLowerCase() === selectedArtistId.toLowerCase()) || {
      id: selectedArtistId,
      name: selectedArtistId,
    };
  }, [initialArtists, selectedArtistId]);

  // When artist changes, auto-suggest next artwork sequence number
  const handleArtistSelect = (newId) => {
    setSelectedArtistId(newId);
    const nextNum = getNextNumberForArtist(artworksList, newId);
    setArtNumber(nextNum);
    setPreviewImageUrl('');
  };

  // Current Artwork ID & Filename
  const currentArtworkId = `${selectedArtistId}-${artNumber}`;
  const currentFilename = `${artNumber}.${extension}`;

  // Image Upload handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImageUrl(url);
      // Auto-set extension if matches
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (['webp', 'png', 'jpg', 'jpeg'].includes(ext)) {
        setExtension(ext);
      }
      showToast(`Loaded preview for ${file.name}`);
    }
  };

  const handleAddOrUpdate = () => {
    if (!title.trim()) {
      showToast('Please enter an artwork title!');
      return;
    }

    const newArtwork = {
      id: currentArtworkId,
      filename: currentFilename,
      title: title.trim(),
      description: description.trim(),
      event: selectedEvent || undefined,
    };

    const existingIdx = artworksList.findIndex((a) => a.id?.toLowerCase() === currentArtworkId.toLowerCase());
    let updated;
    if (existingIdx !== -1) {
      updated = [...artworksList];
      updated[existingIdx] = newArtwork;
      showToast(`Updated existing artwork ${currentArtworkId}`);
    } else {
      updated = [...artworksList, newArtwork];
      showToast(`Added ${newArtwork.id} (${newArtwork.title})`);
    }

    setArtworksList(updated);
    setArtNumber((prev) => prev + 1);
    setTitle('');
    setDescription('');
    setPreviewImageUrl('');
  };

  const handleClearForm = () => {
    setTitle('');
    setDescription('');
    setPreviewImageUrl('');
    const nextNum = getNextNumberForArtist(artworksList, selectedArtistId);
    setArtNumber(nextNum);
    showToast('Form cleared');
  };

  // Current artwork object for code generation
  const currentArtObj = useMemo(() => {
    return {
      id: currentArtworkId,
      filename: currentFilename,
      title: title.trim() || 'Artwork Title',
      description: description.trim() || 'Medium & description',
      event: selectedEvent || null,
    };
  }, [currentArtworkId, currentFilename, title, description, selectedEvent]);

  // Code snippets
  const snippetCode = useMemo(() => {
    return formatArtworkObject(currentArtObj, '  ');
  }, [currentArtObj]);

  const fullArrayCode = useMemo(() => {
    let code = `export const artworks = [\n`;
    code += artworksList.map((a) => formatArtworkObject(a, '  ')).join('\n');
    code += `\n];\n`;
    return code;
  }, [artworksList]);

  // Filtered artworks for table
  const filteredArtworks = useMemo(() => {
    if (tableFilterArtist === 'all') return artworksList;
    const prefix = `${tableFilterArtist.toLowerCase()}-`;
    return artworksList.filter((a) => a.id?.toLowerCase().startsWith(prefix));
  }, [artworksList, tableFilterArtist]);

  return (
    <div className={styles.container}>
      {/* Toast */}
      {toastMsg && (
        <div className={styles.toast}>
          <FontAwesomeIcon icon={faCheck} style={{ color: '#38bdf8' }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Artwork Metadata Generator</h1>
          <p className={styles.headerDesc}>
            Index community sketches, calculate sequence numbers, pair with meetups, and generate code for{' '}
            <code>src/app/data/artworks.js</code>.
          </p>
        </div>
        <div className={styles.headerBadge}>
          <span>Cataloged Sketches:</span>
          <strong>{artworksList.length} Artworks</strong>
        </div>
      </div>

      {/* Main Grid */}
      <div className={styles.layoutGrid}>
        {/* Left Form */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>
              <FontAwesomeIcon icon={faImage} style={{ color: '#38bdf8' }} />
              <span>Artwork Information</span>
            </div>
            <button type="button" className={styles.btnSecondary} onClick={handleClearForm}>
              <FontAwesomeIcon icon={faRotateRight} />
              <span>Reset</span>
            </button>
          </div>

          <div className={styles.panelBody}>
            {/* Artist Selection */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>Select Artist *</span>
                <span className={styles.labelHint}>{initialArtists.length} registered</span>
              </label>
              <select
                className={styles.select}
                value={selectedArtistId}
                onChange={(e) => handleArtistSelect(e.target.value)}
              >
                {initialArtists.map((a) => {
                  const count = artworksList.filter((art) => art.id?.toLowerCase().startsWith(`${a.id.toLowerCase()}-`)).length;
                  return (
                    <option key={a.id} value={a.id}>
                      {a.id} — {a.name} ({count} sketches)
                    </option>
                  );
                })}
              </select>

              {/* Quick artist chips */}
              <div className={styles.chipsContainer}>
                {initialArtists.slice(0, 6).map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={`${styles.chip} ${selectedArtistId === a.id ? styles.chipActive : ''}`}
                    onClick={() => handleArtistSelect(a.id)}
                  >
                    {a.id} ({a.name.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Sequence number & extension */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span>Artwork Index #</span>
                  <span className={styles.labelHint}>ID: {currentArtworkId}</span>
                </label>
                <input
                  type="number"
                  min="1"
                  className={styles.input}
                  value={artNumber}
                  onChange={(e) => setArtNumber(parseInt(e.target.value, 10) || 1)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span>File Extension</span>
                  <span className={styles.labelHint}>File: {currentFilename}</span>
                </label>
                <select
                  className={styles.select}
                  value={extension}
                  onChange={(e) => setExtension(e.target.value)}
                >
                  <option value="webp">.webp (Recommended)</option>
                  <option value="png">.png</option>
                  <option value="jpg">.jpg</option>
                  <option value="jpeg">.jpeg</option>
                </select>
              </div>
            </div>

            {/* Title & Presets */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>Artwork Title *</span>
                <span className={styles.labelHint}>e.g. Galle Fort Lighthouse</span>
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter sketch title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className={styles.chipsContainer}>
                {TITLE_PRESETS.slice(0, 5).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={styles.chip}
                    onClick={() => setTitle(preset)}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Description & Medium */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>Medium / Description</span>
                <span className={styles.labelHint}>Watercolors, ink, notes</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Medium used, location details or personal reflection..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className={styles.chipsContainer}>
                {MEDIUM_PRESETS.slice(0, 4).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={styles.chip}
                    onClick={() => setDescription(preset)}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Association */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>Associated Meetup / Event</span>
                <span className={styles.labelHint}>Links to event gallery</span>
              </label>
              <select
                className={styles.select}
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="">None / Independent Sketch</option>
                {initialEvents.map((ev) => (
                  <option key={ev.slug} value={ev.slug}>
                    {ev.slug} — {ev.title} ({ev.date?.day} {ev.date?.month} {ev.year})
                  </option>
                ))}
              </select>
            </div>

            {/* Local Image File Preview */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>Preview Artwork Image (Optional)</span>
                <span className={styles.labelHint}>Local test view</span>
              </label>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <div
                className={styles.dropZone}
                onClick={() => fileInputRef.current?.click()}
              >
                <FontAwesomeIcon icon={faUpload} style={{ fontSize: '1.2rem', color: '#38bdf8', marginBottom: '6px' }} />
                <div className={styles.dropText}>
                  Click to pick a local image to preview in card, or test live at{' '}
                  <strong>/artworks-images/{selectedArtistId}/{currentFilename}</strong>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.btnPrimary}
                style={{ flex: 1 }}
                onClick={handleAddOrUpdate}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Save Artwork to List</span>
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => copyToClipboard(snippetCode, 'Copied snippet code!')}
              >
                <FontAwesomeIcon icon={faCopy} />
                <span>Copy Snippet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview & Code */}
        <div className={styles.panel}>
          <div className={styles.tabsBar}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'snippet' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('snippet')}
            >
              <FontAwesomeIcon icon={faFileCode} />
              <span>Snippet</span>
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'full' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('full')}
            >
              <FontAwesomeIcon icon={faFileCode} />
              <span>Full Array ({artworksList.length})</span>
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'checklist' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('checklist')}
            >
              <FontAwesomeIcon icon={faFolderTree} />
              <span>Asset Checklist</span>
            </button>
          </div>

          <div className={styles.panelBody}>
            {/* Live Gallery Card Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>
                  Live Gallery Card Preview
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>/gallery</span>
              </div>

              <div className={styles.artworkCardPreview}>
                <div className={styles.artworkImgFrame}>
                  {previewImageUrl ? (
                    <img
                      src={previewImageUrl}
                      alt={title || 'Preview'}
                      className={styles.artworkImg}
                    />
                  ) : (
                    <div className={styles.artworkImgPlaceholder}>
                      <FontAwesomeIcon icon={faImage} style={{ fontSize: '2rem' }} />
                      <span>/artworks-images/{selectedArtistId}/{currentFilename}</span>
                    </div>
                  )}
                </div>

                <div className={styles.artworkCardInfo}>
                  <div className={styles.artHeaderRow}>
                    <span className={styles.artIdBadge}>{currentArtworkId}</span>
                    {selectedEvent && (
                      <span className={styles.artEventBadge}>{selectedEvent}</span>
                    )}
                  </div>

                  <div className={styles.artTitle}>{title || 'Galle Fort Lighthouse'}</div>
                  <div className={styles.artArtist}>By {currentArtist.name} ({selectedArtistId})</div>
                  <div className={styles.artDesc}>
                    {description || 'Mix media (watercolor, ink, etc.)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab 1: Snippet */}
            {activeTab === 'snippet' && (
              <div>
                <pre className={styles.codeBox}>{snippetCode}</pre>
                <div className={styles.copyBar}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Paste into <code>src/app/data/artworks.js</code>
                  </span>
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={() => copyToClipboard(snippetCode, 'Copied snippet code!')}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                    <span>Copy Snippet</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Full Array */}
            {activeTab === 'full' && (
              <div>
                <pre className={styles.codeBox}>{fullArrayCode}</pre>
                <div className={styles.copyBar}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Full export of all {artworksList.length} artworks
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() =>
                        copyToClipboard(JSON.stringify(artworksList, null, 2), 'Copied artworks as JSON!')
                      }
                    >
                      <FontAwesomeIcon icon={faDownload} />
                      <span>Copy JSON</span>
                    </button>
                    <button
                      type="button"
                      className={styles.btnPrimary}
                      onClick={() => copyToClipboard(fullArrayCode, 'Copied full array code!')}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                      <span>Copy Full Array</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Checklist */}
            {activeTab === 'checklist' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#0f1218', padding: '1.25rem', borderRadius: '8px', border: '1px solid #2a3142' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    Required File Name &amp; Destination:
                  </div>
                  <code style={{ display: 'block', padding: '8px', background: '#14171f', borderRadius: '6px', color: '#38bdf8', marginTop: '6px', fontSize: '0.85rem' }}>
                    public/artworks-images/{selectedArtistId}/{currentFilename}
                  </code>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    Directory Path:
                  </div>
                  <code style={{ display: 'block', padding: '8px', background: '#14171f', borderRadius: '6px', color: '#f8fafc', marginTop: '6px', fontSize: '0.85rem' }}>
                    public/artworks-images/{selectedArtistId}/
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Artworks Table */}
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className={styles.panelTitle}>
              <FontAwesomeIcon icon={faFolderTree} style={{ color: '#38bdf8' }} />
              <span>Indexed Artworks Directory</span>
            </div>
            <span className={styles.artIdBadge}>{filteredArtworks.length} items</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Filter Artist:</span>
            <select
              className={styles.select}
              style={{ width: 'auto' }}
              value={tableFilterArtist}
              onChange={(e) => setTableFilterArtist(e.target.value)}
            >
              <option value="all">All Artists ({artworksList.length})</option>
              {initialArtists.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} — {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Filename</th>
                <th>Title</th>
                <th>Medium / Description</th>
                <th>Event</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtworks.map((art, idx) => (
                <tr key={art.id || idx}>
                  <td>
                    <span className={styles.artIdBadge}>{art.id}</span>
                  </td>
                  <td>
                    <code style={{ fontSize: '0.8rem', color: '#38bdf8' }}>{art.filename}</code>
                  </td>
                  <td>
                    <strong style={{ color: '#fff' }}>{art.title}</strong>
                  </td>
                  <td style={{ maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#94a3b8' }}>
                    {art.description || '—'}
                  </td>
                  <td>
                    {art.event ? (
                      <span className={styles.artEventBadge}>{art.event}</span>
                    ) : (
                      <span style={{ color: '#64748b' }}>—</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        onClick={() => {
                          const snippet = formatArtworkObject(art, '  ');
                          copyToClipboard(snippet, `Copied snippet for ${art.id}!`);
                        }}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#f87171' }}
                        onClick={() => {
                          if (confirm(`Remove artwork ${art.id} from local array?`)) {
                            setArtworksList((prev) => prev.filter((item) => item.id !== art.id));
                            showToast(`Removed ${art.id}`);
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
