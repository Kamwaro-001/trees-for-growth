import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RequireAuth(props) {
  const { user: loggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  if (!loggedIn) {
    const redirectAfterLogin = window.location.pathname;
    console.log('login first')
    dispatch(window.location.replace(`/login?next=${redirectAfterLogin}`));
  } else {
    return <props.component />
  }

}

