const express = require('express');
const app = express();
const port = 3003;

app.get('/user/:name', (req, res) => {
  // Extract dynamic parameter 'name' from the URL
  const name = req.params.name;
  res.send(`<h1>Hello ${name}</h1>`);
});

// Add a root route to guide the user
app.get('/', (req, res) => {
  res.send('<h1>Task 3 Server</h1><p>Please visit: <a href="/user/Sufyan">/user/Sufyan</a> to see the dynamic route in action!</p>');
});

app.listen(port, () => {
  console.log(`Task 3 server is running at http://localhost:${port}`);
  console.log('Example route: http://localhost:3003/user/Ali');
});
