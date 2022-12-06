import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../slices/Users.slice";

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
      {/* <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="d-flex align-items-center mb-3">Project Status</h5>
                    <p>Web Design</p>
                    <div className="progress mb-3">
                      <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p>Website Markup</p>
                    <div className="progress mb-3">
                      <div className="progress-bar2 progress-bar bg-danger" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p>One Page</p>
                    <div className="progress mb-3">
                      <div className="progress-bar progress-bar3 bg-success" role="progressbar" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p>Mobile Template</p>
                    <div className="progress mb-3">
                      <div className="progress-bar4 progress-bar bg-warning" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p>Backend API</p>
                    <div className="progress" >
                      <div className="progress-bar5 progress-bar bg-info" role="progressbar" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
    </div>
  )
}