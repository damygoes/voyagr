const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string): boolean => {
  const trimmedName = name.trim();
  if (!name || trimmedName.length < 2 || trimmedName.length > 50) {
    return false;
  }
  const nameRegex = /^[a-zA-Z\s]+$/; // Allows letters and spaces
  return nameRegex.test(trimmedName);
};

const validatePassword = (password: string): boolean => {
  // Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const authInputValidator = {
  validateEmail,
  validateName,
  validatePassword,
};
