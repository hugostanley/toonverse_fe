// Static Pages
export { default as LandingPage } from "./LandingPage";
export { default as UnauthorizedPage } from "./errors/Unauthorized";

//Dynamic Pages
export { default as OrderPage } from "./users/OrderPage";
export { default as OrderFormTest } from "./users/OrderFormTest";
export { default as Checkout } from "./users/Checkout";

// User Side
export { default as UserLoginPage } from "./users/auth/Login";
export { default as UserRegisterPage } from "./users/auth/Register";
export { default as UserAccountPage } from "./users/account/UserAccount";
export { default as EditProfilePage } from "./users/account/EditProfile";

// Workforce Side
export { default as WorkforceLoginPage } from "./workforce/auth/Login";
export { default as WorkforceDashboard } from "./workforce/Dashboard";
