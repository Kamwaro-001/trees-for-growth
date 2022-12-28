import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUserAsync } from "../../../slices/users.slice";

export const PDetails = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    email: props.mainmail,
    first_name: '',
    last_name: '',
    phonenumber: '',
    county: '',
    town: ''
  })

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addNewUser = () => {
    dispatch(addUserAsync(newUser));
  }

  return (
    <>
      <button type="button" className="btn btn-success px-4 " onClick={handleShow}>Details</button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Personal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addNewUser}>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input type="text" className="form-control" id="fname" placeholder="John/Jane" required name="first_name" value={newUser.first_name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" className="form-control" id="lname" placeholder="Doe" required name="last_name" value={newUser.last_name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" className="form-control" id="pnumber" placeholder="+254 712 345 678" required name="phonenumber" value={newUser.phonenumber} onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="inputCity">Town/City</label>
                <input type="text" className="form-control" id="inputTown" required name="town" value={newUser.town} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="inputCity">County</label>
                <input type="text" className="form-control" id="inputCounty" required name="county" value={newUser.county} onChange={handleInputChange} />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success m-lg-2 col-md-3">submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>

  )
}
