import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/auth";
import "./Navbar.css";
import logo from '../images/color_logo.svg';
import * as Icons from 'react-bootstrap-icons'

const Navbar = () => {
  const { isLoggedIn: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch]);

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
                <Link to="/dashboard/" className="nav-link active">Dashboard</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle active" to="/trees" data-bs-toggle="dropdown" aria-expanded="false">
                  Planting </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/trees">plant</Link></li>
                  {/* <li><hr className="dropdown-divider" /></li> */}
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
              <>
                <ul className="nav navbar-nav ms-auto">

                  <li className="my-messages nav-item dropdown">
                    <Link to="#" id="dLabel" data-target="#" className="nav-link nav-msgs dropdown-toggle" data-bs-display="static" data-bs-toggle="dropdown">
                      <i className="glyphicon glyphicon-bell"><Icons.Bell /></i>
                      <span className="badge">3</span>
                    </Link>

                    <ul className="dropdown-menu dropdown-menu-end notifications" role="menu" aria-labelledby="dLabel">

                      <div className="notification-heading"><h4 className="menu-title">Notifications</h4>
                      </div>
                      {/* <li className="divider"></li> */}
                      <hr />
                      <div className="notifications-wrapper">
                        <Link className="content" to="#">

                          <div className="notification-item">
                            <h4 className="item-title">Evaluation Deadline 1 · day ago</h4>
                            <p className="item-info">Marketing 101, Video Assignment</p>
                          </div>

                        </Link>
                        <Link className="content" to="#">
                          <div className="notification-item">
                            <h4 className="item-title">Evaluation Deadline 1 · day ago</h4>
                            <p className="item-info">Marketing 101, Video Assignment</p>
                          </div>
                        </Link>
                        <Link className="content" to="#">
                          <div className="notification-item">
                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                            <p className="item-info">Marketing 101, Video Assignment</p>
                          </div>
                        </Link>
                        <Link className="content" to="#">
                          <div className="notification-item">
                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                            <p className="item-info">Marketing 101, Video Assignment</p>
                          </div>

                        </Link>
                        <Link className="content" to="#">
                          <div className="notification-item">
                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                            <p className="item-info">Marketing 101, Video Assignment</p>
                          </div>
                        </Link>
                        <Link className="content" to="#">
                          <div className="notification-item">
                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                            <p className="item-info">Marketing 101, Video Assignment</p>
                          </div>
                        </Link>

                      </div>
                      <li className="divider"></li>
                      <div className="notification-footer"><h4 className="menu-title">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4></div>
                    </ul>

                  </li>

                  <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" ><Icons.Person /></Link>
                    <div className="dropdown-menu dropdown-menu-end">
                      <Link to="/profile" className="dropdown-item"><Icons.Gear />  Settings</Link>
                      <Link to="/login" className="dropdown-item" onClick={logOut}><Icons.BoxArrowRight /> Sign out</Link>
                    </div>
                  </li>
                </ul>
              </>
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