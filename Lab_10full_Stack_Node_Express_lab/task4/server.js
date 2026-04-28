const express = require('express');
const app = express();
const port = 3004;

app.get('/', (req, res) => {
  // Returns full HTML page
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Express HTML Renderer</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #333; }
        p { color: #555; }
        ul { background: #f9f9f9; padding: 20px; border-radius: 5px; }
        li { margin-bottom: 5px; }
      </style>
    </head>
    <body>
      <h1>Task 4: Full HTML Page</h1>
      <p>This page is successfully rendered by our Express server route.</p>
      <h2>Key Features:</h2>
      <ul>
        <li>Node.js backend</li>
        <li>Express framework</li>
        <li>Direct HTML response</li>
      </ul>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Task 4 server is running at http://localhost:${port}`);
});
