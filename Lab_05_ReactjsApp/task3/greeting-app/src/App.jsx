import Greeting from './Greeting';
import './App.css';

function App() {
  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Dynamic Greeting App</h1>
      <Greeting
        name="Sufyan"
        timeOfDay="Morning"
        bgColor="#fffae6"
      />
      <Greeting
        name="Sarah"
        timeOfDay="Afternoon"
        bgColor="#e6f7ff"
      />
      <Greeting
        name="Ahmed"
        timeOfDay="Evening"
        bgColor="#f0e6ff"
      />
    </div>
  );
}

export default App;
