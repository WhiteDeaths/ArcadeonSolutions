const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

const users = {};

// Rate limiter for login and 2FA endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: 'Too many attempts, please try again later.' }
});

// Helper for token expiration
function isTokenExpired(createdAt, expiresIn = 300) { // expiresIn in seconds
  return ((Date.now() - createdAt) / 1000) > expiresIn;
}

// Dummy user store for demo (replace with real DB in production)
users['demo@arcadeon.co.uk'] = {
  password: bcrypt.hashSync('password123', 10),
  secret: '', // Will be set during signup
  tokenCreatedAt: null,
};

// Route to set up 2FA during signup
router.post('/setup-2fa', limiter, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  // Generate a 2FA secret
  const secret = speakeasy.generateSecret({ name: `ArcadeonSolutions (${email})` });
  users[email] = { secret: secret.base32, tokenCreatedAt: Date.now(), password: bcrypt.hashSync('password123', 10) };
  // Generate QR code for authenticator app
  const otpauth_url = secret.otpauth_url;
  const qr = await qrcode.toDataURL(otpauth_url);
  res.json({ qr, secret: secret.base32 });
});

// Route to verify 2FA code for password reset
router.post('/forgot-password', limiter, (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) return res.status(400).json({ error: 'Email and token required' });
  if (!users[email] || !users[email].secret) return res.status(404).json({ error: 'User or 2FA not found' });
  const verified = speakeasy.totp.verify({
    secret: users[email].secret,
    encoding: 'base32',
    token,
    window: 1 // Accept tokens +/- 30s
  });
  const createdAt = users[email].tokenCreatedAt || Date.now();
  if (verified && !isTokenExpired(createdAt, 300)) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ error: 'Invalid or expired 2FA code' });
  }
});

// Login route with 2FA verification
router.post('/login', limiter, (req, res) => {
  const { email, password, token } = req.body;
  const user = users[email];
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid password' });
  if (!user.secret) return res.status(400).json({ error: '2FA not set up' });
  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: 'base32',
    token,
    window: 1 // Accept tokens +/- 30s
  });
  const createdAt = user.tokenCreatedAt || Date.now();
  if (!verified || isTokenExpired(createdAt, 300)) return res.status(401).json({ error: 'Invalid or expired 2FA code' });
  return res.json({ success: true });
});

module.exports = router;
// Dummy user store for demo (replace with real DB in production)
users['demo@arcadeon.co.uk'] = {
  password: 'password123',
  secret: '', // Will be set during signup
};

// Login route with 2FA verification
router.post('/login', (req, res) => {
  const { email, password, token } = req.body;
  const user = users[email];
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.password !== password) return res.status(401).json({ error: 'Invalid password' });
  if (!user.secret) return res.status(400).json({ error: '2FA not set up' });
  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: 'base32',
    token
  });
  if (!verified) return res.status(401).json({ error: 'Invalid 2FA code' });
  return res.json({ success: true });
});
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();

const users = {};
// Route to set up 2FA during signup
router.post('/setup-2fa', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  // Generate a 2FA secret
  const secret = speakeasy.generateSecret({ name: `ArcadeonSolutions (${email})` });
  users[email] = { secret: secret.base32 };
  // Generate QR code for authenticator app
  const otpauth_url = secret.otpauth_url;
  const qr = await qrcode.toDataURL(otpauth_url);
  res.json({ qr, secret: secret.base32 });
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your.email@gmail.com', // replace with your email
    pass: 'yourpassword'          // replace with your password or app password
  }
});

// Route to verify 2FA code for password reset
router.post('/forgot-password', (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) return res.status(400).json({ error: 'Email and token required' });
  if (!users[email] || !users[email].secret) return res.status(404).json({ error: 'User or 2FA not found' });
  const verified = speakeasy.totp.verify({
    secret: users[email].secret,
    encoding: 'base32',
    token
  });
  if (verified) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ error: 'Invalid 2FA code' });
  }
});


module.exports = router;
