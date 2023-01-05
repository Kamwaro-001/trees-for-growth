import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import "./About.css";

const About = () => {
  return (
    <div id="about-us" className="about-us">
      <div className="section-title mb-3">
        <h2>About us</h2>
      </div>

      <div className="mission">
        <h3>Our Mission</h3>
        <p>
          <b>Encouraging everyone to plant more trees and fight desertification.</b>
        </p>

      </div>

      <hr />

      <div className='abt-future'>
        <div className="part1">
          <h3>The future</h3>
          <p>We are only starting out therefore there is still a big future ahead of us.
            <br />
            It is going to take a while for <b>Trees For Growth</b> to really be a "big thing".</p>
        </div>

        <div className="row icon-boxes mt-5">
          <div className="col-md-6 m-auto">
            <p>We currently only have "prototype" features but if you stick around there is a lot to be excited about. <br /> Moreover, you are free to leave us a message on any features you would like added!</p>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">

            <h4>Coming Soon:</h4>
            <ul className='features-list'>
              <li><i className="checks"><Icons.CheckAll /></i> Progress badges</li>
              <li><i className="checks"><Icons.CheckAll /></i> Tangible incentives, such as cash - this feature may take a while depending on how long it will take us to find <span className='donor'>donors</span></li>
              <p className='mt-2'>These are just some of the main features there is more exciting stuff we are still working on. <br /> Stay Tuned!</p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About