// the routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/authentication/register/Register';
import Login from './components/authentication/login/Login';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Communities from './components/communities/Communities';


function App() {
   return (
      <div className="App">
         <Router>
            <Navbar />
            <Routes>
               <Route exact path='/' element={<Home />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Register />} />
               <Route path='/dashboard' element={<Dashboard />} />
               <Route path='/communities' element={<Communities />} />
            </Routes>
            <Footer />
         </Router>
      </div>
   );
}

export default App;
