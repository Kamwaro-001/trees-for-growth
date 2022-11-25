import React, { useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import dataService from '../../services/data.service';

export const JoinButton = () => {
  const [show, setShow] = useState(false);
  const joinClose = () => setShow(false);
  const joinShow = () => setShow(true);

  const initialState = {
    id: null,
    user: 'job',
    member_to: '',
  }

  const [comm, setComm] = useState(initialState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComm({ ...comm, [name]: value });
  };

  const joinComm = () => {
    var data = {
      user: comm.user,
      member_to: comm.member_to
    };
    dataService.joinCommunity(data)
      .then(response => {
        joinComm({
          id: response.data.id,
          user: response.data.user,
          member_to: response.data.member_to
        })
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <>
      <Button variant="primary" onClick={joinShow}>
        Join
      </Button>
      <Modal show={show} onHide={joinClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join a Community</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={joinComm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Community Code</Form.Label>
              <Form.Control name="member_to" type="text" placeholder="verification code" autoFocus value={comm.member_to} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={joinClose}>
            Close
          </Button>
          <Button variant="primary" onClick={joinComm} type="submit">
            <span onClick={joinClose}>Join Community</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}