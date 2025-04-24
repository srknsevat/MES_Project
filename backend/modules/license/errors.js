class LicenseError extends Error {
  constructor(message) {
    super(message);
    this.name = "LicenseError";
    this.statusCode = 403;
  }
}
module.exports = { LicenseError };