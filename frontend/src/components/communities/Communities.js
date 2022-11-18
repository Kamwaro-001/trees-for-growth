import React, { useState, useEffect } from "react";
import dataService from '../../services/data.service';
import "./Communities.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Communities = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    dataService.getCommunities().then(
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

  let x = [];
  for (let i = 0; i < content.length; i++) {
    if (content[i] !== undefined) {
      let cont = content[i]
      x.push(<><td>{cont.name}</td><td>{cont.region}</td><td>{cont.created_by}</td></>)
      if (content.length === 0) {
        console.log("no added communities")
      }
    }
  }


  return (
    <>
      <div id='communities-board'>
        <h2 className='communities-heads'>Communities</h2>
        <table className="community-table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Region</th>
              <th>Created By</th>
            </tr>
            {
              x.map((community, index) => (
                <tr key={index}>
                  {community}
                  <td>
                    <button type="button" className="join-btn btn btn-success btn-block">Join</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </>
  )
}

export default Communities