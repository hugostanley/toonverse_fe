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
export const W_INVITATION_PATH = '/w_auth/invitation';

// Artist Profile CRUD endpoints
export const ALL_ARTISTS = "/api/v1/artist_profiles"; // GET
export const ARTIST_PROFILE = (id: number) => `/api/v1/artist_profiles/${id}`; // GET | PATCH | PUT | DELETE

// Item CRUD endpoints
export const ALL_ITEMS = "/api/v1/items"; //GET | POST
export const ITEM = (id: number) => `/api/v1/items/${id}`; // GET | PATCH | PUT | DELETE
