import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import StateEditor from './components/StateEditor';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <StateEditor states={['q1','q2']}/>
    </div>
  );
}

export default App;