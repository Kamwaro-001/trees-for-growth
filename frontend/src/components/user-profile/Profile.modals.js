import React, { useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import userService from '../../services/user.service';

export const UsrInfo = (
  usrid, fname, lname, email, pnumber
  ) => {
  // usrid, fname, lname, email, pnumber
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);
  usrid = 1;
  // let fname = "hi";
  // let lname;
  // let email;
  // let pnumber;
  const initialState = {
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    phonenumber: ''
  }

  const [usr, setInfo] = useState(initialState)

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInfo({ ...usr, [name]: value });
  };

  const editUsr = () => {
    // var data = {
    //   id: usrid,
    //   first_name: usr.first_name,
    //   last_name: usr.last_name,
    //   email: usr.last_name,
    //   phonenumber: usr.phonenumber
    // };
    userService.updateUserInfo(usrid, setInfo)
      .then(response => {
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <>
      <Button variant="primary" onClick={modalShow}>
        Edit
      </Button>
      <Modal show={show} onHide={modalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editUsr}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control name="first_name" type="text" placeholder={fname} autoFocus value={usr.first_name} onChange={handleInputChange} />

              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last_name" type="text" placeholder={lname} autoFocus value={usr.last_name} onChange={handleInputChange} />
              
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="text" placeholder={email} autoFocus value={usr.email} onChange={handleInputChange} />
              
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phonenumber" type="text" placeholder={pnumber} autoFocus value={usr.phonenumber} onChange={handleInputChange} />
              
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
    </>
  )
}

export const useraddr = () => {

}