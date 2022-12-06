import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTreeAsync, showTree } from "../../slices/Trees.slice";
import { useSelector } from "react-redux";
import { getPersonAsync } from "../../slices/other.Slice";
import "./Dashboard.css"

const Dashboard = () => {
  const dispatch = useDispatch();
  // const tree = useSelector((state) => state.trees);
  const tree = useSelector(showTree)
  // const persona = useSelector(showPerson)

  useEffect(() => {
    dispatch(getTreeAsync());
    dispatch(getPersonAsync())
  }, [])
  let l;
  let lists = []

  tree.forEach(element => {
    element.forEach(e => {
      lists.push(e)
    })
  });
  // console.log(persona);
  const goals = [5, 10, 15, 20, 30, 50, 100, 200];
  l = lists.length;
  // console.log(lists);
  let passed = goals.filter(g => g <= l)
  let goal = "next goal is " + goals[passed.length];

  return (
    <>
      <div id="dashboard">
        <div className="dash-top">
          <h3>Current Trees Planted</h3>
          <p className="dash-tally">{l}</p>
          <h3>Next Goal</h3>
          <p>{goal}</p>
        </div>
        <div className="list-trees">
        </div>
      <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="d-flex align-items-center mb-3">Project Status</h5>
                    <p>Web Design</p>
                    <div className="progress mb-3">
                      <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p>Website Markup</p>
                    <div className="progress mb-3">
                      <div className="progress-bar2 progress-bar bg-danger" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p>One Page</p>
                    <div className="progress mb-3">
                      <div className="progress-bar progress-bar3 bg-success" role="progressbar" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p>Mobile Template</p>
                    <div className="progress mb-3">
                      <div className="progress-bar4 progress-bar bg-warning" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p>Backend API</p>
                    <div className="progress" >
                      <div className="progress-bar5 progress-bar bg-info" role="progressbar" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default Dashboard