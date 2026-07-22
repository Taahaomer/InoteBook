import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {useContext} from 'react'
import NoteContext from './context/notes/noteContext';

function App() {
    const context = useContext(NoteContext);
    const { alert} = context;

  return (
    <div className="App">
      
      <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Login/>}></Route>
              <Route exact path="/home" element={<Home/>}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login/>}></Route>
              <Route exact path="/sign-up" element={<Signup/>}></Route>
          </Routes>
          </div>
      </Router>

    </div>
  );
}

export default App;
