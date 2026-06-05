require('dotenv').config();
const mongoose = require('mongoose');

console.log('Starting connection test...');
console.log('URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILURE:', err.message);
    process.exit(1);
  });

setTimeout(() => {
  console.log('Timeout: Connection taking too long (30s)');
  process.exit(1);
}, 30000);
