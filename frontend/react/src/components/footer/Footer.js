import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css"

const Footer = () => {

  let year =  new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3 bg-light">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
        <li className="nav-item"><Link to="/store" className="nav-link px-2 text-muted">Buy</Link></li>
        <li className="nav-item"><Link to="/about" className="nav-link px-2 text-muted">FAQs</Link></li>
        <li className="nav-item"><Link to="/about" className="nav-link px-2 text-muted">About</Link></li>
      </ul>
      <p className="text-center text-muted">&copy; {year} Trees for Growth, Inc</p>
    </footer>
  )
}

export default Footer