require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const seedProducts = [
  {
    title: 'Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking.',
    price: 149.50,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Premium Laptop',
    description: 'Ultra-thin, high-performance laptop for professionals.',
    price: 1299.00,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: '4K Ultra HD Monitor',
    description: 'Crisp and vibrant 32-inch 4K monitor for creators.',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with tactile switches.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Gaming Mouse',
    description: 'Ergonomic gaming mouse with customizable buttons.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Smart Speaker',
    description: 'Voice-controlled smart speaker with rich sound.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'VR Headset',
    description: 'Next-generation virtual reality headset.',
    price: 299.00,
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=600&auto=format&fit=crop'
  }
];

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB');
  await Product.deleteMany({});
  console.log('Cleared existing products');
  
  await Product.insertMany(seedProducts);
  console.log('Successfully seeded database with products');
  
  mongoose.connection.close();
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
