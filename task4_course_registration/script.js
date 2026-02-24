// Create a Set to store registered courses
const registeredCourses = new Set(["Programming Fundamentals", "English"]);

const updateUI = () => {
    const listElement = document.getElementById('course-list');
    const countElement = document.getElementById('course-count');

    // Display total unique courses using .size
    countElement.textContent = registeredCourses.size;

    listElement.innerHTML = '';

    // Loop through Set using for...of
    for (const course of registeredCourses) {
        const div = document.createElement('div');
        div.className = 'course-item';
        div.textContent = course;
        listElement.appendChild(div);
    }
};

const addCourse = () => {
    const input = document.getElementById('course-input');
    const msg = document.getElementById('message');
    const courseName = input.value.trim();

    if (!courseName) return;

    // Check if course already exists in Set
    if (registeredCourses.has(courseName)) {
        msg.textContent = `Error: "${courseName}" is already registered!`;
        msg.className = 'message error';
    } else {
        // Add courses dynamically
        registeredCourses.add(courseName);
        msg.textContent = `Successfully registered: "${courseName}"`;
        msg.className = 'message success';
        input.value = '';
        updateUI();
    }

    setTimeout(() => {
        msg.textContent = '';
    }, 3000);
};

document.getElementById('add-btn').addEventListener('click', addCourse);
document.getElementById('course-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addCourse();
});

// Initial Load
updateUI();

// Attempt adding duplicate course for demo in console
console.log("Initial courses:", registeredCourses);
registeredCourses.add("Programming Fundamentals"); // Duplicate
console.log("After attempting duplicate add:", registeredCourses);
