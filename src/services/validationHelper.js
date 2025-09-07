export function getFirstValidationError(error) {
  if (!error || !error.response || error.response.status !== 422) return null;
  const errors = error.response.data?.errors;
  if (!errors || typeof errors !== 'object') return null;
  const firstField = Object.keys(errors)[0];
  if (firstField && Array.isArray(errors[firstField]) && errors[firstField].length > 0) {
    return errors[firstField][0];
  }
  return null;
}
