import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Canvas from './components/Canvas';
import State from './components/State';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Toolbar from './components/Toolbar';
import { Button } from '@mui/material';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  // current user object
  let USER = {
    UID: null,
    username: null,
  }

  return (
    <Router>
      <NavBar />
      <Canvas />
    </Router>

  );
}

export default App