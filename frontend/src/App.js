import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import Register from './components/authentication/register/Register';
import Login from './components/authentication/login/Login';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import BoardUser from './components/dashboard/BoardUser';
import Communities from './components/communities/Communities';
import Profile from './components/user-profile/Profile.Rename';
import Buy from './components/buy/Buy';
import store from './store/store';
import Trees from './components/planting/Trees';
import About from './components/about/About';
import RequireAuth from './components/authentication/RequireAuth';

if (window.location.origin === "http://localhost:3000") {
   axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
   axios.defaults.baseURL = window.location.origin;
}

function App() {

   return (
      <Provider store={store}>
         <div className="App">
            <Router>
               <Navbar />
               <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/communities' element={<Communities />} />
                  <Route path='/trees' element={<Trees />} />
                  <Route path='/store' element={<Buy />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/about' element={<About />} />
                  {/* <Route path='/boarduser' element={<BoardUser />} /> */}
                  <Route path='/boarduser' element={<RequireAuth component={BoardUser} />} />
               </Routes>
               <Footer />
            </Router>
         </div>
         <ToastContainer hideProgressBar={true} newestOnTop={true} />
      </Provider>

   );
}

export default App;
