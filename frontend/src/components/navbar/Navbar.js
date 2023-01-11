import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/auth";
import "./Navbar.css";
import logo from '../images/color_logo.svg';
import * as Icons from 'react-bootstrap-icons'
import { getNotifications, showNotifications, updateNotifications } from '../../slices/Notifications.Slice';

const Navbar = () => {
  const { isLoggedIn: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getNotifications())
    }
  }, [currentUser, dispatch])

  const notifications = useSelector(showNotifications)
  const unread = useSelector((state) => (state.notifications.all))

  const all_notif = []
  const all_unread = []
  notifications.map((e) => (all_notif.push(e)))
  unread.map((e) => (all_unread.push(e)))
  const notif_number = all_unread.length

  console.log(notifications)

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

                  <li className="my-messages nav-item dropdown">
                    <Link to="#" id="dLabel" role='button' data-target="#" className="nav-link nav-msgs dropdown-toggle hidden-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fas fa-bell"></i>
                      <span className="badge rounded-pill badge-notification bg-danger">{notif_number}</span>
                    </Link>

                    <ul className="dropdown-menu dropdown-menu-lg-end notifications" role="menu" aria-labelledby="dLabel">
                      <form>
                        <div className="notification-heading"><h4 className="menu-title">Notifications</h4>
                        </div>
                        <hr />

                        <div className='row bg-danger'>
                          {notifications &&
                            notifications.map((n, i) => (
                              <div className="col-md-6 w-100 notifications-wrapper" key={i}>
                                <Notifs id={n.id} title={n.title} status={n.status} sent={n.time_sent} />
                              </div>
                            ))
                          }
                        </div>

                        <li className="divider"></li>
                        <div className="notification-footer"><h4 className="menu-title">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4></div>
                      </form>
                    </ul>

                  </li>

                  <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" ><Icons.PersonFill /></Link>
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

  const [statusR, setStatus] = useState(props.status)
  const read = () => setStatus('read')
  const unread = () => setStatus('unread')

  const CheckStatus = () => {
    if (props.status === 'unread') {
      return <Icons.EyeFill className='text-danger' />
    } else {
      return <Icons.EyeSlashFill />
    }
  }

  // const [state, setState] = useState({
  //   title: props.title,
  //   status: props.status
  // })

  // const handleStatus = () => {
  //   setState({ ...state, status: statusR })
  // } 

  // const updateStatus = () => {
  //   let id = props.id
  //   let data = state
  //   dispatch(updateNotifications({data, id}))
  // }

  return (
    <div className="content" to="#">

      <div className="notification-item">
        <h4 className="item-title">{props.title}</h4>
        <p className="item-info eye "><CheckStatus /></p>
        <p className="item-info">{props.sent}</p>
      </div>

    </div>
  )
}

export default Navbar