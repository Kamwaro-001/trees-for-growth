// the routes
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/authActions';
import "bootstrap/dist/css/bootstrap.min.css";

import Register from './components/authentication/register/Register';
import Login from './components/authentication/login/Login';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
// import Communities from './components/communities/Communities';
// import Trees from './components/communities/Trees';
import TreesList from './components/communities/TreesList';
import { Provider } from 'react-redux';
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
            </Routes>
            <Footer />
         </Router>
         </div>
      </Provider>
      
   );
}

//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state) => {
   return {
     isAuthenticated: state.auth.token !== null && typeof state.auth.token !== 'undefined',
     token: state.auth.token
   }
 }
 
 //This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
 const mapDispatchToProps = (dispatch) => {
   return {
     setAuthenticatedIfRequired: () => dispatch(actions.authCheckState()),
     logout: () => dispatch(actions.authLogout()) 
   }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(App);
