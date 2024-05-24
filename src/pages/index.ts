// Static Pages
export { default as LandingPage } from "./LandingPage";
export { default as UnauthorizedPage } from "./errors/Unauthorized";

//Dynamic Pages
export { default as OrderPage } from "./users/OrderPage";
export { default as Checkout } from "./users/Checkout";

// User Side
export { default as UserLoginPage } from "./users/auth/Login";
export { default as UserRegisterPage } from "./users/auth/Register";
export { default as UserAccountPage } from "./users/account/UserAccount";
export { default as EditProfilePage } from "./users/account/EditProfile";

// Workforce Side
export { default as WorkforceLoginPage } from './workforce/auth/Login';
export { default as InvitationPage } from './workforce/auth/Invitation';
export { default as InvitationForm } from './workforce/auth/AcceptInviteForm';
export { default as WorkforceNavbar } from './workforce/WorkforceNavbar';

// Admin Side
export { default as AdminDashboard } from './workforce/admin/AdminDashboard';
export { default as InviteArtist } from './workforce/admin/InviteArtist';
export { default as ArtistsList } from './workforce/admin/ArtistsList';

// Artist Side
export { default as ArtistDashboard } from './workforce/artist/ArtistDashboard';
export {default as ArtistProfileForm} from './workforce/artist/ArtistProfileForm';
export {default as ArtistProfileInfo} from './workforce/artist/ArtistProfileInfo';