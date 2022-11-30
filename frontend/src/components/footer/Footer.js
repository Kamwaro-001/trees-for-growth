import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css"

const Footer = () => {
  return (
    <div id='footer-bar'>
      <div className="b-example-divider"></div>
      <div className="container">
        {/* <footer className="py-3 my-4"> */}
        <footer className="footer mt-auto py-3 ">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
            <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Features</Link></li>
            <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Pricing</Link></li>
            <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">FAQs</Link></li>
            <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">About</Link></li>
          </ul>
          <p className="text-center text-muted">&copy; 2022 Trees for Growth, Inc</p>
        </footer>
      </div>
    </div>
  )
}

export default Footer