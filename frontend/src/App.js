import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
// import Profile from './components/authentication/login/Profile';
import Register from './components/authentication/register/Register';
import Login from './components/authentication/login/Login';
import Home from './components/home/Home';
// import Navbar from './components/navbar/Navbar';
import Navbar from './components/navbar/Navbar.Remake';
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import BoardUser from './components/dashboard/BoardUser';
import Communities from './components/communities/Communities';
// import Profile from './components/user-profile/Profile';
import Profile from './components/user-profile/Profile.Rename';

//////////////////////////////
import store from './store/store';
import Trees from './components/planting/Trees';
// import New from './components/authentication/login/Login';

axios.defaults.baseURL = "http://127.0.0.1:8000";

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
               {/* <Route path='/register' element={<New />} /> */}
               <Route path='/dashboard' element={<Dashboard />} />
               <Route path='/communities' element={<Communities />} />
               <Route path='/trees' element={<Trees />} />
               <Route path='/profile' element={<Profile />} />
               <Route path='/boarduser' element={<BoardUser />} />
            </Routes>
            <Footer />
         </Router>
         </div>
         <ToastContainer hideProgressBar={true} newestOnTop={true} />
      </Provider>
      
   );
}

export default App;
