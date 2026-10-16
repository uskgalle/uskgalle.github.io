'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RegisterClient from '../../register/RegisterClient';
import styles from '../../register/register.module.css';

export default function EditClient({ artists }) {
  const [id, setId] = useState(null);
  useEffect(() => {
    const read = () => setId(new URLSearchParams(window.location.search).get('id') || '');
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);
  if (id === null) return <main className={styles.page}><p role="status">Loading artist details…</p></main>;
  const artist = artists.find(item => item.id === id);
  if (!artist) return <main className={styles.page}><h1>Artist not found</h1><p>Open Edit Details from your artist profile.</p><Link href="/artists">View Artists</Link></main>;
  return <RegisterClient key={artist.id} artist={artist} profileImage={artist.profileImage} />;
}
