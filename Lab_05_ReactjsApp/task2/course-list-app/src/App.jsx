import CourseItem from './CourseItem';
import './App.css';

function App() {
  const courses = [
    { id: 1, courseName: "React for Beginners", instructor: "Sufyan Shafiq", duration: "4 Weeks", type: "Online" },
    { id: 2, courseName: "Advanced JavaScript", instructor: "Sarah", duration: "6 Weeks", type: "Offline" },
    { id: 3, courseName: "UI/UX Design Principles", instructor: "Ahmed Ali", duration: "3 Weeks", type: "Online" },
    { id: 4, courseName: "Backend with Node.js", instructor: "Zain", duration: "8 Weeks", type: "Offline" },
    { id: 5, courseName: "Fullstack Development", instructor: "Aqib", duration: "12 Weeks", type: "Online" },
  ];

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Available Courses</h1>
      <div className="course-list">
        {courses.map(course => (
          <CourseItem
            key={course.id}
            courseName={course.courseName}
            instructor={course.instructor}
            duration={course.duration}
            type={course.type}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
