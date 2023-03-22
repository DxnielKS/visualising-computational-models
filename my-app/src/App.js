import './App.css';
import NavBar from './components/NavBar';
import Canvas from './components/Canvas';
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import { AuthProvider } from "./AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAy2vSBZl1eJpfh95uYRsGrzZ8KmdHDhqw",
    authDomain: "turing-visualiser.firebaseapp.com",
    projectId: "turing-visualiser",
    storageBucket: "turing-visualiser.appspot.com",
    messagingSenderId: "384542892277",
    appId: "1:384542892277:web:62a7bed9cb4dd90294e5bc",
    measurementId: "G-G92F2EGGVP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <AuthProvider>
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/Login">
            <Login/>
          </Route>
          <Route path="/Register">
            <Register/>
          </Route>
          <Route path="/">
            <Canvas />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App