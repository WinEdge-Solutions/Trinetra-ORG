/**
 * Stateless HMAC-Signed Math Addition Verification (Addition of Numbers)
 * Replaces alphanumeric code generation with accessible arithmetic
 * Serverless-compatible, zero-dependency, anti-replay, anti-brute-force
 */

const crypto = require('crypto');

const CAPTCHA_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY || 'trinetra-captcha-secret-salt-2026';
const EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

function generateCaptchaChallenge() {
  // Generate two numbers: e.g. num1 between 3 and 14, num2 between 2 and 11
  const num1 = Math.floor(Math.random() * 12) + 3;
  const num2 = Math.floor(Math.random() * 10) + 2;
  const sum = num1 + num2;
  const equation = `${num1} + ${num2} = ?`;

  const salt = crypto.randomBytes(8).toString('hex');
  const timestamp = Date.now();
  const signature = crypto
    .createHmac('sha256', CAPTCHA_SECRET)
    .update(String(sum) + ':' + salt + ':' + timestamp)
    .digest('hex');

  const token = `${signature}.${salt}.${timestamp}`;
  const svg = renderMathSvg(num1, num2);

  return {
    equation,
    num1,
    num2,
    sum,
    svg,
    token
  };
}

function verifyCaptchaChallenge(userCode, token) {
  if (userCode === undefined || userCode === null || String(userCode).trim() === '') {
    return { valid: false, error: 'Please enter the answer to the addition.' };
  }

  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Missing security verification token. Please refresh the question.' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Invalid security verification token.' };
  }

  const [signature, salt, timestampStr] = parts;
  const timestamp = parseInt(timestampStr, 10);
  const now = Date.now();

  if (isNaN(timestamp) || now - timestamp > EXPIRY_MS) {
    return { valid: false, error: 'Math verification expired. Please click refresh.' };
  }

  if (timestamp > now + 30000) {
    return { valid: false, error: 'Invalid verification clock.' };
  }

  const cleanInput = String(userCode).trim();
  const expectedSignature = crypto
    .createHmac('sha256', CAPTCHA_SECRET)
    .update(cleanInput + ':' + salt + ':' + timestamp)
    .digest('hex');

  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expectedSignature, 'hex');

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return { valid: false, error: 'Incorrect answer. Please solve the addition problem.' };
  }

  return { valid: true };
}

function renderMathSvg(num1, num2) {
  const width = 140;
  const height = 40;
  const text = `${num1} + ${num2} = ?`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;user-select:none;"><rect width="100%" height="100%" fill="#fffbeb" rx="10"/><text x="50%" y="26" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace" font-size="16" font-weight="800" fill="#92400e" letter-spacing="1">${text}</text></svg>`;
}

module.exports = {
  generateCaptchaChallenge,
  verifyCaptchaChallenge
};

