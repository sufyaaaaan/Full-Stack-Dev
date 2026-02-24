// Student Class
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }

    // Method to generate HTML for a student using template literals
    getDetailsHTML() {
        return `
            <div class="student-card">
                <h2>${this.name}</h2>
                <p><span class="label">ID:</span> ${this.id}</p>
                <p><span class="label">Semester:</span> ${this.semester}</p>
                <p><span class="label">Courses:</span></p>
                <div class="courses-list">
                    ${this.courses.map(course => `<span class="course-tag">${course}</span>`).join('')}
                </div>
            </div>
        `;
    }
}

// Create student objects using const
const students = [
    new Student(101, "Sufyan", "6th", ["Data Structures", "Algorithms", "Web Dev"]),
    new Student(102, "Sarah", "4th", ["Database Systems", "OS", "Theory of Automata"]),
    new Student(103, "Ahmed", "2nd", ["Introduction to Computing", "Calculus", "English"])
];

// Display students dynamically using innerHTML
const displayStudents = () => {
    const studentList = document.getElementById('student-list');
    let htmlContent = ''; // Using let for modification

    students.forEach(student => {
        htmlContent += student.getDetailsHTML();
    });

    studentList.innerHTML = htmlContent;
};

// Initial call
document.addEventListener('DOMContentLoaded', displayStudents);
