'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './artists.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faPalette,
    faMagnifyingGlass,
    faXmark,
    faArrowDown91,
    faArrowDownAZ,
    faHashtag,
} from '@fortawesome/free-solid-svg-icons';

export default function ArtistsClient({ initialArtists }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('id'); // 'id' | 'sketches' | 'name'

    const filteredArtists = useMemo(() => {
        let result = [...initialArtists];

        // 1. Filter by search query (name, id, bio)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter((artist) => {
                const nameMatch = artist.name?.toLowerCase().includes(query);
                const idMatch = artist.id?.toLowerCase().includes(query);
                const bioMatch = artist.bio?.toLowerCase().includes(query);
                return nameMatch || idMatch || bioMatch;
            });
        }

        // 2. Sorting
        result.sort((a, b) => {
            if (sortBy === 'sketches') {
                // Descending: Most sketches first
                if (b.sketchCount !== a.sketchCount) {
                    return b.sketchCount - a.sketchCount;
                }
                // Tie-break by artist ID
                const numA = parseInt(String(a.id || '').replace(/\D/g, ''), 10) || 0;
                const numB = parseInt(String(b.id || '').replace(/\D/g, ''), 10) || 0;
                return numA - numB;
            }

            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }

            // Default: 'id' (USKG1, USKG2, etc.)
            const numA = parseInt(String(a.id || '').replace(/\D/g, ''), 10) || 0;
            const numB = parseInt(String(b.id || '').replace(/\D/g, ''), 10) || 0;
            if (numA !== numB) {
                return numA - numB;
            }
            return String(a.id || '').localeCompare(String(b.id || ''));
        });

        return result;
    }, [initialArtists, searchQuery, sortBy]);

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>Our People</span>
                <h1 className={styles.title}>USK Galle Artists</h1>
                <p className={styles.subtitle}>
                    Meet the talented sketchers capturing the architecture, culture, and coastal life of Galle.
                </p>

                <div className={styles.headerActions}>
                    <Link href="/register" className={styles.primaryActionBtn}>
                        <FontAwesomeIcon icon={faUserPlus} /> Register Profile
                    </Link>
                    <a
                        href="https://forms.gle/6siWSXRDP4S98xPQA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryActionBtn}
                    >
                        <FontAwesomeIcon icon={faPalette} /> Submit Artwork
                    </a>
                </div>
            </div>

            {/* Filter & Sort Controls */}
            <div className={styles.controlsWrapper}>
                <div className={styles.controlsBar}>
                    {/* Search box */}
                    <div className={styles.searchWrapper}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by name, ID (e.g. USKG1)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className={styles.clearBtn}
                                aria-label="Clear search"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        )}
                    </div>

                    {/* Sort Buttons */}
                    {/* Sort Buttons */}
                    <div className={styles.sortGroup}>
                        <span className={styles.sortLabel}>Sort by:</span>
                        <div className={styles.sortButtons}>
                            <button
                                type="button"
                                className={`${styles.sortBtn} ${sortBy === 'id' ? styles.activeSort : ''}`}
                                onClick={() => setSortBy('id')}
                                title="Sort by Artist ID"
                            >
                                <FontAwesomeIcon icon={faHashtag} />
                                <span className={styles.btnTextFull}>Artist ID</span>
                                <span className={styles.btnTextShort}>ID</span>
                            </button>
                            <button
                                type="button"
                                className={`${styles.sortBtn} ${sortBy === 'sketches' ? styles.activeSort : ''}`}
                                onClick={() => setSortBy('sketches')}
                                title="Sort by sketch count (highest first)"
                            >
                                <FontAwesomeIcon icon={faArrowDown91} />
                                <span className={styles.btnTextFull}>Sketch Count</span>
                                <span className={styles.btnTextShort}>Sketches</span>
                            </button>
                            <button
                                type="button"
                                className={`${styles.sortBtn} ${sortBy === 'name' ? styles.activeSort : ''}`}
                                onClick={() => setSortBy('name')}
                                title="Sort alphabetically by name"
                            >
                                <FontAwesomeIcon icon={faArrowDownAZ} />
                                <span className={styles.btnTextFull}>Name</span>
                                <span className={styles.btnTextShort}>Name</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Info / Status Bar */}
                <div className={styles.filterInfoRow}>
                    <span>
                        Showing <strong className={styles.countPill}>{filteredArtists.length}</strong>{' '}
                        {filteredArtists.length === 1 ? 'artist' : 'artists'}
                    </span>
                </div>
            </div>

            {/* Artists Grid */}
            {filteredArtists.length === 0 ? (
                <div className={styles.emptyState}>
                    <h3 className={styles.emptyStateTitle}>No artists found</h3>
                    <p>Try adjusting your search or filters.</p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery('');
                            setSortBy('id');
                        }}
                        className={styles.resetBtn}
                    >
                        Reset Filters
                    </button>
                </div>
            ) : (
                <div className={styles.grid}>
                    {filteredArtists.map((artist) => (
                        <Link key={artist.slug} href={`/artists/${artist.slug}`} className={styles.card}>
                            {/* Top Left Badges: ID & Sketch Count */}
                            <div className={styles.cardTop}>
                                {artist.id && (
                                    <span className={styles.artistIdBadge}>{artist.id}</span>
                                )}
                                <span
                                    className={styles.sketchCountBadge}
                                    title={`${artist.sketchCount} ${artist.sketchCount === 1 ? 'sketch' : 'sketches'}`}
                                    aria-label={`${artist.sketchCount} sketches`}
                                >
                                    <FontAwesomeIcon icon={faPalette} />
                                    <span>{String(artist.sketchCount).padStart(2, '0')}</span>
                                </span>
                            </div>

                            <div className={styles.cardHeader}>
                                <div className={styles.avatar}>
                                    <img
                                        src={artist.profileImage}
                                        alt={artist.name}
                                        className={styles.avatarImg}
                                    />
                                </div>
                                <div className={styles.artistMeta}>
                                    <h2 className={styles.name}>{artist.name}</h2>
                                </div>
                            </div>

                            <p className={styles.bio}>{artist.bio}</p>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
