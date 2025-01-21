export const setCookie = (name, value, days = 7, path = "/") => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=${path}`;
};

export const getCookieValue = (name) => {
  const nameString = `${encodeURIComponent(name)}=`;
  const allCookies = document.cookie.split(";");

  for (let i = 0; i < allCookies.length; i++) {
    let cookie = allCookies[i].trim();
    if (cookie.startsWith(nameString)) {
      // Return everything after "name="
      return decodeURIComponent(cookie.substring(nameString.length));
    }
  }

  return null;
}

export const saveToLocalStorage = (key, value) => {
  // Convert value to a JSON string if it's not already a string
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);

  localStorage.setItem(key, stringValue);
}
