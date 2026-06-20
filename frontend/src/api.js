const BASE = process.env.REACT_APP_API_URL || '';

export function apiUrl(path) {
  return `${BASE}${path}`;
}

export function assetsUrl(key) {
  const base = process.env.REACT_APP_ASSETS_URL || '/assets';
  return `${base}/${key}`;
}
