export const GetUppercaseText = (text) => {
  let upperCasedText = text.charAt(0).toUpperCase() + text.slice(1);

  return upperCasedText;
};
