const express = require('express');
const router = express.Router();
const { registerCandidate, login, mockGoogleAuth, sendPhoneOtp, verifyPhoneOtp, forgotPassword, resetPassword, updateProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerCandidate);
router.post('/login', login);
router.post('/google', mockGoogleAuth);
router.post('/send-phone-otp', sendPhoneOtp);
router.post('/verify-phone-otp', verifyPhoneOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.put('/update', protect, updateProfile);

module.exports = router;
