const BACKEND_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api';
const BACKEND_IMG_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export { BACKEND_URL, BACKEND_IMG_URL }