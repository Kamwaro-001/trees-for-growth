import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import userService from '../../services/user.service';
import "./Profile.css";
import { UserAddress } from './Profile.modals';

const Profile = () => {
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  const [userinfo, setUserInfo] = useState([]);

  useEffect(() => {
    getUserInfo()
  }, []);

  const getUserInfo = () => {
    userService.getUserBoard()
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(e => {
        console.log(e)
      });
  }


  let adC;
  let adT;
  let adF;
  let adE;
  let ids;
  userinfo.map((getid, i) => (
    ids = getid.id,
    adC = getid.first_name,
    adT = getid.last_name,
    adE = getid.email,
    adF = getid.phonenumber

  ))

  const initialState = {
    id: null,
    first_name: adC,
    last_name: adT,
    email: adE,
    phonenumber: adF
  }
  ////////////////

  const [usr, setInfo] = useState(initialState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInfo({ ...usr, [name]: value });
  };

  const editUsr = () => {
    var data = {
      first_name: usr.first_name,
      last_name: usr.last_name,
      email: usr.email,
      phonenumber: usr.phonenumber
    };
    userService.updateUserInfo(ids, data)
      .then(response => {
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div className='user-profile'>
      {userinfo &&
        userinfo.map((map_usr) => (

          <div className='my-info' key={map_usr.id}>
            <h2>My Information</h2>
            <p>First Name: {map_usr.first_name}</p>
            <p>Last Name: {map_usr.last_name}</p>
            <p>Email: {map_usr.email}</p>
            <p>Phone Number: {map_usr.phonenumber}</p>

            <Button variant="primary" onClick={modalShow}>
              Edit
            </Button>
            <Modal show={show} onHide={modalClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={editUsr}>

                  <Form.Group className="mb-3" controlId="ControlInput1">

                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="first_name" type="text" placeholder={map_usr.first_name} autoFocus value={usr.first_name || ''} onChange={handleInputChange} />

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="last_name" type="text" placeholder={map_usr.last_name} autoFocus value={usr.last_name || ''} onChange={handleInputChange} />

                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder={map_usr.email} autoFocus value={usr.email || ''} onChange={handleInputChange} />

                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control name="phonenumber" type="text" placeholder={map_usr.phonenumber} autoFocus value={usr.phonenumber || ''} onChange={handleInputChange} />

                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={modalClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={editUsr} type="submit">
                  <span onClick={modalClose}>Edit</span>
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))
      }
      <UserAddress/>
    </div>
  )
}

export default Profile;