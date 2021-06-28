export default function backendError(error) {
  const unknownError = 'Error desconocido.';
  let result;
  if (!error.response || error.response.status === 500) {
    result = { message: unknownError };
  } else {
    const { response } = error;
    result = response.data
      ? (response.data.result || response.data)
      : response

    if (!result.message) {
      result.message = unknownError;
    }
  }
  return result;
}
