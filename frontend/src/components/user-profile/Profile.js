import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAccountUserAsync, showAccount } from '../../slices/Account.Slice';
import { getUsersAsync, showUser } from '../../slices/users.slice';
import { PDetails } from '../authentication/register/Register.Modals';
import { Details, SensitiveDetails } from './Profile.Components';
import "./Profile.css";

const Profile = () => {

  const userinfo = useSelector(showUser)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountUserAsync())
    dispatch(getUsersAsync())
  }, [dispatch])

  const sensitiveInfo = useSelector(showAccount);
  let sensitiveMail = ""
  let sensitiveUsername = ""

  let checkPersonalInfo = 0;

  userinfo.map((u) => (
    u.map(() => (
      checkPersonalInfo += 1
    ))
  ))

  sensitiveMail = sensitiveInfo.email
  sensitiveUsername = sensitiveInfo.username

  return (
    <div className="all-profile container pt-5">
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
                          <h4 className=' text-capitalize'>{usr.first_name} {usr.last_name}</h4>
                          <p className="text-secondary mb-1">{sensitiveMail}</p>
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
          {
            checkPersonalInfo === 0 ?
              <div className="col-lg-8 p-1">
                <div className="card">
                  <div className="card-body">
                    <p className='text-center'>For a better view please enter your personal details</p>
                    <div className="row">
                      <div className="text-secondary text-center">
                        <PDetails mainmail={sensitiveMail} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              :
              userinfo.map((user) => (
                user.map((info, i) => (
                  <Details key={i} id={info.id} fname={info.first_name} lname={info.last_name} email={info.email} pnumber={info.phonenumber} area={info.county} place={info.town} />
                ))
              ))
          }
          <SensitiveDetails email={sensitiveMail} username={sensitiveUsername} />
        </div>
      </div>
    </div>
  )
}

export default Profile;