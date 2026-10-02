// Simple auth layer (localStorage for now).
// LATER: replace the bodies of these functions with API/DB calls
// (e.g. fetch("/api/login")) — the rest of the app won't need changes.
const KEY = "portal_user";

export const auth = {
  getUser() {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch {
      return null;
    }
  },
  login(name) {
    const user = { name: name.trim() };
    localStorage.setItem(KEY, JSON.stringify(user));
    return user;
  },
  logout() {
    localStorage.removeItem(KEY);
  },
};
