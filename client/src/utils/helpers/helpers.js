export const capitalizeFirstLetter = (str) => {
  if (!str) return str;  // handle empty or falsy strings gracefully
  return str.charAt(0).toUpperCase() + str.slice(1);
};