import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/auth";
import "./Navbar.css";
import logo from '../images/bw_logo.svg';
import { getAccountUserAsync } from '../../slices/Account.Slice';

const Navbar = () => {
  const { isLoggedIn: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getAccountUserAsync())
    }
  }, [dispatch, currentUser])

  const logOut = useCallback(() => {
    dispatch(logout())
    window.location.reload()
  }, [dispatch]);
  console.log(currentUser)


  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top" id='nav-bar'>
      <div className="container-fluid " id='nav-fix'>
        <Link className="navbar-brand" id='nav-brand' to="/">
          <img className="brand-logo" src={logo} alt="" width="57" height="32" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="mid-nav navbar-nav me-auto mb-2 mb-lg-0" id='nav-ul'>
            {!currentUser ?
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              : null
            }

            {currentUser ? <>
              <li className="nav-item">
                <Link to="/dashboard/" className="nav-link active">Dashboard</Link> </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle active" to="/trees" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Planting </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/trees">plant</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/store">Buy</Link></li>
                </ul>
              </li>
            </> : null}
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/communities">communities</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">About</Link>
            </li>
          </ul>
          <div>
            {currentUser ?
              <ul className="nav navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Profile</Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to="/profile" className="dropdown-item">Settings</Link>
                    <div className="dropdown-divider"></div>
                    <Link to="/login" className="dropdown-item" onClick={logOut}>Logout</Link>
                  </div>
                </li>
              </ul>
              :
              <Link to="/login" id="nav-login" className='nav-item'>Sign in</Link>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar