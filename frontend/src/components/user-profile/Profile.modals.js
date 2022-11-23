import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import userService from '../../services/user.service';
import "./Profile.css";

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

export const UserAddress = () => {

  const [adrShow, setAddrShow] = useState(false);
  const addrModalClose = () => setAddrShow(false);
  const addrModalShow = () => setAddrShow(true);

  const [useraddr, setUserAddr] = useState([]);

  useEffect(() => {
    getUserAddr()
  }, []);

  let countyad;
  let townad;
  let fullad;
  let addrId;

  useraddr.map((getid) => (
    addrId = getid.id,
    countyad = getid.county,
    townad = getid.town,
    fullad = getid.full_address
  ))

  const initialState = {
    id: null,
    county: countyad,
    town: townad,
    full_address: fullad
  }
  const getUserAddr = () => {
    userService.getUserAddress()
      .then(response => {
        setUserAddr(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const [address, setAddress] = useState(initialState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };

  const editAddress = () => {
    var data = {
      county: address.county,
      town: address.town,
      full_address: address.full_address
    };
    userService.updateUserAddr(addrId, data)
      .then(response => {
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }
  return (
    <>
      {useraddr &&
        useraddr.map((map_addr) => (
          <div className='more-info' key={map_addr.id}>
            <h2>More Information</h2>
            <p>County: {map_addr.county}</p>
            <p>Town: {map_addr.town}</p>
            <p>Address: {map_addr.full_address}</p>

            <Button variant="primary" onClick={addrModalShow}>
              Edit
            </Button>
            <Modal show={adrShow} onHide={addrModalClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Location</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form onSubmit={editAddress}>

                  <Form.Group className="mb-3" controlId="ControlInput2">

                    <Form.Label>County</Form.Label>
                    <Form.Control name="county" type="text" placeholder={map_addr.county} autoFocus value={address.county || ''} onChange={handleInputChange} />

                    <Form.Label>Town</Form.Label>
                    <Form.Control name="town" type="text" placeholder={map_addr.town} autoFocus value={address.town || ''} onChange={handleInputChange} />

                    <Form.Label>Address</Form.Label>
                    <Form.Control name="full_address" type="text" placeholder={map_addr.full_address} autoFocus value={address.full_address || ''} onChange={handleInputChange} />

                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={addrModalClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={editAddress} type="submit">
                  <span onClick={addrModalClose}>Edit</span>
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))
      }
    </>
  )
}