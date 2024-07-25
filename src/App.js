import logo from './logo.svg';
import './App.css';
import MyComponent from './components/Vinod/ProfilePhotographer';
import Navbar from './components/common/NavBar';
import { Route, Routes, } from 'react-router-dom';
import { Container } from '@mui/material';


function App() {
  return (
    <div>
    <Navbar></Navbar>
    <Container>
      <MyComponent/>
    </Container>
    </div>
  );
}

export default App;
