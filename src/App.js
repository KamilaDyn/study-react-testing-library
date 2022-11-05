import './App.css';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState('green');

  const changeColor = color === 'green' ? 'red' : 'green';

  return (
    <div>
      <button
        style={{ backgroundColor: color, color: 'white' }}
        onClick={() => setColor(changeColor)}
      >
        Change to {changeColor}
      </button>
      <input type="checkbox" />
    </div>
  );
}

export default App;
