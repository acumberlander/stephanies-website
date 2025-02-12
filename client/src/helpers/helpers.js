export const setCookie = (name, value, days = 7, path = "/") => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};${expires};path=${path}`;
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
};

export const saveToLocalStorage = (key, value) => {
  // Convert value to a JSON string if it's not already a string
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);

  localStorage.setItem(key, stringValue);
};

/**
 * Copys stripe test card to user's clipboard so
 * they can easily paste it into the card number input.
 */
export const copyToClipboard = () => {
  const customData = "4242 4242 4242 4242";
  navigator.clipboard
    .writeText(customData)
    .then(() =>
      alert(
        `The Stripe Test Card # was copied to your clipboard.
        Paste it in the card number input on the next page.
        4242 4242 4242 4242
        `
      )
    )
    .catch((err) => console.error("Failed to copy:", err));
};
