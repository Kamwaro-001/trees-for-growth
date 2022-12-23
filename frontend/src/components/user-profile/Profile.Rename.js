import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUsersAsync, showUser } from '../../slices/users.slice';
import { Details } from './Profile.Components';
import "./Profile.Rename.css";

const Profile = () => {

  const userinfo = useSelector(showUser)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAsync())
  }, [dispatch])

  console.log(userinfo)

  return (
    <div className="container">
      <div className="main-body">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  {userinfo &&
                    userinfo.map((p) => (
                      p.map((usr, index) => (
                        <div className="mt-3" key={index}>
                          <h4>{usr.first_name} {usr.last_name}</h4>
                          <p className="text-secondary mb-1">{usr.email}</p>
                          <p className="text-muted font-size-sm">{usr.town}, {usr.county}</p>
                        </div>
                      ))
                    ))
                  }
                </div>
                <hr className="my-4" />
              </div>
            </div>
          </div>

          {userinfo.map((user) => (
            user.map((info, i) => (
              <Details key={i} id={info.id} fname={info.first_name} lname={info.last_name} email={info.email} pnumber={info.phonenumber} area={info.county} place={info.town} />
            ))
          ))}

        </div>
      </div>
    </div>
  )
}

export default Profile;