const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new User
exports.registerCandidate = async (req, res) => {
  try {
    const { name, email, password, phone, role, educationDetails, category, experienceLevel, domain, skills, interests, location } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name, email, password: hashedPassword, phone, role: role || 'candidate',
      educationDetails, category, experienceLevel, domain, skills, interests, location
    });

    if (user) {
      res.status(201).json({
        _id: user.id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id, user.role)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login generic (Candidate/Employer)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id, user.role)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mock Auth Controllers
exports.mockGoogleAuth = async (req, res) => {
  try {
    const { email, name } = req.body; 
    if (!email) return res.status(400).json({ message: 'Email required' });
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        name: name || 'Google User', email, authProvider: 'google', role: 'candidate'
      });
    }

    res.json({
      _id: user.id, name: user.name, email: user.email, role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendPhoneOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone is required' });
    
    let user = await User.findOne({ phone });
    if (!user) {
      // Create barebones user for signup-via-OTP flow
      user = await User.create({
        name: `User_${String(phone).slice(-4)}`, email: `${phone}@demo.com`, phone, authProvider: 'otp', role: 'candidate'
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.phoneOtp = otp;
    user.phoneOtpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    console.log(`[SMS MOCK] Sending OTP ${otp} to phone ${phone}`);
    res.json({ message: 'OTP sent to mobile successfully', mockOtp: otp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyPhoneOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: 'Phone and OTP are required' });

    const user = await User.findOne({ 
      phone, 
      phoneOtp: otp,
      phoneOtpExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

    user.phoneOtp = undefined;
    user.phoneOtpExpires = undefined;
    await user.save();
    
    res.json({
      _id: user.id, name: user.name, email: user.email, role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    // Prioritize real SMTP
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
          service: 'gmail', // or configured host
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });
      const message = {
          from: `"EduKeeda Support" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: 'Password Reset OTP',
          text: `Your OTP for password reset is: ${otp}. It expires in 15 minutes.`
      };
      await transporter.sendMail(message);
      return res.json({ message: 'OTP sent successfully to registered email' });
    }

    // Fallback Ethereal test account if real SMTP not found
    nodemailer.createTestAccount((err, account) => {
      if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          return res.status(500).json({ message: 'Error configuring mailer' });
      }
      
      const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
              user: account.user,
              pass: account.pass
          }
      });

      const message = {
          from: 'EduKeeda Support <support@edukeeda.demo>',
          to: user.email,
          subject: 'Password Reset OTP',
          text: `Your OTP for password reset is: ${otp}. It expires in 15 minutes.`
      };

      transporter.sendMail(message, (err, info) => {
          if (err) {
              console.log('Error occurred. ' + err.message);
              return res.status(500).json({ message: 'Error sending email' });
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          // Provide OTP explicitly in response payload for easy testing without ethereal access
          res.json({ message: 'OTP sent successfully via Mock Ethereal Email', previewUrl: nodemailer.getTestMessageUrl(info), mockOtp: otp });
      });
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ 
      email, 
      resetOtp: otp,
      resetOtpExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.educationDetails = req.body.educationDetails !== undefined ? req.body.educationDetails : user.educationDetails;
      user.category = req.body.category || user.category;
      user.experienceLevel = req.body.experienceLevel || user.experienceLevel;
      user.domain = req.body.domain !== undefined ? req.body.domain : user.domain;
      user.skills = req.body.skills !== undefined ? req.body.skills : user.skills;
      user.interests = req.body.interests !== undefined ? req.body.interests : user.interests;
      user.location = req.body.location !== undefined ? req.body.location : user.location;
      
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        educationDetails: updatedUser.educationDetails,
        category: updatedUser.category,
        experienceLevel: updatedUser.experienceLevel,
        domain: updatedUser.domain,
        skills: updatedUser.skills,
        interests: updatedUser.interests,
        location: updatedUser.location,
        token: generateToken(updatedUser._id, updatedUser.role)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
