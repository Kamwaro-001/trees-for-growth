import React, { useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addMemberAsync } from '../../slices/Members.slice';

export const JoinCommunity = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const [newMember, setMember] = useState({
    user: 'job',
    member_to: ''
  })

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMember({ ...newMember, [name]: value });
  };

  const joinCommunity = () => {
    dispatch(addMemberAsync(newMember))
    toast.success("You have joined successfully!")
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Join
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join a Community</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={joinCommunity}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Community Code</Form.Label>
              <Form.Control name="member_to" type="text" placeholder="verification code" autoFocus value={newMember.member_to} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={joinCommunity} type="submit">
            <span onClick={handleClose}>Join Community</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}