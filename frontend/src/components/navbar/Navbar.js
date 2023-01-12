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

                  {/* <li className="my-messages nav-item dropdown">
                    <Link to="#" id="dLabel" role='button' data-target="#" className="nav-link nav-msgs dropdown-toggle hidden-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fas fa-bell"></i>
                      <span className="badge rounded-pill badge-notification bg-danger">{notif_number}</span>
                    </Link>

                    <ul className="dropdown-menu dropdown-menu-lg-end notifications" role="menu" aria-labelledby="dLabel">
                      <form>
                        <div className="notification-heading"><h4 className="menu-title">Notifications</h4>
                        </div>
                        <hr />

                        <div className='row notif-container'>
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

                  </li> */}

                  <li className="nav-item dropdown notification-ui show">
                    <Link to="#" id="navbarDropdown" role='button' data-target="#" className="nav-link nav-msgs dropdown-toggle hidden-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fas fa-bell"></i>
                      {/* <span className="badge rounded-pill badge-notification bg-danger">{notif_number}</span> */}
                      <span className="unread-notification"></span>
                    </Link>

                    <ul className="dropdown-menu dropdown-menu-end notification-ui_dd show" aria-labelledby="navbarDropdown">
                      <form>
                        <div className="notification-ui_dd-header">
                          <h3 className="text-center">Notifications</h3>
                        </div>

                        <div className='notification-ui_dd-content'>
                          {notifications &&
                            notifications.map((n, i) => (
                              <div className="" key={i}>
                                <Notifs id={n.id} title={n.title} status={n.status} sent={n.time_sent} />
                              </div>
                            ))
                          }
                        </div>

                        <li className="divider"></li>
                        <div className="notification-ui_dd-footer">
                          <a href="#!" className="btn btn-success btn-block">View All</a>
                        </div>
                      </form>
                    </ul>

                  </li>

                  <li className="nav-item dropdown notification-ui show">
                    <Link className="nav-link dropdown-toggle notification-ui_icon" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-bell"></i>
                      <span className="unread-notification"></span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-end notification-ui_dd show" aria-labelledby="navbarDropdown">
                      <div className="notification-ui_dd-header">
                        <h3 className="text-center">Notifications</h3>
                      </div>
                      <div className="notification-ui_dd-content">
                        <a href="#!" className="notification-list notification-list--unread text-dark">
                          <div className="notification-list_img">
                            
                          </div>
                          <div className="notification-list_detail">
                            <p><b>John Doe</b> <br /><span className="text-muted">reacted to your post</span></p>
                            <p className="nt-link text-truncate">How to travel long way home from here.</p>
                          </div>
                          <p><small>10 mins ago</small></p>
                        </a>
                        <a href="#!" className="notification-list notification-list--unread text-dark">
                          <div className="notification-list_img">
                            
                          </div>
                          <div className="notification-list_detail">
                            <p><b>Richard Miles</b> <br /><span className="text-muted">reacted to your post</span></p>
                            <p className="nt-link text-truncate">How to travel long way home from here.</p>
                          </div>
                          <p><small>1 day ago</small></p>
                        </a>
                        <a href="#!" className="notification-list text-dark">
                          <div className="notification-list_img">
                            
                          </div>
                          <div className="notification-list_detail">
                            <p><b>Brian Cumin</b> <br /><span className="text-muted">reacted to your post</span></p>
                            <p className="nt-link text-truncate">How to travel long way home from here.</p>
                          </div>
                          <p><small>1 day ago</small></p>
                        </a>
                        <a href="#!" className="notification-list text-dark">
                          <div className="notification-list_img">
                            
                          </div>
                          <div className="notification-list_detail">
                            <p><b>Lance Bogrol</b> <br /><span className="text-muted">reacted to your post</span></p>
                            <p className="nt-link text-truncate">How to travel long way home from here.</p>
                          </div>
                          <p><small>1 day ago</small></p>
                        </a>
                        <a href="#!" className="notification-list notification-list--unread text-dark">
                          <div className="notification-list_img">
                            
                          </div>
                          <div className="notification-list_detail">
                            <p><b>John Doe</b> <br /><span className="text-muted">reacted to your post</span></p>
                            <p className="nt-link text-truncate">How to travel long way home from here.</p>
                          </div>
                          <p><small>10 mins ago</small></p>
                        </a>
                        <a href="#!" className="notification-list notification-list--unread text-dark">
                          <div className="notification-list_img">
                            
                          </div>
                          <div className="notification-list_detail">
                            <p><b>Richard Miles</b> <br /><span className="text-muted">reacted to your post</span></p>
                            <p className="nt-link text-truncate">How to travel long way home from here.</p>
                          </div>
                          <p><small>1 day ago</small></p>
                        </a>
                        <a href="#!" className="notification-list text-dark">
                          <div className="notification-list_img">
                            
                          </div>
                          <div className="notification-list_detail">
                            <p><b>Brian Cumin</b> <br /><span className="text-muted">reacted to your post</span></p>
                            <p className="nt-link text-truncate">How to travel long way home from here.</p>
                          </div>
                          <p><small>1 day ago</small></p>
                        </a>
                        <a href="#!" className="notification-list text-dark">
                          <div className="notification-list_img">
                            
                          </div>
                          <div className="notification-list_detail">
                            <p><b>Lance Bogrol</b> <br /><span className="text-muted">reacted to your post</span></p>
                            <p className="nt-link text-truncate">How to travel long way home from here.</p>
                          </div>
                          <p><small>1 day ago</small></p>
                        </a>
                      </div>
                      <div className="notification-ui_dd-footer">
                        <a href="#!" className="btn btn-success btn-block">View All</a>
                      </div>
                    </div>
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
      // return <Icons.Dot className='item-eye text-info' />
      return (
        <a href="#!" className="notification-list notification-list--unread text-dark">
          <div className="notification-list_img">
            {/* <img src="images/users/user1.jpg" alt="user"> */}
          </div>
          <div className="notification-list_detail">
            <p><b>{props.title}</b> <br /></p>
          </div>
          <p><small>{props.sent}</small></p>
        </a>
      )
    } else {
      // return <Icons.EyeSlashFill />
      return (
        <a href="#!" className="notification-list text-dark">
          <div className="notification-list_img">
            {/* <img src="images/users/user3.jpg" alt="user"> */}
          </div>
          <div className="notification-list_detail">
            <p><b>{props.title}</b> <br /></p>
          </div>
          <p><small>{props.sent}</small></p>
        </a>
      )
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
    // <div className="content" to="#">

    //   <div className="notification-item">
    //     <h4 className="item-title">{props.title}</h4>
    //     <CheckStatus />
    //     <p className="item-time">{props.sent}</p>
    //   </div>

    // </div>
    <CheckStatus />
  )
}

export default Navbar