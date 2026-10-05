const authErrorMessages = {
  "auth/email-already-in-use":
    "This email is already registered. Please login instead.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password should be at least 6 characters long.",
  "auth/missing-password": "Please enter your password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/too-many-requests":
    "Too many attempts. Please wait a moment and try again.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  "auth/popup-blocked": "Popup was blocked. Please allow popups and try again.",
  "auth/network-request-failed":
    "Network error. Please check your internet connection.",
  "auth/operation-not-allowed":
    "This sign-in method is not enabled. Please contact support.",
};

export const getAuthErrorMessage = (error) =>
  authErrorMessages[error?.code] ||
  error?.message ||
  "Something went wrong. Please try again.";
