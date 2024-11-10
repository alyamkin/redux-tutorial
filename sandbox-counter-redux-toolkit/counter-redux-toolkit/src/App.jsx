import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Counter } from './features/counter/Counter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Counter with Redux Toolkit</h1>
      <Counter />
    </>
  );
}

export default App;
