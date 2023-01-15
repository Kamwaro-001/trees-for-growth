import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/auth";
import "./Navbar.css";
import logo from '../images/color_logo.svg';
import * as Icons from 'react-bootstrap-icons'
import { deleteNotification, getNotifications, showNotifications, updateNotifications } from '../../slices/Notifications.Slice';

const Navbar = () => {
  const { isLoggedIn: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let notifications = useSelector(showNotifications)

  useEffect(() => {
    if (currentUser) {
      dispatch(getNotifications())
    }
  }, [currentUser, dispatch])

  let unread = useSelector((state) => (state.notifications.unread))

  const all_notif = []
  const all_unread = []
  if (notifications === undefined) {
    notifications = []
    unread = []
  }
  
  notifications.map((e) => (all_notif.push(e)))
  unread.map((e) => (all_unread.push(e)))
  const notif_number = all_unread.length
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

                  <li className="nav-item dropdown notification-ui show">
                    <Link to="#" id="navbarDropdown" role='button' data-target="#" className="nav-link nav-msgs dropdown-toggle hidden-arrow notification-ui_icon" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa fa-bell"></i>
                      {notif_number > 0 ?
                        <span className="unread-notification"></span>
                        : null
                      }
                    </Link>

                    <ul className="dropdown-menu dropdown-menu-end notification-ui_dd " aria-labelledby="navbarDropdown" onClick={(e) => e.stopPropagation()}>
                      <div className="notification-ui_dd-header">
                        <h3 className="text-center">Notifications</h3>
                      </div>

                      <div className='notification-ui_dd-content'>
                        {notifications &&
                          notifications.map((n, i) => (
                            <form className="" key={i}>
                              <Notifs id={n.id} title={n.title} status={n.status} sent={n.time_sent} />
                            </form>
                          ))
                        }
                      </div>

                      <li className="divider"></li>
                      <div className="notification-ui_dd-footer">
                        <a href="#!" className="btn  btn-block">----</a>
                      </div>
                    </ul>

                  </li>

                  <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle text-black" data-bs-toggle="dropdown" aria-expanded="false" >
                      <i className="fa fa-user" aria-hidden="true"></i>
                      </Link>
                    <div className="dropdown-menu dropdown-menu-lg-end">
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

const Notifs = (props) => {
  const dispatch = useDispatch()

  const updateStatus = () => {
    let id = props.id
    let data = {
      title: props.title,
      status: 'read'
    }
    dispatch(updateNotifications({ data, id }))
  }

  const del_notification = () => {
    let id = props.id
    dispatch(deleteNotification({ id }))
  }

  const CheckStatus = () => {
    if (props.status === 'unread') {
      return (
        <Link to="#!" className="notification-list notification-list--unread text-dark" onClick={updateStatus}>
          <div className="notification-list_img">
          </div>
          <div className="notification-list_detail">
            <p><b>{props.title}</b> <br /></p>
          </div>
          <p><small>{props.sent}</small></p>
          <p className='mx-2 text-danger' onClick={del_notification}><Icons.Trash3Fill /></p>
        </Link>
      )
    } else {
      return (
        <Link to="#!" className="notification-list text-dark">
          <div className="notification-list_img">
          </div>
          <div className="notification-list_detail">
            <p><b>{props.title}</b> <br /></p>
          </div>
          <p><small>{props.sent}</small></p>
          <p className='mx-2 text-danger' onClick={del_notification}><Icons.Trash3Fill /></p>
        </Link>
      )
    }
  }

  return (
    <CheckStatus />
  )
}

export default Navbar