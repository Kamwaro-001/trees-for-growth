import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
    <div>
      <nav id="nav-bar">
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
                {/* <Link to="profile/" className="nav-item">
                    <img src="{% static 'images/user.png' %}" alt="my profile" style="height: 30px; width:30px; vertical-align:sub;"/>
                </Link>  */}
                <Link to="/login/" id="nav-login">Sign in</Link>
            </div>
        </div>
    </nav>
    </div>
    </>
  )
}

export default Navbar