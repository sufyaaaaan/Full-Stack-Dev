const express = require('express');
const app = express();
const port = 3002;

app.get('/home', (req, res) => {
  res.send('<h1>Welcome Home</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Us</h1><p>This is the about page.</p>');
});

app.get('/contact', (req, res) => {
  res.send('<h1>Contact Us</h1><p>Feel free to reach out to us here.</p>');
});

// Add a root route to guide the user
app.get('/', (req, res) => {
  res.send('<h1>Task 2 Server</h1><p>Please visit: <a href="/home">/home</a>, <a href="/about">/about</a>, or <a href="/contact">/contact</a></p>');
});

app.listen(port, () => {
  console.log(`Task 2 server is running at http://localhost:${port}`);
  console.log('Available routes: /home, /about, /contact');
});
