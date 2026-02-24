// Task 6: Mini University Portal

// 1. Add students using Class
class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // 3. Register courses using Set
        this.courses = new Set();
    }

    addCourse(courseName) {
        this.courses.add(courseName);
    }
}

// 2. Store students in Map
const studentDB = new Map();

const updateUI = () => {
    const list = document.getElementById('records-list');
    const select = document.getElementById('select-student');

    // Clear current view
    list.innerHTML = '';
    const currentSelectVal = select.value;
    select.innerHTML = '<option value="">Select Student</option>';

    studentDB.forEach((student, id) => {
        // Update Select Dropdown
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${student.name} (${id})`;
        select.appendChild(option);

        // Update Records List
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
            <h4>${student.name}</h4>
            <p><small>ID: ${id}</small></p>
            <div class="course-tags">
                ${Array.from(student.courses).map(c => `<span class="tag">${c}</span>`).join('')}
            </div>
        `;
        list.appendChild(card);
    });

    select.value = currentSelectVal;
};

// 4. Simulate saving data using Promise
const saveToDatabase = () => {
    return new Promise((resolve, reject) => {
        const status = document.getElementById('status-msg');
        status.style.display = 'block';
        status.style.backgroundColor = '#fef3c7';
        status.style.color = '#92400e';
        status.textContent = 'Saving data to server...';

        setTimeout(() => {
            if (studentDB.size > 0) {
                resolve("All records saved successfully!");
            } else {
                reject("No data to save.");
            }
        }, 2000);
    });
};

// Event Handlers
document.getElementById('add-student-btn').addEventListener('click', () => {
    const id = document.getElementById('stu-id').value;
    const name = document.getElementById('stu-name').value;

    if (id && name) {
        if (!studentDB.has(id)) {
            studentDB.set(id, new Student(id, name));
            updateUI();
            document.getElementById('stu-id').value = '';
            document.getElementById('stu-name').value = '';
        } else {
            alert("Student ID already exists!");
        }
    }
});

document.getElementById('register-btn').addEventListener('click', () => {
    const id = document.getElementById('select-student').value;
    const course = document.getElementById('course-name').value;

    if (id && course) {
        const student = studentDB.get(id);
        student.addCourse(course);
        updateUI();
        document.getElementById('course-name').value = '';
    }
});

document.getElementById('save-btn').addEventListener('click', () => {
    saveToDatabase()
        .then(msg => {
            const status = document.getElementById('status-msg');
            status.style.backgroundColor = '#d1fae5';
            status.style.color = '#065f46';
            status.textContent = msg;
            setTimeout(() => status.style.display = 'none', 3000);
        })
        .catch(err => {
            const status = document.getElementById('status-msg');
            status.style.backgroundColor = '#fee2e2';
            status.style.color = '#991b1b';
            status.textContent = err;
            setTimeout(() => status.style.display = 'none', 3000);
        });
});

// Seed data
const s1 = new Student("FA21-001", "Sufyan");
s1.addCourse("Artificial Intelligence");
s1.addCourse("Cloud Computing");
studentDB.set(s1.id, s1);

updateUI();
