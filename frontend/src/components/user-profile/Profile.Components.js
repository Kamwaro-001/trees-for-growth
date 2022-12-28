import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAccountAsync } from "../../slices/Account.Slice";
import { updateUserAsync } from "../../slices/users.slice";

export const Details = (props) => {

  const dispatch = useDispatch();
  const [editinfo, setInfo] = useState({
    id: props.id,
    first_name: props.fname,
    last_name: props.lname,
    email: props.email,
    phonenumber: props.pnumber,
    county: props.area,
    town: props.place
  })

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInfo({ ...editinfo, [name]: value });
  }

  const updateUser = () => {
    dispatch(updateUserAsync(props.id, editinfo))
    window.location.reload();
  }

  return (
    <div className="col-lg-8">
      <div className="card">
        <div className="card-body">
          <h4 className="text-center pb-2">Personal Details</h4>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">First Name</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="text" name="first_name" className="form-control" defaultValue={props.fname} onChange={handleInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Last Name</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="text" name="last_name" className="form-control" defaultValue={props.lname} onChange={handleInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Email</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="email" name="email" className="form-control" defaultValue={props.email} onChange={handleInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Phone</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="text" className="form-control" name="phonenumber" defaultValue={props.pnumber} onChange={handleInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Town</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="text" name="town" className="form-control" defaultValue={props.place} onChange={handleInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">County</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="text" className="form-control" name="county" defaultValue={props.area} onChange={handleInputChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9 text-secondary">
              <input type="button" className="btn btn-primary px-4" defaultValue="Save Changes" onClick={updateUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SensitiveDetails = (props) => {

  const dispatch = useDispatch();

  const [editinfo, setInfo] = useState({
    email: props.email,
    username: props.username
  })

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInfo({ ...editinfo, [name]: value });
  }

  const patchUser = () => {
    dispatch(editAccountAsync(editinfo))
    window.location.reload();
  }

  return (
    <div className="d-flex justify-content-end w-100">
      <div className="card col-lg-8 ">
        <div className="card-body">
          <h4 className="text-center pb-2">Sensitive Details</h4>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Email</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="text" name="email" className="form-control" defaultValue={props.email} onChange={handleInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Username</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="text" name="username" className="form-control" defaultValue={props.username} onChange={handleInputChange} />
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9 text-secondary">
              <input type="button" className="btn btn-primary px-4" defaultValue="Save Changes" onClick={patchUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}