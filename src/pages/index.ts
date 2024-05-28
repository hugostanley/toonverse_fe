// Static Pages
export { default as LandingPage } from "./LandingPage";
export { default as UnauthorizedPage } from "./errors/Unauthorized";

//Toast
export { default as ErrorToast } from "./errors/ErrorToast";

//Dynamic Pages
export { default as OrderPage } from "./users/OrderPage";
export { default as Checkout } from "./users/Checkout";

// User Side
export { default as UserLoginPage } from "./users/auth/Login";
export { default as UserRegisterPage } from "./users/auth/Register";
export { default as UserAccountPage } from "./users/account/UserAccount";
export { default as EditProfilePage } from "./users/account/EditProfile";

// Workforce Side
export { default as WorkforceLoginPage } from "./workforce/auth/Login";
export { default as InvitationPage } from "./workforce/auth/Invitation";
export { default as InvitationForm } from "./workforce/auth/AcceptInviteForm";
export { default as WorkforceNavbar } from "./workforce/WorkforceNavbar";
export { default as EditArtistProfile } from "./workforce/EditArtistProfile";

// Admin Side
export { default as AdminDashboard } from "./workforce/admin/AdminDashboard";
//// Admin Side - Artists
export { default as InviteArtist } from "./workforce/admin/InviteArtist";
export { default as ArtistsList } from "./workforce/admin/ArtistsList";
export { default as AllArtistsPage } from "./workforce/admin/AllArtists";
export { default as EditArtist } from "./workforce/admin/EditArtist";
//// Admin Side - Clients
export { default as AllClientsPage } from "./workforce/admin/AllClients";
export { default as EditClient } from "./workforce/admin/EditClient";
export { default as EditClientProfile } from "./workforce/admin/EditClientProfile";
//// Admin Side - Orders
export { default as AllOrdersPage } from "./workforce/admin/AllOrders";
export { default as OrdersTable } from "./workforce/admin/OrdersTable";
export { default as ClaimOrder } from "./workforce/admin/ClaimOrder";

// Artist Side
export { default as ArtistDashboard } from "./workforce/artist/ArtistDashboard";
export { default as EditBio } from "./workforce/artist/EditBio";
export { default as ArtistProfileInfo } from "./workforce/artist/ArtistProfileInfo";
export {default as NewArtistForm} from './workforce/artist/NewArtistForm';