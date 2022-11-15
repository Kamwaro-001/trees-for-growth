import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                {/* TODO edit token here */}
                {/* <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "} */}
                <strong>Token:</strong> {currentUser.auth_token.substring(0, 20)} ...{" "}
                {/* {currentUser.accessToken.substr(currentUser.accessToken.length - 20)} */}
                {currentUser.auth_token.substr(currentUser.auth_token.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
};

export default Profile;