// 1. Create 3 student objects with name, age, semester, and courses (array).
const students = [
    { name: "Sufyan", age: 21, semester: "6th", courses: ["AI", "Cloud", "Mobile Dev"] },
    { name: "Sarah", age: 20, semester: "4th", courses: ["DB", "OS", "Stats"] },
    { name: "Ahmed", age: 22, semester: "8th", courses: ["Final Year Project", "Network Security"] }
];

let jsonString = "";

// 2. Convert objects to JSON using JSON.stringify()
document.getElementById('stringify-btn').addEventListener('click', () => {
    jsonString = JSON.stringify(students);
    const display = document.getElementById('json-raw');
    display.style.display = 'block';
    display.textContent = jsonString;
    console.log("JSON Stringified:", jsonString);
});

// 3. Convert JSON back to objects using JSON.parse()
document.getElementById('parse-btn').addEventListener('click', () => {
    if (!jsonString) {
        alert("Please stringify objects first!");
        return;
    }

    const parsedData = JSON.parse(jsonString);
    const grid = document.getElementById('student-grid');
    grid.innerHTML = '';

    // 6. Loop through students using forEach or map.
    parsedData.forEach(student => {
        // 4. Use destructuring to extract properties.
        const { name, age, semester, courses } = student;

        // 5. Display all student info in HTML using innerHTML.
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
            <h3>${name}</h3>
            <p><span class="label">Age:</span> ${age}</p>
            <p><span class="label">Semester:</span> ${semester}</p>
            <p><span class="label">Courses:</span></p>
            <p class="course-list">${courses.join(', ')}</p>
        `;
        grid.appendChild(card);
    });
});
