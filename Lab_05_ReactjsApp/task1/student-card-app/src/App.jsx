import StudentCard from './StudentCard';
import './App.css';

function App() {
  return (
    <div className="app-container" style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Student Information Cards</h1>
      <StudentCard
        name="Sufyan Shafiq"
        rollNo="231982"
        department="Software Engineering"
        university="Air University"
        color="#e3f2fd"
      />
      <StudentCard
        name="Sarah"
        rollNo="234012"
        department="Electrical Engineering"
        university="Global Institute"
        color="#fff3e0"
      />
      <StudentCard
        name="Ahmed Ali"
        rollNo="234109"
        department="Mechanical Engineering"
        university="State University"
        color="#e8f5e9"
      />
    </div>
  );
}

export default App;
