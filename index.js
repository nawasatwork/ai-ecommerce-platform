require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  tls: true,
  tlsAllowInvalidCertificates: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error:', err));

// Routes
const productRoutes = require('./routes/products');
const aiRoutes = require('./routes/ai');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/ai', authMiddleware, aiRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));