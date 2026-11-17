import { useRef, useState } from 'react';
import { countries, countryName } from '../data/countries';
import styles from './register.module.css';

export default function CountrySearch({ value, onChange }) {
  const input = useRef(null);
  const [text, setText] = useState(() => countryName(value));
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const query = text.trim().toLowerCase();
  const matches = countries.filter(country => country.name.toLowerCase().includes(query) || country.code.toLowerCase() === query);
  const active = open ? matches[activeIndex] : undefined;

  function close() {
    setOpen(false);
    setActiveIndex(-1);
  }

  function select(country) {
    setText(country.name);
    onChange(country.code);
    input.current.setCustomValidity('');
    close();
  }

  function search(event) {
    const next = event.target.value;
    const term = next.trim().toLowerCase();
    const exact = countries.find(country => country.name.toLowerCase() === term || country.code.toLowerCase() === term);
    setText(next);
    onChange(exact?.code || '');
    event.target.setCustomValidity(term && !exact ? 'Choose a country from the suggestions.' : '');
    setActiveIndex(-1);
    setOpen(true);
  }

  function handleKey(event) {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      close();
    } else if (event.key === 'Enter' && open && (active || matches.length === 1)) {
      event.preventDefault();
      select(active || matches[0]);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (!matches.length) return;
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const next = activeIndex < 0 ? (step === 1 ? 0 : matches.length - 1) : (activeIndex + step + matches.length) % matches.length;
      setActiveIndex(next);
      requestAnimationFrame(() => document.getElementById(`country-option-${matches[next].code}`)?.scrollIntoView({ block: 'nearest' }));
    }
  }

  return <div className={styles.countrySearch}>
    <input ref={input} id="country" name="country-name" className={styles.input} value={text}
      required autoComplete="off" autoCapitalize="none" placeholder="Search for a country"
      role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls="country-suggestions"
      aria-activedescendant={active ? `country-option-${active.code}` : undefined}
      onFocus={event => { event.target.select(); setOpen(true); }}
      onClick={() => setOpen(true)}
      onBlur={() => { if (value) setText(countryName(value)); close(); }}
      onChange={search} onKeyDown={handleKey} />
    <ul id="country-suggestions" role="listbox" aria-label="Country suggestions" hidden={!open} className={styles.countrySuggestions}>
      {open && matches.map(country => (
        <li key={country.code} id={`country-option-${country.code}`} role="option" aria-selected={country === active}
          onMouseDown={event => event.preventDefault()} onClick={() => select(country)}>{country.name}</li>
      ))}
    </ul>
    {open && matches.length === 0 && <p role="status" className={styles.countryNoMatches}>No matching countries.</p>}
  </div>;
}
