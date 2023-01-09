import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css";
import process from "../images/process.svg";
import community from "../images/community.svg";
import developer from "../images/developer.jpeg";
import * as Icons from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux';
import { contactAsync } from '../../slices/Contact.Slice';
import { Formik, Form, Field } from 'formik';

const Home = () => {
  const dispatch = useDispatch()
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: ""
  }

  const textArea = (props) => (
    <textarea className="contact-textarea" rows="5" required {...props}></textarea>
  )

  const handleMessage = (formValue) => {
    dispatch(contactAsync(formValue))
      .unwrap()
  }

  return (
    <div className='home'>
      <section id="hero" className="main-hero d-flex flex-column justify-content-center align-items-center">
        <div className="container text-center text-md-left" data-aos="fade-up">
          <div className='hero-flex'>
            <h1>Trees for <span>Growth</span></h1>
            <h2>Rewards Earned. Forests Restored</h2>
            <Link to="/register" className="btn-get-started scrollto">Make an Impact</Link>
          </div>
        </div>
        <div className='credit1 w-100 text-end pe-2'>
          <a href="https://pixabay.com/photos/nature-forest-landscape-at-night-3194001/" target={'_blank'} rel="noreferrer">&copy; Image by Florian Kurz</a>
        </div>
      </section>

      <div className="container my-5 about-hero" id='#about-hero'>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg pb-4">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3 about-hero-pt1">
            <h1 className="display-4 fw-bold lh-1 text-center">Welcome to Trees for Growth</h1>
            <h3>Fight climate change while supporting local communities</h3>
            <p className="lead">We plan to motivate local communities to plant trees and help save our planet</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <div className='text-end w-100'>
                <Link to="/register" className='hero-join-btn'>
                  <button type="button" className="home-btn btn btn-success btn-lg px-4 me-md-2 fw-bold">
                    Join
                  </button>
                </Link>
                <Link to="/about">
                  <button type="button" className="home-btn2 btn btn-outline-secondary btn-lg px-4" >Learn More</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg about-hero-pt2 d-flex">
            <div className='credit2 text-end p-2'>
              <a href="https://www.pexels.com/photo/green-trees-1009402/" className='forest-credit' target={'_blank'} rel="noreferrer">&copy; Photo by Pille  Kirsi</a>
            </div>
          </div>
        </div>
      </div>

      <div className='eg1'>
        <div className="section-title mb-3">
          <h2>Simple Process</h2>
          <p>Here is the process to start making an impact</p>
        </div>
        <img src={process} alt="process svg" className='process-svg mt-2' />
      </div>

      <div className='eg2  mt-5'>
        <div className="section-title mb-3">
          <h2>Communities</h2>
          <p>You can also do activities as a group</p>
        </div>
        <img src={community} alt="community info svg" className='community-svg' />
      </div>

      <section id="developer-info" className="developer-info">
        <div className="container">

          <div className="section-title">
            <h2>Developer Info</h2>
            <p>Some information about the developer</p>
          </div>
          <div>
            <div className="row member d-flex justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="member-img">
                  <img src={developer} alt="" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="member-bio">
                  <h4>Job Kamwaro</h4>
                  {/* <span></span> */}
                  <p>
                   He is currently a student following his passion in computer science. He started his coding journey at 14 and he uses the vast knowledge in computers coming up with solutions for challenges in the STEM field. If you wish to find more about him you can find his contacts below.
                  </p>
                  <div className="social">
                    <a href="https://www.linkedin.com/in/job-k-bb07b518b/" target={'_blank'} rel="noreferrer"><i><Icons.Linkedin /></i></a>
                    <a href="https://www.instagram.com/_kamwaro/" target={'_blank'} rel="noreferrer"><i><Icons.Instagram /></i></a>
                    <a href="https://twitter.com/kamwaro_" target={'_blank'} rel="noreferrer"><i><Icons.Twitter /></i></a>
                  </div>
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
              <Formik initialValues={initialValues} onSubmit={handleMessage}>
                <Form className="contact-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <Field type="text" name="name" className="form-control contact-input" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <Field type="email" className="form-control contact-input" name="email" id="email" placeholder="Your Email" required />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <Field type="text" className="form-control contact-input" name="subject" id="subject" placeholder="Subject" required />
                  </div>
                  <div className="form-group mt-3">
                    <Field as={textArea} className="form-control" name="message" placeholder="Message" />
                  </div>
                  <div className="text-center mt-3"><button type="submit">Send Message</button></div>
                </Form>
              </Formik>
            </div>

          </div>

        </div>
      </section>

    </div>

  )
}

export default Home