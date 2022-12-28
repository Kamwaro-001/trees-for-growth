import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css";
import forest from "../images/forest.jpg";
import process from "../images/process.svg";
import community from "../images/community.svg";
import developer from "../images/developer.jpeg";
import * as Icons from 'react-bootstrap-icons'

const Home = () => {
  return (
    <div className='home'>
      {/* <header className='home-page'>
        <div className='wrapper'>
          <div className='welcome-text'>
            <h1>TREE PLANTING MEETS <span>TECHNOLOGY</span></h1>
            <br />
            <br />
            <h2 className='welcome-text2'>HELP SAVE OUR PLANET</h2>
            <br />
            <Link to="#" className='welcome-link'>MAKE AN IMPACT</Link>
          </div>
        </div>
      </header> */}

      <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
        <div className="container text-center text-md-left" data-aos="fade-up">
          <h1>Trees for <span>Growth</span></h1>
          <h2>Tree Planting Meets Technology</h2>
          <Link to="/register" className="btn-get-started scrollto">Make an Impact</Link>
        </div>
      </section>

      <div className="container my-5" id='#about'>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">Welcome to Trees for Growth</h1>
            <p className="lead">Our plan is to motivate everyone to plant trees and help save our planet</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <Link to="/register">
                <button type="button" className="home-btn btn btn-success btn-lg px-4 me-md-2 fw-bold">
                  Join
                </button></Link>
              <Link to="/about">
                <button type="button" className="home-btn2 btn btn-outline-secondary btn-lg px-4" >Learn More</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img className="rounded-lg-3" src={forest} alt="" width="720" />
          </div>
        </div>
      </div>

      <div className='eg1'>
        <div className="section-title">
          <h2>Simple Process</h2>
          <p>Here is the process to start making an impact</p>
        </div>
        <img src={process} alt="process svg" className='process-svg' />
      </div>

      <div className='eg2'>
        <div className="section-title">
          <h2>Communities</h2>
          <p>You can also do activities as a group</p>
        </div>
        <img src={community} alt="community info svg" className='community-svg' />
      </div>

      <section id="developer-info" className="developer-info">
        <div className="container">

          <div className="row">
            <div className="section-title">
              <h2>Developer Info</h2>
              <p>some information about the developer</p>
            </div>
            <div className="col-lg-6">
              <img src={developer} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul>
                <li><i className="bx bx-check-double"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                <li><i className="bx bx-check-double"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
              </ul>
              <div className="row icon-boxes">
                <div className="col-md-6">
                  <i className="bx bx-receipt"></i>
                  <h4>Corporis voluptates sit</h4>
                  <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                  <i className="bx bx-cube-alt"></i>
                  <h4>Ullamco laboris nisi</h4>
                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="contact" className="contact section-bg">
        <div className="container">

          <div className="section-title">
            <h2>Contact</h2>
            <p>Have some thoughts? Please send us a message here</p>
          </div>

          <div className="row mt-5 justify-content-center">

            <div className="col-lg-10">

              <div className="info-wrap">
                <div className="row">
                  <div className="col-lg-4 info">
                    <i className="bi bi-geo-alt"><Icons.GeoAlt /></i>
                    <h4>Location:</h4>
                    <p>A108 Adam Street<br />New York, NY 535022</p>
                  </div>

                  <div className="col-lg-4 info mt-4 mt-lg-0">
                    <i className="bi bi-envelope"><Icons.Envelope /></i>
                    <h4>Email:</h4>
                    <p>info@treesforgrowth.com<br />contact@treesforgrowth.com</p>
                  </div>

                  <div className="col-lg-4 info mt-4 mt-lg-0">
                    <i className="bi bi-phone"><Icons.Phone /></i>
                    <h4>Call:</h4>
                    <p>currently only accepting emails</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="row mt-5 justify-content-center">
            <div className="col-lg-10">
              <form action="forms/contact.php" method="post" className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                </div>
                <div className="form-group mt-3">
                  <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div className="text-center"><button type="submit">Send Message</button></div>
              </form>
            </div>

          </div>

        </div>
      </section>

    </div>

  )
}

export default Home