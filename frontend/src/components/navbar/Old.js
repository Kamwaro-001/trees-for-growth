import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/auth";
import "./Old.css";
import logo from '../images/bw_logo.svg';

function Navbar() {

  const { user: currentUser } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch]);

  console.log(currentUser)

  return (
    <>
      <nav id="nav-bar" className="navBar">
        <div id="nav-fix">
          <Link id="nav-brand" to="/">
            TreesForGrowth
          </Link>
          <div className="middle-nav">
            <Link to="/" className="nav-item">home</Link>

            {currentUser !== null ?
              <Link to="/dashboard/" className="nav-item">dashboard</Link> : null}

            <Link to="/communities/" className="nav-item">communities</Link>
            <Link to="#" className="nav-item">about us</Link>
            <Link to="#" className="nav-item">buy</Link>

          </div>
          <div className='nav-right'>
            {currentUser !== null ?
              <>
                <Link to="profile/" className="nav-item">
                  {/* <img src={user1} alt="my profile" className='to-profile' /> */}
                </Link>
                <Link to="/login" id='nav-login' className="nav-item" onClick={logOut}>Logout</Link>
              </>
              :
              <Link to="/login/" id="nav-login" className="nav-item">Sign in</Link>
            }
          </div>

        </div>
      </nav>
    </>
  )
}

export default Navbar