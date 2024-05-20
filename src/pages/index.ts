// Static Pages
export { default as LandingPage } from './LandingPage';
export { default as UnauthorizedPage } from './errors/Unauthorized';

//Dynamic Pages
export { default as OrderPage } from './OrderPage';

// User Side
export { default as UserLoginPage } from './users/auth/Login';
export { default as UserRegisterPage } from './users/auth/Register';
export { default as UserAccountPage } from './users/account/UserAccount';
export { default as EditProfilePage } from './users/account/EditProfile';

// Workforce Side
export { default as WorkforceLoginPage } from './workforce/auth/Login';
export { default as WorkforceDashboard } from './workforce/Dashboard';