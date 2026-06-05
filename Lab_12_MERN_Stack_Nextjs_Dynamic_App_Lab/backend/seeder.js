const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const products = require('./data/products');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      { name: 'Admin User', email: 'admin@example.com', password: 'password123', isAdmin: true },
      { name: 'Test User', email: 'test@example.com', password: 'password123' }
    ]);

    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // destroy data logic (optional)
} else {
  importData();
}
