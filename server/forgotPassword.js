const express = require('express');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://stkfhbalhkhkftqdbnqd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0a2ZoYmFsaGtoa2Z0cWRibnFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTMxNTMyOCwiZXhwIjoyMDcwODkxMzI4fQ.I7xfHXrEOwVyyPtVxDi11-ln-s8hRop2ICzjVCzkUHY'; // Replace with your actual service role key from Supabase dashboard
const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts, please try again later.' }
});

// Route to set up 2FA during signup
router.post('/setup-2fa', limiter, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  // Find user by email
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();
  if (userError || !user) return res.status(404).json({ error: 'User not found' });
  // Generate a 2FA secret
  const secret = speakeasy.generateSecret({ name: `ArcadeonSolutions (${email})` });
  // Store secret in user_2fa table
  await supabase.from('user_2fa').upsert([{ user_id: user.id, secret: secret.base32 }]);
  // Generate QR code for authenticator app
  const qr = await qrcode.toDataURL(secret.otpauth_url);
  res.json({ qr, secret: secret.base32 });
});

// Route to verify 2FA code for password reset
router.post('/forgot-password', limiter, async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) return res.status(400).json({ error: 'Email and token required' });
  // Find user by email
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();
  if (userError || !user) return res.status(404).json({ error: 'User not found' });
  // Get 2FA secret
  const { data: twofa, error: twofaError } = await supabase
    .from('user_2fa')
    .select('secret')
    .eq('user_id', user.id)
    .single();
  if (twofaError || !twofa) return res.status(404).json({ error: '2FA not set up' });
  // Verify token
  const verified = speakeasy.totp.verify({
    secret: twofa.secret,
    encoding: 'base32',
    token,
    window: 1
  });
  if (verified) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ error: 'Invalid 2FA code' });
  }
});

// Login route with 2FA verification
router.post('/login', limiter, async (req, res) => {
  const { email, password, token } = req.body;
  // Find user by email
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id, password')
    .eq('email', email)
    .single();
  if (userError || !user) return res.status(404).json({ error: 'User not found' });
  // Check password
  if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid password' });
  // Get 2FA secret
  const { data: twofa, error: twofaError } = await supabase
    .from('user_2fa')
    .select('secret')
    .eq('user_id', user.id)
    .single();
  if (twofaError || !twofa) return res.status(400).json({ error: '2FA not set up' });
  // Verify token
  const verified = speakeasy.totp.verify({
    secret: twofa.secret,
    encoding: 'base32',
    token,
    window: 1
  });
  if (!verified) return res.status(401).json({ error: 'Invalid 2FA code' });
  return res.json({ success: true });
});

module.exports = router;
