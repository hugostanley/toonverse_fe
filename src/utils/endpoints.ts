// dev env
export const BASE_URL = "http://127.0.0.1:3000";

// User
export const REGISTER_URL = `/auth`;
export const LOGIN_URL = `/auth/sign_in`;
export const LOGOUT_URL = `/auth/sign_out`;

// User Profile CRUD endpoints
export const ALL_USERS = "/api/v1/user_profiles"; // GET
export const USER_PROFILE = (id: number) => `/api/v1/user_profiles/${id}`; // GET | PATCH | PUT | DELETE

// Workforce
export const W_LOGIN_URL = `${BASE_URL}/w_auth/sign_in`;
export const W_LOGOUT_URL = `${BASE_URL}/w_auth/sign_out`;
export const W_INVITATION_PATH = "/w_auth/invitation";

// Artist Profile CRUD endpoints
export const ALL_ARTISTS = "/api/v1/artist_profiles"; // GET
export const ARTIST_PROFILE = (id: number) => `/api/v1/artist_profiles/${id}`; // GET | PATCH | PUT | DELETE

// Item CRUD endpoints
export const ALL_ITEMS = "/api/v1/items"; //GET | POST
export const ITEM = (id: number) => `/api/v1/items/${id}`; // GET | PATCH | PUT | DELETE
export const DELETE_ITEM = (id: number) => `/api/v1/items/${id}`;

// Payment
export const PAYMENT = `${BASE_URL}/api/v1/payments`;

// Orders
export const ALL_ORDERS = "/api/v1/orders"; // GET | POST
export const ORDER = (id: number) => `/api/v1/orders/${id}`; // GET | PATCH | PUT | DELETE

// Jobs
export const ALL_JOBS = "/api/v1/jobs"; // GET | POST
export const SHOW_JOB = (id: number) => `/api/v1/jobs/${id}`; // GET | PATCH | PUT | DELETE

// Artworks
export const ALL_ARTWORKS = "/api/v1/artworks"; // GET | POST
export const ARTWORKS = (id: number) => `/api/v1/artworks/${id}`; // GET | PATCH | PUT | DELETE
