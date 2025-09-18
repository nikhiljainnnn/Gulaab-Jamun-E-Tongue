const ERROR_MESSAGES = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/missing-email': 'Email is required.',
  'auth/missing-password': 'Password is required.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/email-already-in-use': 'An account already exists with this email.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/too-many-requests': 'Too many attempts. Try again later.',
  default: 'Something went wrong. Please try again.',
}

export function mapAuthError(error) {
  if (!error) return ''
  const code = typeof error === 'string' ? error : error.code
  return ERROR_MESSAGES[code] || ERROR_MESSAGES.default
}





