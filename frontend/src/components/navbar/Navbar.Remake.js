import React, { useCallback } from 'react';
import "./Navbar.Remake.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/auth";
import "./Navbar.css";
// import user1 from "../images/user1.png";

import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch]);
  console.log(currentUser)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light fixed-top" id='nav-bar'>
        <div className="container-fluid " id='nav-fix'>
          <Link className="navbar-brand" id='nav-brand' to="/">Trees for Growth</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse centered" id="navbarSupportedContent">
            <ul className="mid-nav navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {currentUser !== null ? <>
                  <li className="nav-item">
                    <Link to="/dashboard/" className="nav-link active">Dashboard</Link> </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle active" to="/trees" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Planting </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/trees">plant</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="#">Buy</Link></li>
                    </ul>
                  </li>
              </> : null}
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle active" to="/communities" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Communities </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/communities">List</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="#">Create</Link></li>
                    </ul>
                  </li>
              <div className='nav-right'>
                {currentUser !== null ?
                  <>
                    <li><Link to="profile/" className="nav-item">settings
                    </Link></li>
                    <li>
                      <Link to="/login" id='nav-login' className='nav-item' onClick={logOut}>Sign out</Link>
                    </li>
                  </>
                  :
                  <li><Link to="/login/" id="nav-login" className='nav-item'>Sign in</Link></li>
                }
              </div>
            </ul>
          </div>
          {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
        </div>
      </nav>
    </>
  )
}

export default Navbar