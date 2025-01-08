const crypto = require('crypto');  // Import the crypto module
const secretKey = 'your_secret_key';  // Replace this with your actual secret key

function generateLicenseKey(machineId) {
  var time = Date.now();  // Current timestamp
  var randomValue = crypto.randomBytes(8).toString('hex');  // Generate a random 8-byte string

  // Validate the machineId input
  if (!machineId || typeof machineId !== 'string') {
    throw new Error('Invalid machineId provided.');
  }

  // Create the HMAC with SHA-256 using the secret key, time, and machine ID
  const hash = crypto.createHmac('sha256', secretKey)
    .update(machineId + time + randomValue)  // Combine machineId, time, and random value
    .digest('hex');  // Get the hash as a hexadecimal string

  console.log('Generated License Key:', hash);
  return hash;
}

// Export the function using CommonJS
module.exports = generateLicenseKey;
