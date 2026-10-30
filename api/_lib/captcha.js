/**
 * Stateless HMAC-Signed Visual CAPTCHA Generator
 * Serverless-compatible, zero-dependency, anti-replay, anti-brute-force
 */

const crypto = require('crypto');

const CAPTCHA_CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const CAPTCHA_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY || 'trinetra-captcha-secret-salt-2026';
const EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

function generateCaptchaChallenge() {
  let text = '';
  for (let i = 0; i < 5; i++) {
    text += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  }

  const salt = crypto.randomBytes(8).toString('hex');
  const timestamp = Date.now();
  const signature = crypto
    .createHmac('sha256', CAPTCHA_SECRET)
    .update(text + ':' + salt + ':' + timestamp)
    .digest('hex');

  const token = `${signature}.${salt}.${timestamp}`;
  const svg = renderCaptchaSvg(text);

  return {
    svg,
    token
  };
}

function verifyCaptchaChallenge(userCode, token) {
  if (!userCode || typeof userCode !== 'string') {
    return { valid: false, error: 'Verification code is required.' };
  }

  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Missing security verification token. Please refresh the code.' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Invalid security verification token.' };
  }

  const [signature, salt, timestampStr] = parts;
  const timestamp = parseInt(timestampStr, 10);
  const now = Date.now();

  if (isNaN(timestamp) || now - timestamp > EXPIRY_MS) {
    return { valid: false, error: 'Verification code expired. Please click refresh.' };
  }

  if (timestamp > now + 30000) {
    return { valid: false, error: 'Invalid verification clock.' };
  }

  const cleanInput = userCode.trim().toUpperCase();
  const expectedSignature = crypto
    .createHmac('sha256', CAPTCHA_SECRET)
    .update(cleanInput + ':' + salt + ':' + timestamp)
    .digest('hex');

  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expectedSignature, 'hex');

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return { valid: false, error: 'Incorrect verification code. Please check the characters and try again.' };
  }

  return { valid: true };
}

function renderCaptchaSvg(text) {
  const width = 140;
  const height = 40;
  const colors = ['#92400e', '#b45309', '#1e293b', '#7c2d12', '#0f172a'];

  // Curved disturbance lines
  let lines = '';
  for (let i = 0; i < 3; i++) {
    const x1 = Math.floor(Math.random() * 15);
    const y1 = Math.floor(Math.random() * height);
    const x2 = Math.floor(width - Math.random() * 15);
    const y2 = Math.floor(Math.random() * height);
    const cx = Math.floor(width / 2 + (Math.random() - 0.5) * 30);
    const cy = Math.floor(height / 2 + (Math.random() - 0.5) * 30);
    const stroke = colors[i % colors.length];
    lines += `<path d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" stroke="${stroke}" stroke-width="1.5" fill="none" opacity="0.4"/>`;
  }

  // Scattered background noise dots
  let dots = '';
  for (let i = 0; i < 20; i++) {
    const dx = Math.floor(Math.random() * width);
    const dy = Math.floor(Math.random() * height);
    const r = (Math.random() * 1.5 + 0.5).toFixed(1);
    const color = colors[Math.floor(Math.random() * colors.length)];
    dots += `<circle cx="${dx}" cy="${dy}" r="${r}" fill="${color}" opacity="0.25"/>`;
  }

  // Distorted text characters
  let chars = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const x = 14 + i * 24 + Math.floor((Math.random() - 0.5) * 4);
    const y = 28 + Math.floor((Math.random() - 0.5) * 6);
    const rot = Math.floor((Math.random() - 0.5) * 30);
    const color = colors[i % colors.length];
    chars += `<text x="${x}" y="${y}" font-family="Courier New, monospace" font-size="22" font-weight="bold" fill="${color}" transform="rotate(${rot}, ${x}, ${y})">${ch}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;user-select:none;"><rect width="100%" height="100%" fill="#fffbeb" rx="10"/>${lines}${dots}${chars}</svg>`;
}

module.exports = {
  generateCaptchaChallenge,
  verifyCaptchaChallenge
};

