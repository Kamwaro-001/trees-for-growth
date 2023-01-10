import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showAccount } from '../../slices/Account.Slice';
import { deleteCommunity, getCommunityAsync, getMyMembership, showMembership } from '../../slices/Communities.slice';
import { addMemberAsync, getMemberAsync } from '../../slices/Members.slice';
import * as Icons from 'react-bootstrap-icons'
import { toastOnWarn } from '../../redux/utils/Utils';

export const JoinCommunity = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isLoggedIn } = useSelector((state) => state.auth)

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
    } else {
      toastOnWarn("Wrong Verification Code!")
    }
  }

  const checkLogin = () => {
    if (isLoggedIn) {
      return handleShow()
    } else {
      toast.warn('Please login to join a community', { icon: <Icons.ShieldExclamation /> })
    }
  }

  return (
    <>
      <Button variant="success" onClick={checkLogin} className='modal-join-btn'>
        Join
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join {" " + props.community_name}</Modal.Title>
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
  const myMembership = useSelector(showMembership);

  useEffect(() => {
    dispatch(getMemberAsync());
    dispatch(getCommunityAsync());
    dispatch(getMyMembership());
  }, [dispatch])

  let checkEnteredCommunities = 0
  return (
    <section id="list-communities" className="list-communities section-bg">
      <div className="container">
        <div className="row">
          {
            myMembership.map((member) => (
              member.map((m, commIndex) => (
                <div className="col-md-6 pb-5" key={commIndex}>
                  <div className="icon-box">
                    <span hidden>{checkEnteredCommunities += 1}</span>
                    <h4><Link to="#" className="a">{m.community}</Link></h4>
                    <p className="p1">{m.region}</p>
                    <p className="p2">joined on: {m.joining_date}</p>
                    <div className="my-comm text-end">
                      <button className="btn btn-danger px-4" >Exit</button>
                    </div>
                  </div>
                </div>
              ))
            ))
          }

          {
            checkEnteredCommunities === 0 ?
              <div className="col-lg-8 p-1 m-auto">
                <div className="card">
                  <div className="card-body">
                    <p className='text-center'>You have not yet joined a community</p>
                    <p className='text-center'>You can find one above or create one if you have members to add</p>
                  </div>
                </div>
              </div>
              : null
          }
        </div>
      </div>
    </section>
  )
}

export const MyCreatedCommunities = (props) => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    let id = props.id
    dispatch(deleteCommunity({id}))
      .unwrap()
  }

  return (
      <div className="icon-box">
        <h4><Link to="#" className="a">{props.name}</Link></h4>
        <p className="p1">{props.region}</p>
        <p className="p2">created on: {props.date}</p>
        <div className="my-comm text-end">
          <div className="my-comm-del">
            <Icons.Trash data-bs-toggle='tooltip' data-bs-placement='bottom' title='delete' onClick={handleDelete} />
          </div>
        </div>
      </div>
  )
}