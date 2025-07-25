// backend/routes/userRoutes.js
import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'Signup successful',
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
});

// ✅ FIXED: lowercase /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login attempt:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log("✅ Login successful for:", user.email);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'Login successful',
    });
  } catch (error) {
    console.error("💥 Login error:", error.message);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

export default router;
