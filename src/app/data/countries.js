import { getData, getName } from 'country-list';

export const countries = getData().sort((a, b) => a.name.localeCompare(b.name));
export function countryName(code) {
  return code ? getName(code.toUpperCase()) || '' : '';
}
