import React from 'react';
import logo from './logo.svg';
import './App.less';

function App() {
  const app = '12121';
  let myName = 'Tom';
  console.log(`My name is ${myNane}`);
  console.log(`My name is ${myName.toStrng()}`);
  console.log(`My name is ${myName}`)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org// "
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
