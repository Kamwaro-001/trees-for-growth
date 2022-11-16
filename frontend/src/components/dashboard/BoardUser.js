import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  
  let allcontent = {}
  
  allcontent = Object.assign({}, ...content);

  console.log(content.length)
  console.log(allcontent)

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{allcontent.first_name}</h3>
      </header>
    </div>
  );
};

export default BoardUser;