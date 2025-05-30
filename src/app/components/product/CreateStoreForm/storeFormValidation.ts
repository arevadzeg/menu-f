export const emailPattern = {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Enter a valid email address",
};

export const phonePattern = {
  value: /^\d{9}$/,
  message: "Enter a valid 9-digit phone number",
};

export const facebookPattern = {
  value: /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/,
  message: "Enter a valid Facebook URL",
};

export const instagramPattern = {
  value: /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/,
  message: "Enter a valid Instagram URL",
};
