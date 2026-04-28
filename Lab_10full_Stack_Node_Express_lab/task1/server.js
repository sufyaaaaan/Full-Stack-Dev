const express = require('express');
const app = express();
const port = 3001;

// Student data stored in an array
const students = [
  { id: 1, name: 'Sufyan' },
  { id: 2, name: 'Sarah' },
  { id: 3, name: 'Ahmed' },
  { id: 4, name: 'Fatima' }
];

app.get('/', (req, res) => {
  // Show list of students in browser using HTML <li>
  let html = '<h1>Student List</h1><ul>';
  students.forEach(student => {
    html += `<li>${student.name}</li>`;
  });
  html += '</ul>';

  res.send(html);
});

app.listen(port, () => {
  console.log(`Task 1 server is running at http://localhost:${port}`);
});
