const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const cors = require('cors');

// Initialize Firebase Admin SDK
const serviceAccount = require('./packages/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(__dirname)); // Serve static files from the root directory
app.use(express.json());

// ✅ Serve an HTML file on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Serve index.html from the root directory
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});