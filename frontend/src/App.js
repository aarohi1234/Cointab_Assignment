// import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Signup from './components/Signup';
import { Login } from './components/Login';
import { Homepage } from './components/Homepage';
import { PrivateRoute } from './PrivateRoute';

function App() {
  return (
    <div className="App">
      
       <Navbar/>
      <Routes>
        <Route path="/" element={<PrivateRoute><Homepage/></PrivateRoute>} />
        <Route path = "/signup" element={<Signup/>} />  
         <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
