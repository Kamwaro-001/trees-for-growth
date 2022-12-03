import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"

const Home = () => {
  return (
    <div>
      <header className='home-page'>
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
      </header>
      
      <div className="list-group list-group-radio d-grid gap-2 border-0 w-auto">
        <div className="position-relative">
          <input className="form-check-input position-absolute top-50 end-0 me-3 fs-5" type="radio" name="listGroupRadioGrid" id="listGroupRadioGrid1" value="" checked />
          <label className="list-group-item py-3 pe-5" for="listGroupRadioGrid1">
            <strong className="fw-semibold">First radio</strong>
            <span className="d-block small opacity-75">With support text underneath to add more detail</span>
          </label>
        </div>

        <div className="position-relative">
          <input className="form-check-input position-absolute top-50 end-0 me-3 fs-5" type="radio" name="listGroupRadioGrid" id="listGroupRadioGrid2" value="" />
          <label className="list-group-item py-3 pe-5" for="listGroupRadioGrid2">
            <strong className="fw-semibold">Second radio</strong>
            <span className="d-block small opacity-75">Some other text goes here</span>
          </label>
        </div>

        <div className="position-relative">
          <input className="form-check-input position-absolute top-50 end-0 me-3 fs-5" type="radio" name="listGroupRadioGrid" id="listGroupRadioGrid3" value="" />
          <label className="list-group-item py-3 pe-5" for="listGroupRadioGrid3">
            <strong className="fw-semibold">Third radio</strong>
            <span className="d-block small opacity-75">And we end with another snippet of text</span>
          </label>
        </div>
      </div>
    </div>

  )
}

export default Home