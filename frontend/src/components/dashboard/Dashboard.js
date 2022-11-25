import React, { useState, useEffect } from "react";

import dataService from "../../services/data.service";
import authService from "../../services/auth.service";

const Dashboard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    dataService.getTrees().then(
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
  let l = content.length;

  const goals = [5, 10, 15, 20, 30, 50, 100, 200]
  let passed = goals.filter( g => g <= l )
  let goal = "next goal is " + goals[passed.length];

  return (
    <>
      <div id="dashboard">
        <div className="dash-top">
          <h3>Current Trees Planted</h3>
          <p className="dash-tally">{l}</p>
          <h3>Next Goal</h3>
          <p>{goal}</p>
          <p>Name:</p>
          {/* <button type="button" onClick={displayTable(content)}>hi</button> */}
        </div>

        <div className="list-trees">
          {/* <table className="list-of-trees">
            <tbody>
              {content.map((tree) => {
                <tr index={tree.id}>
                  <td>{tree.tree_name}</td>
                  <td>{tree.more_info}</td>
                </tr>
              })}
            </tbody>
          </table> */}
        </div>
      </div>
    </>
  )
}

export default Dashboard