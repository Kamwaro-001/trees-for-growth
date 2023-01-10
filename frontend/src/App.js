import React from 'react';
import axios from 'axios';
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Flip, ToastContainer } from "react-toastify";

// import "bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Register from './components/authentication/register/Register';
import Login from './components/authentication/login/Login';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import BoardUser from './components/dashboard/BoardUser';
import Communities from './components/communities/Communities';
import Profile from './components/user-profile/Profile';
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
               <div className='all-items'>
                  <Routes>
                     <Route exact path='/' element={<Home />} />
                     <Route path='/login' element={<Login />} />
                     <Route path='/register' element={<Register />} />
                     <Route path='/dashboard' element={<RequireAuth component={Dashboard} />} />
                     <Route path='/communities' element={<Communities />} />
                     <Route path='/trees' element={<RequireAuth component={Trees} />} />
                     <Route path='/store' element={<RequireAuth component={Buy} />} />
                     <Route path='/profile' element={<RequireAuth component={Profile} />} />
                     <Route path='/about' element={<About />} />
                     <Route path='/boarduser' element={<RequireAuth component={BoardUser} />} />
                  </Routes>
               </div>
               <Footer />
            </Router>
         </div>
         <ToastContainer hideProgressBar={true} newestOnTop={true} bodyClassName={'toastBody'} transition={Flip} style={{ marginTop: "70px" }} />
      </Provider>
   );
}

export default App;
