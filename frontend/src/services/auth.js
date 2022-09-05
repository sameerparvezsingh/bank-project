import jwt_decode from "jwt-decode";

export function isLoggedIn() {
  let payload = null;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      payload = jwt_decode(token);
      if (payload.name) {
        payload.access_token = "8a702c3bfc0e79b36b382d33992a651e";
      }
    }
  } catch (error) {
    return false
  } finally {
    return payload;
  }
}

export function logout() {
  try {
    localStorage.removeItem("token");
  } catch (error) {}
}
