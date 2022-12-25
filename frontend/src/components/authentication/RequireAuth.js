import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RequireAuth(props) {
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    checkAuth()
  })

  function checkAuth() {
    if (!isLoggedIn) {
      const redirectAfterLogin = window.location.pathname;
      dispatch(window.location.replace(`/login?next=${redirectAfterLogin}`));
    }
  }

  return (
    <div>
      {
        isLoggedIn ? (
          <props.component />
        ) : null
      }
    </div>
  )

}
