import Navbar from './components/Navbar';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route, Routes,

} from "react-router-dom";
import Home from './components/home';
import About from './components/about';
import NotesState from './context/notes/NoteState';
import Login from './components/Login';
import SignIn from './components/SignIn';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
  const [mode, setMode] = useState("light");
  const toggle = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = '#0E1525'
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = 'white';
    }
  }
  return (
    <>
<GoogleOAuthProvider clientId="1044590791162-7hjmi1iqp82sgbmq74bugrd2n4t0fnd7.apps.googleusercontent.com">      <NotesState>
        <Router>

          <Navbar title="Notebook" mod={mode} tog={toggle}></Navbar>
          <div className="container">
            <Routes>

              <Route exact path="/home" element={<Home></Home>}>
              </Route>
              <Route exact path="/about" element={<About></About>}>

              </Route>
              
              <Route exact path="/" element={<Login></Login>}>

              </Route>
              <Route exact path="/signup" element={<SignIn></SignIn>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NotesState>
      </GoogleOAuthProvider>

    </>
  );
}

export default App;
