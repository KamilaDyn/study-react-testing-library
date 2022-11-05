import './App.css';
import { useState } from 'react';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [color, setColor] = useState('green');
  const [disabled, setDisabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const changeColor = color === 'green' ? 'red' : 'green';
  const colorButton = isDisabled ? 'gray' : 'blue';

  return (
    <div>
      <div>
        <button
          style={{ backgroundColor: color, color: 'white' }}
          onClick={() => setColor(changeColor)}
          disabled={disabled}
        >
          Change to {changeColor}
        </button>
        <label htmlFor="enable-button-checkbox">Enable button</label>
        <input
          type="checkbox"
          id="enable-button-checkbox"
          onChange={(e) => setDisabled(e.target.checked)}
        />
      </div>
      <div>
        <button
          style={{ backgroundColor: colorButton, color: 'white' }}
          disabled={isDisabled}
          onClick={() => setIsDisabled(true)}
        >
          Change to {isDisabled ? 'blue' : 'gray'}
        </button>
        <label htmlFor="change-button-color">Disable button</label>
        <input
          type="checkbox"
          id="change-button-color"
          defaultChecked={isDisabled}
          onChange={(e) => setIsDisabled(e.target.checked)}
          checked={isDisabled}
        />
      </div>
    </div>
  );
}

export default App;
