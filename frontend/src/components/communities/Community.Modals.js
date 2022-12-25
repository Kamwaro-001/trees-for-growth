import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showAccount } from '../../slices/Account.Slice';
import { getCommunityAsync, showCommunity } from '../../slices/Communities.slice';
import { addMemberAsync, getMemberAsync, showMember } from '../../slices/Members.slice';

export const JoinCommunity = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = useSelector(showAccount)
  const dispatch = useDispatch();

  const [newMember, setMember] = useState({
    user: user.username,
    member_to: ''
  })
  const handleInputChange = event => {
    const { name, value } = event.target;
    setMember({ ...newMember, [name]: value });
  };
  const joinCommunity = () => {
    if (newMember.member_to === props.check) {
      dispatch(addMemberAsync(newMember)) && window.location.reload();
      // toast.success("You have joined successfully!")
      // window.location.reload();
    } else {
      toast.warn("Wrong Verification Code!")
    }
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

export const CommunitiesList = () => {
  const dispatch = useDispatch();
  const membership = useSelector(showMember);
  const community = useSelector(showCommunity);

  const user = useSelector(showAccount)

  useEffect(() => {
    dispatch(getMemberAsync());
    dispatch(getCommunityAsync());
  }, [dispatch])

  return (
    <>
      {
        membership.map((member) => (
          member.map((m, index) => (
            community.map((comm) => (
              comm.map((c, commIndex) => (
                m.user === user.username && m.member_to === c.verif_code ?
                  <ul key={commIndex} className='my-communities'>
                    <li>{c.name}</li>
                    <li>{c.region}</li>
                    <li>{c.date_created}</li>
                  </ul>
                  : null
              ))
            ))
          ))
        ))
      }
    </>
  )
}