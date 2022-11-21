import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import userService from '../../services/user.service';
import "./Profile.css";

const Profile = () => {
  //for the personal info
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  // for the address change
  const [adrShow, setAddrShow] = useState(false);
  const addrModalClose = () => setAddrShow(false);
  const addrModalShow = () => setAddrShow(true);


  const [userinfo, setUserInfo] = useState([]);
  const [useraddr, setUserAddr] = useState([]);

  useEffect(() => {
    getUserInfo()
    getUserAddr()
  }, []);

  const getUserInfo = () => {
    userService.getUserBoard()
      .then(response => {
        setUserInfo(response.data);
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e)
      });
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

  let countyad;
  let townad;
  let fullad;
  let addrId;

  useraddr.map((getid) => (
    addrId = getid.id,
    countyad = getid.county,
    townad = getid.town,
    fullad = getid.full_address
  ))////////////////

  const initAdrr = {
    id: null,
    county: countyad,
    town: townad,
    full_address: fullad
  }

  const [usr, setInfo] = useState(initialState);
  const [address, setAddress] = useState(initAdrr);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInfo({ ...usr, [name]: value });
  };

  const handleAddrChange = event => {
    const { ads, val } = event.target;
    setAddress({ ...address, [ads]: val });
  }

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
                    <Form.Control name="first_name" type="text" placeholder={map_usr.first_name} autoFocus value={usr.first_name} onChange={handleInputChange} />

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="last_name" type="text" placeholder={map_usr.last_name} autoFocus value={usr.last_name} onChange={handleInputChange} />

                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder={map_usr.email} autoFocus value={usr.email} onChange={handleInputChange} />

                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control name="phonenumber" type="text" placeholder={map_usr.phonenumber} autoFocus value={usr.phonenumber} onChange={handleInputChange} />

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
                    <Form.Control name="county" type="text" placeholder={map_addr.county} autoFocus value={address.county} onChange={handleAddrChange} />

                    <Form.Label>Town</Form.Label>
                    <Form.Control name="town" type="text" placeholder={map_addr.town} autoFocus value={address.town} onChange={handleAddrChange} />

                    <Form.Label>Address</Form.Label>
                    <Form.Control name="full_address" type="text" placeholder={map_addr.full_address} autoFocus value={address.email} onChange={handleAddrChange} />

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

    </div>
  )
}

export default Profile;