import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css";
import forest from "../images/forest.jpg"

const Home = () => {
  return (
    <div>
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
            {/* <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button type="button" className="home-btn btn btn-primary btn-lg px-4 me-md-2 fw-bold">
                <span><Link to="/register">Join</Link></span>
              </button>
              <button type="button" className="home-btn btn btn-outline-secondary btn-lg px-4">Learn More</button>
            </div> */}
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img className="rounded-lg-3" src={forest} alt="" width="720" />
          </div>
        </div>
      </div>

      <div className="list-group list-group-radio d-grid gap-2 border-0 w-auto">
        <div className="position-relative">
          <input className="form-check-input position-absolute top-50 end-0 me-3 fs-5" type="radio" name="listGroupRadioGrid" id="listGroupRadioGrid1" value="" defaultChecked />
          <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid1">
            <strong className="fw-semibold">First radio</strong>
            <span className="d-block small opacity-75">With support text underneath to add more detail</span>
          </label>
        </div>

        <div className="position-relative">
          <input className="form-check-input position-absolute top-50 end-0 me-3 fs-5" type="radio" name="listGroupRadioGrid" id="listGroupRadioGrid2" value="" />
          <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid2">
            <strong className="fw-semibold">Second radio</strong>
            <span className="d-block small opacity-75">Some other text goes here</span>
          </label>
        </div>

        <div className="position-relative">
          <input className="form-check-input position-absolute top-50 end-0 me-3 fs-5" type="radio" name="listGroupRadioGrid" id="listGroupRadioGrid3" value="" />
          <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid3">
            <strong className="fw-semibold">Third radio</strong>
            <span className="d-block small opacity-75">And we end with another snippet of text</span>
          </label>
        </div>
      </div>
    </div>

  )
}

export default Home