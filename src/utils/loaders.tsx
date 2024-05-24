import { redirect } from 'react-router-dom';
import { getLocalStorage } from '@utils';

// to access user pages only when logged in as user
export function userAccess() {
  const headers = getLocalStorage('Headers') || null;
  if (headers === null) {
    return redirect("/login")
  }

  const { 'access-token': accessToken, uid, client, expiry, authorization } = headers;
  const { data } = getLocalStorage('AccountData');
  const { role, id, email } = data;

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/login")
  }

  if (role !== undefined) {
    return redirect("/no-access");
  }

  return { accessToken, uid, client, expiry, authorization, id, email, role }
}

// workforce restricted pages
export function workforceAccess() {
  const headers = getLocalStorage('Headers') || null;
  if (headers === null) {
    return redirect("/w/login")
  }

  const { 'access-token': accessToken, uid, client, expiry, authorization } = headers;
  const { data } = getLocalStorage('AccountData');
  const { role, id, email } = data;

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/w/login")
  } 
  
  if (role === undefined) {
    return redirect("/no-access");
  }

  return { accessToken, uid, client, expiry, authorization, role, id, email }
}

// admin-restricted pages
export function adminAccess() {
  const headers = getLocalStorage('Headers') || null;
  if (headers === null) {
    return redirect("/w/login")
  }

  const { 'access-token': accessToken, uid, client, expiry, authorization } = headers;
  const { data } = getLocalStorage('AccountData');
  const { role, id, email } = data;

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/w/login")
  } 
  
  if (role === undefined || role !== 'admin') {
    return redirect("/no-access");
  }

  return { accessToken, uid, client, expiry, authorization, role, id, email }
}

// artist-restricted pages
export function artistAccess() {
  const headers = getLocalStorage('Headers') || null;
  if (headers === null) {
    return redirect("/w/login")
  }

  const { 'access-token': accessToken, uid, client, expiry, authorization } = headers;
  const { data } = getLocalStorage('AccountData');
  const { role, id, email } = data;

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/w/login")
  } 
  
  if (role === undefined || role !== 'artist') {
    return redirect("/no-access");
  }

  return { accessToken, uid, client, expiry, authorization, role, id, email }
}