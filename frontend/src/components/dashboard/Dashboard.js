import React, { useState, useEffect } from "react";

import dataService from "../../services/data.service";

const Dashboard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    dataService.getTrees().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content = error;

        setContent(_content);
      }
    );
  }, []);
  let l = content.length;

  const goals = [5, 10, 15, 20, 30, 50, 100, 200]

  var goal;

  goals.forEach(e => {
    let x = goals.indexOf(e)
    if (l >= e) {
      goal = "next one is " + goals[x + 1];
    } else if (e === 5) goal = "next one is 5"
  });

  function displayTable(trees) {
    var table = document.getElementsByClassName('list-of-trees');
    for (var i = 0; i < trees.length; ++i) { 
      var tree = trees[i];
      var row = document.createElement('tr');
      var properties = ['tree_name', 'more_info'];

      for (var j = 0; j < properties.length; ++j) {  
        var cell = document.createElement('td');
        cell.innerHTML = tree[properties[j]];
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }

  console.log(goal)

  return (
    <>
      <div id="dashboard">
        <div className="dash-top">
          <h3>Current Trees Planted</h3>
          <p className="dash-tally">{l}</p>
          <h3>Next Goal</h3>
          <p>{goal}</p>
          <button type="button" onClick={displayTable(content)}>hi</button>
        </div>

        <div className="list-trees">
          <table className="list-of-trees">
            <tbody>
            <tr>
              <th>Tree Name</th>
              <th>Description</th>
            </tr>
            </tbody>
            
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard