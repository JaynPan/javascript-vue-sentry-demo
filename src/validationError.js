class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = `Error: '${message}' from version '${import.meta.env.VITE_RELEASE_VERSION}'`
  }
}

export default ValidationError;
