require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/products', async (req, res) => {
  const fallbackProducts = [
    {
      _id: 'f1',
      title: 'Neural Link VR',
      description: 'The most immersive virtual reality experience with direct neural interface technology.',
      price: 899.00,
      imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=600&auto=format&fit=crop'
    },
    {
      _id: 'f2',
      title: 'Quantum Processor X1',
      description: 'Next-generation quantum computing power in a portable workstation.',
      price: 4999.00,
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop'
    },
    {
      _id: 'f3',
      title: 'Cyber-Optic Watch',
      description: 'Holographic display and health monitoring with real-time biometric analysis.',
      price: 299.50,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop'
    },
    {
      _id: 'f4',
      title: 'Sonic-Flow Headphones',
      description: 'Bone conduction technology with crystal clear 3D spatial audio.',
      price: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'
    }
  ];

  try {
    // If DB is not connected yet or fails, this will throw
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not ready. Returning fallback products.');
      return res.json(fallbackProducts);
    }

    const products = await Product.find();
    
    if (products.length === 0) {
      console.log('Database empty. Returning fallback products.');
      return res.json(fallbackProducts);
    }
    
    res.json(products);
  } catch (error) {
    console.error('Database error. Returning fallback data:', error.message);
    res.json(fallbackProducts);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
