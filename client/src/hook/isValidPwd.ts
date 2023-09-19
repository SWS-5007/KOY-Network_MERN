export const isValidPwd = (password: string) => {
  let isLeast8 = password.length >= 8;

  const isIncludeNumber = /\d/.test(password);

  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;
  const isIncludeSpeical = specialCharRegex.test(password);

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const isIncludeBothCases =
    uppercaseRegex.test(password) && lowercaseRegex.test(password);

  return {
    isLeast8: isLeast8,
    isIncludeNumber: isIncludeNumber,
    isIncludeSpeical: isIncludeSpeical,
    isIncludeBothCases: isIncludeBothCases,
  };
};
