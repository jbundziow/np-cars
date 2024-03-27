const BACKEND_URL = process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : 'http://localhost:3000/api';
const BACKEND_IMG_URL = process.env.NODE_ENV === 'production' ? process.env.BACKEND_IMG_URL : 'http://localhost:3000';

export { BACKEND_URL, BACKEND_IMG_URL }