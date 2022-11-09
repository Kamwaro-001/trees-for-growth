// the routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/authentication/register/Register';
import Login from './components/authentication/login/Login';
import Home from './components/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
   return (
      <div className="App">
         <Router>
            <Navbar />
            <Routes>
               <Route exact path='/' element={<Home />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Register />} />
            </Routes>
            <Footer />
         </Router>
      </div>
   );
}

export default App;
