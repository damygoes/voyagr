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

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push(
      "Password must contain at least one special character (@$!%*?&).",
    );
  }

  return errors;
};

export const authInputValidator = {
  validateEmail,
  validateName,
  validatePassword,
};
