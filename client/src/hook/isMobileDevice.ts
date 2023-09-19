export const isMobileDevice = () => {
  if (window.matchMedia("(max-width: 768px)").matches) {
    // This is a mobile device (viewport width is less than or equal to 768px)
    return true;
  } else {
    // This is a desktop device
    return false;
  }
};
