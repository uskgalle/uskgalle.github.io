'use client';

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette,
  faPlus,
  faRotateRight,
  faCopy,
  faCheck,
  faTrash,
  faFolderPlus,
  faFileCode,
  faArrowRight,
  faDownload,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from './artist.module.css';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function formatInstagram(input) {
  if (!input) return '';
  let clean = input.trim();
  if (!clean) return '';
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean.replace(/\/+$/, '');
  }
  clean = clean.replace(/^@/, '');
  return `https://instagram.com/${clean}`;
}

function calculateNextId(list) {
  let maxNum = 0;
  for (const a of list) {
    const match = a.id && a.id.match(/^USKG(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  }
  return `USKG${maxNum + 1}`;
}

function formatArtistObject(a, indent = '  ') {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: '${(a.id || '').replace(/'/g, "\\'")}',`);
  lines.push(`${indent}  name: '${(a.name || '').replace(/'/g, "\\'")}',`);
  lines.push(`${indent}  slug: '${(a.slug || '').replace(/'/g, "\\'")}',`);
  if (a.role) {
    lines.push(`${indent}  role: '${(a.role || '').replace(/'/g, "\\'")}',`);
  }
  lines.push(`${indent}  bio: '${(a.bio || '').replace(/'/g, "\\'")}',`);
  if (a.instagram) {
    lines.push(`${indent}  instagram: '${(a.instagram || '').replace(/'/g, "\\'")}',`);
  }
  if (a.isSpecial) {
    lines.push(`${indent}  isSpecial: true,`);
  }
  lines.push(`${indent}},`);
  return lines.join('\n');
}

export default function ArtistGeneratorClient({ initialArtists = [] }) {
  const [artistsList, setArtistsList] = useState(initialArtists);

  // Form State
  const [name, setName] = useState('');
  const [id, setId] = useState(() => calculateNextId(initialArtists));
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [bio, setBio] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isSpecial, setIsSpecial] = useState(false);
  const [role, setRole] = useState('');

  // Selected Existing index
  const [selectedExistingIdx, setSelectedExistingIdx] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeTab, setActiveTab] = useState('snippet');
  const [toastMsg, setToastMsg] = useState(null);

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

  // Handlers
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (!isSlugManual) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (e) => {
    const val = e.target.value;
    setSlug(val);
    setIsSlugManual(val.trim().length > 0);
  };

  const handleIdChange = (e) => {
    let val = e.target.value.trim();
    if (/^\d+$/.test(val)) {
      val = `USKG${val}`;
    }
    setId(val);
  };

  const handleNextId = () => {
    const next = calculateNextId(artistsList);
    setId(next);
    setSelectedExistingIdx('');
    showToast(`Set next ID: ${next}`);
  };

  const handleClearForm = () => {
    setName('');
    setSlug('');
    setIsSlugManual(false);
    setBio('');
    setInstagram('');
    setIsSpecial(false);
    setRole('');
    setSelectedExistingIdx('');
    setId(calculateNextId(artistsList));
    showToast('Form cleared');
  };

  const handleLoadArtist = (index) => {
    const a = artistsList[index];
    if (!a) return;
    setName(a.name || '');
    setId(a.id || '');
    setSlug(a.slug || '');
    setIsSlugManual(true);
    setBio(a.bio || '');
    setInstagram(a.instagram || '');
    setIsSpecial(Boolean(a.isSpecial));
    setRole(a.role || '');
    setSelectedExistingIdx(String(index));
    window.scrollTo({ top: 100, behavior: 'smooth' });
    showToast(`Loaded ${a.name} into form`);
  };

  const handleAddOrUpdate = () => {
    if (!name.trim()) {
      showToast('Please enter an artist name first!');
      return;
    }

    const currentArtist = {
      id: id.trim() || calculateNextId(artistsList),
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      bio: bio.trim(),
      instagram: formatInstagram(instagram),
      isSpecial,
      role: isSpecial ? role.trim() : undefined,
    };

    const existingIdx = artistsList.findIndex(
      (a) => a.id.toLowerCase() === currentArtist.id.toLowerCase() || a.slug.toLowerCase() === currentArtist.slug.toLowerCase()
    );

    let updated;
    if (existingIdx !== -1) {
      updated = [...artistsList];
      updated[existingIdx] = currentArtist;
      showToast(`Updated existing artist ${currentArtist.id}`);
    } else {
      updated = [...artistsList, currentArtist];
      showToast(`Added ${currentArtist.name} (${currentArtist.id}) to array!`);
    }

    setArtistsList(updated);
    handleClearForm();
  };

  const handleDeleteArtist = (index) => {
    const target = artistsList[index];
    if (!target) return;
    if (confirm(`Remove ${target.name} (${target.id}) from the active array?`)) {
      const updated = artistsList.filter((_, idx) => idx !== index);
      setArtistsList(updated);
      showToast(`Removed ${target.name}`);
    }
  };

  // Current preview object
  const currentArtistObj = useMemo(() => {
    return {
      id: id.trim() || 'USKG1',
      name: name.trim() || 'Artist Name',
      slug: slug.trim() || slugify(name || 'Artist Name'),
      bio: bio.trim(),
      instagram: formatInstagram(instagram),
      isSpecial,
      role: isSpecial ? role.trim() : '',
    };
  }, [id, name, slug, bio, instagram, isSpecial, role]);

  const initials = useMemo(() => {
    const parts = (currentArtistObj.name || '').trim().split(' ').filter(Boolean);
    if (!parts.length) return '?';
    return parts.slice(0, 2).map((p) => p[0]).join('').toUpperCase();
  }, [currentArtistObj.name]);

  // Code Generation
  const snippetCode = useMemo(() => {
    return formatArtistObject(currentArtistObj, '  ');
  }, [currentArtistObj]);

  const fullArrayCode = useMemo(() => {
    let code = `export const artists = [\n`;
    code += artistsList.map((a) => formatArtistObject(a, '  ')).join('\n');
    code += `\n];\n`;
    return code;
  }, [artistsList]);

  // Filtered Roster
  const filteredRoster = useMemo(() => {
    if (!searchFilter.trim()) return artistsList;
    const q = searchFilter.toLowerCase();
    return artistsList.filter(
      (a) =>
        a.name?.toLowerCase().includes(q) ||
        a.id?.toLowerCase().includes(q) ||
        a.slug?.toLowerCase().includes(q) ||
        a.bio?.toLowerCase().includes(q)
    );
  }, [artistsList, searchFilter]);

  const profileImgPath = `public/artists-images/${currentArtistObj.id}.png`;
  const artworkDirPath = `public/artworks-images/${currentArtistObj.id}/`;
  const mkdirCmd = `mkdir "public\\artworks-images\\${currentArtistObj.id}"`;

  return (
    <div className={styles.container}>
      {/* Toast */}
      {toastMsg && (
        <div className={styles.toast}>
          <FontAwesomeIcon icon={faCheck} style={{ color: '#4ade80' }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Artist Profile Generator</h1>
          <p className={styles.headerDesc}>
            Manage community sketchers, calculate next USKG identifiers, preview cards, and output code for{' '}
            <code>src/app/data/artists.js</code>.
          </p>
        </div>
        <div className={styles.headerBadge}>
          <span>Current Roster:</span>
          <strong>{artistsList.length} Artists</strong>
        </div>
      </div>

      {/* Main Form & Preview Grid */}
      <div className={styles.layoutGrid}>
        {/* Left: Input Form Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>
              <FontAwesomeIcon icon={faPalette} style={{ color: '#c86d3b' }} />
              <span>Artist Details</span>
            </div>
            <button type="button" className={styles.btnSecondary} onClick={handleClearForm}>
              <FontAwesomeIcon icon={faRotateRight} />
              <span>Reset</span>
            </button>
          </div>

          <div className={styles.panelBody}>
            {/* Quick load existing dropdown */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>Load Existing Artist to Edit:</span>
                <span className={styles.labelHint}>{artistsList.length} in database</span>
              </label>
              <select
                className={styles.select}
                value={selectedExistingIdx}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedExistingIdx(val);
                  if (val !== '') {
                    handleLoadArtist(parseInt(val, 10));
                  }
                }}
              >
                <option value="">-- Select from existing artists --</option>
                {artistsList.map((a, idx) => (
                  <option key={a.id || idx} value={idx}>
                    {a.id} — {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Name & ID */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name *</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Yasith Arangala"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span>Artist ID *</span>
                  <span className={styles.labelHint}>Format: USKG#</span>
                </label>
                <div className={styles.inputWithBtn}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="USKG18"
                    value={id}
                    onChange={handleIdChange}
                  />
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={handleNextId}
                    title="Calculate next highest ID"
                  >
                    Next ID
                  </button>
                </div>
              </div>
            </div>

            {/* Slug & Instagram */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span>URL Slug</span>
                  <span className={styles.labelHint}>/artists/[slug]</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g. yasith-arangala"
                  value={slug}
                  onChange={handleSlugChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span>Instagram Handle / URL</span>
                  <span className={styles.labelHint}>@handle or URL</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="@urbansketchersgalle"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
            </div>

            {/* Special profile toggle */}
            <div className={styles.formGroup}>
              <label className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  checked={isSpecial}
                  onChange={(e) => setIsSpecial(e.target.checked)}
                />
                <span>Special Profile (Team Lead, Co-Founder, or System Agent)</span>
              </label>
              {isSpecial && (
                <div style={{ marginTop: '0.5rem' }}>
                  <label className={styles.label}>Custom Role Tag</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Co-Founder & Chapter Host"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Bio textarea */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>Biography</span>
                <span className={styles.labelHint}>{bio.length} characters</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Short bio description of the artist and sketching style..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
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
                <span>Save / Add to List</span>
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

        {/* Right: Live Preview & Code Panel */}
        <div className={styles.panel}>
          {/* Tabs */}
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
              <span>Full Array ({artistsList.length})</span>
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'checklist' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('checklist')}
            >
              <FontAwesomeIcon icon={faFolderPlus} />
              <span>File Setup Checklist</span>
            </button>
          </div>

          <div className={styles.panelBody}>
            {/* Live Card Preview Box */}
            <div className={styles.previewSection}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>
                  Live Profile Card Preview
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>/artists</span>
              </div>

              <div className={styles.previewArtistCard}>
                <div className={styles.cardTop}>
                  <div className={styles.avatarInitial}>{initials}</div>
                  <div className={styles.cardHeadInfo}>
                    <div className={styles.cardName}>{currentArtistObj.name}</div>
                    <div className={styles.cardBadges}>
                      <span className={styles.idBadge}>{currentArtistObj.id}</span>
                      {currentArtistObj.role && (
                        <span className={styles.roleBadge}>{currentArtistObj.role}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.cardBio}>
                  {currentArtistObj.bio || 'Bio description will appear here as you type...'}
                </div>

                {currentArtistObj.instagram && (
                  <div>
                    <a
                      href={currentArtistObj.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.cardInsta}
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                      <span>{currentArtistObj.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@')}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Tab 1: Snippet Code */}
            {activeTab === 'snippet' && (
              <div>
                <pre className={styles.codeBox}>{snippetCode}</pre>
                <div className={styles.copyBar}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Paste into <code>src/app/data/artists.js</code>
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

            {/* Tab 2: Full Array Code */}
            {activeTab === 'full' && (
              <div>
                <pre className={styles.codeBox}>{fullArrayCode}</pre>
                <div className={styles.copyBar}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Full export of all {artistsList.length} artists
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() =>
                        copyToClipboard(JSON.stringify(artistsList, null, 2), 'Copied artists as JSON!')
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
              <div className={styles.checklistCard}>
                <div className={styles.checkItem}>
                  <span className={styles.checkItemLabel}>1. Profile Photo Asset Location:</span>
                  <code className={styles.checkItemPath}>{profileImgPath}</code>
                </div>

                <div className={styles.checkItem}>
                  <span className={styles.checkItemLabel}>2. Artist Sketches Folder:</span>
                  <code className={styles.checkItemPath}>{artworkDirPath}</code>
                </div>

                <div className={styles.checkItem}>
                  <span className={styles.checkItemLabel}>3. Quick Windows Terminal Command:</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <code className={styles.checkItemPath} style={{ flex: 1 }}>{mkdirCmd}</code>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() => copyToClipboard(mkdirCmd, 'Copied mkdir command!')}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom: Roster Table */}
      <section className={styles.rosterSection}>
        <div className={styles.rosterHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              Current Artists Directory
            </h2>
            <span className={styles.tableIdBadge}>{filteredRoster.length} listed</span>
          </div>

          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.input}
              placeholder="Search by name, ID, or bio..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.rosterTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Artist Name</th>
                <th>Slug</th>
                <th>Bio Excerpt</th>
                <th>Instagram</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoster.map((artist, idx) => (
                <tr key={artist.id || idx}>
                  <td>
                    <span className={styles.tableIdBadge}>{artist.id}</span>
                  </td>
                  <td>
                    <strong style={{ color: '#fff' }}>{artist.name}</strong>
                    {artist.role && (
                      <span className={styles.roleBadge} style={{ marginLeft: '6px' }}>
                        {artist.role}
                      </span>
                    )}
                  </td>
                  <td>
                    <code style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{artist.slug}</code>
                  </td>
                  <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#94a3b8' }}>
                    {artist.bio || '—'}
                  </td>
                  <td>
                    {artist.instagram ? (
                      <a
                        href={artist.instagram}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#c86d3b', textDecoration: 'none', fontWeight: 600 }}
                      >
                        {artist.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@')}
                      </a>
                    ) : (
                      <span style={{ color: '#64748b' }}>—</span>
                    )}
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        onClick={() => handleLoadArtist(artistsList.indexOf(artist))}
                      >
                        Load
                      </button>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#f87171' }}
                        onClick={() => handleDeleteArtist(artistsList.indexOf(artist))}
                        title="Remove from local list"
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
