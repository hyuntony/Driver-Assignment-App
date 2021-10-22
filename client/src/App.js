import './App.css';

import DriverOrder from './components/Driver-Order';

const data = [
  {title: 'Steven Williams', items: ['1', '2', '3']},
  {title: 'Chris Horton', items: ['4', '5']},
  {title: 'Alex Novak', items: ['6']}
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DriverOrder data={data} />
      </header>
    </div>
  );
}

export default App;
