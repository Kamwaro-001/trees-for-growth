import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css";
import user1 from "../images/user1.png";

import "bootstrap/dist/css/bootstrap.min.css";

function Navbar(props) {
  
  return (
    <>
      <div>
        <nav id="nav-bar" className="navbar navbar-expand">
          <div id="nav-fix">
            <Link id="nav-brand" to="/">
              TreesForGrowth
            </Link>
            <div className="middle-nav">
              <Link to="/" className="nav-item">home</Link>
              <Link to="/dashboard/" className="nav-item">dashboard</Link>
              <Link to="/communities/" className="nav-item">communities</Link>
              <Link to="#" className="nav-item">about us</Link>
              <Link to="#" className="nav-item">buy</Link>
              {/* TODO add auth check for this tag */}
              <Link to="profile/" className="nav-item">
                    <img src={user1} alt="my profile"  className='to-profile'/>
              </Link> 
              <Link to="/login/" id="nav-login">Sign in</Link>
              {props.isAuthenticated ? <Link id='nav-login' onClick={() => props.logout()}>Logout</Link> : null}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar