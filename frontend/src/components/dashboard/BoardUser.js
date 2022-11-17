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
  let userid = toString(content.id)
  console.log(userid)
  console.log(allcontent)
  // let uname = document.querySelector("#fname").value
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{allcontent.first_name}</h3>
        <form>
          <input type="text" placeholder = {allcontent.first_name} id = "fname"/>
          <button type="submit" onClick={UserService.updateUserInfo(userid,"jobu")}>click me </button>
        </form>
      </header>
    </div>
  );
};

export default BoardUser;