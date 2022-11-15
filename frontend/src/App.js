// the routes
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import Profile from './components/authentication/login/Profile';
import Register from './components/authentication/register/Register';
import Login from './components/authentication/login/Login';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import BoardUser from './components/dashboard/BoardUser';
// import Communities from './components/communities/Communities';
// import Trees from './components/communities/Trees';
import TreesList from './components/communities/TreesList';

import store from './store/store';

function App(props) {

   return (
      <Provider store={store}>
         <div className="App">
         <Router>
            <Navbar />
            <Routes>
               <Route exact path='/' element={<Home />} />
               <Route path='/login' element={<Login {...props} />} />
               <Route path='/register' element={<Register />} />
               <Route path='/dashboard' element={<Dashboard />} />
               <Route path='/communities' element={<TreesList />} />
               <Route path='/profile' element={<Profile />} />
               <Route path='/boarduser' element={<BoardUser />} />
            </Routes>
            <Footer />
         </Router>
         </div>
      </Provider>
      
   );
}

export default App;
