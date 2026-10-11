import { countryName } from '../../app/data/countries';

export default function CountryBadge({ country, bare = false }) {
  const name = countryName(country);
  if (!name) return null;
  return <span title={name} aria-label={name} style={bare ? { display: 'inline-flex', verticalAlign: 'middle', fontSize: 14 } : { display: 'inline-flex', padding: '4px 6px', border: '1px solid #ddd', borderRadius: 4, verticalAlign: 'middle', marginLeft: 8, fontSize: 14 }}>
    <span aria-hidden="true" className={`fi fi-${country.toLowerCase()}`} />
  </span>;
}
