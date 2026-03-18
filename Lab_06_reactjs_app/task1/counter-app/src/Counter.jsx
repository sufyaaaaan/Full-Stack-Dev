import { useState } from 'react';
import './Counter.css'; // We will create this for premium styling

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const handleReset = () => setCount(0);

  return (
    <div className="counter-container">
      <div className="counter-card glass-panel">
        <h2 className="title">Premium Counter</h2>
        
        <div className="display-screen">
          <span className="count-value">{count}</span>
        </div>

        <div className="button-group">
          <button 
            className="btn btn-decrement" 
            onClick={handleDecrement}
            disabled={count === 0}
          >
            - Decrement
          </button>
          
          <button className="btn btn-reset" onClick={handleReset}>
            Reset
          </button>
          
          <button className="btn btn-increment" onClick={handleIncrement}>
            + Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
