import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTreeAsync, showTree } from "../../slices/Trees.slice";
import { useSelector } from "react-redux";
import { getPersonAsync } from "../../slices/other.Slice";
import "./Dashboard.css"
import { Link } from "react-router-dom";
import * as Icons from 'react-bootstrap-icons';

const Dashboard = () => {
  const dispatch = useDispatch();
  const tree = useSelector(showTree)

  useEffect(() => {
    dispatch(getTreeAsync());
    dispatch(getPersonAsync())
  }, [dispatch])
  let l;
  let lists = []

  tree.forEach(element => {
    element.forEach(e => {
      lists.push(e)
    })
  });

  const goals = [5, 10, 15, 20, 30, 50, 100, 200];

  l = lists.length;

  let passed = goals.filter(g => g <= l)
  let goal = (goals[passed.length]);
  let doneGoals = passed.length

  return (
    <section id="dashboard" className="dashboard">
      <div className="container">

        <div className="section-title">
          <h2>Dashboard</h2>
          <p>Here is most of your progress</p>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="icon-box">
              <div className="icon"><i className="bx bxl-dribbble"><Icons.Tree /></i></div>
              <h4><Link to="/trees">{l}</Link></h4>
              <p className="dash-p">Number of Trees Planted</p>
              <p>You can also join a community for motivation!</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <div className="icon-box">
              <div className="icon"><i className="bx bx-file"><Icons.Bullseye /></i></div>
              <h4><Link to="/trees">{goal}</Link></h4>
              <p className="dash-p">My Next Goal</p>
              <p>Plant {goal - l} more trees to reach your next goal!</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
            <div className="icon-box">
              <div className="icon"><i className="bx bx-tachometer"><Icons.Box /></i></div>
              <h4><Link to="/trees">{doneGoals}</Link></h4>
              <p className="dash-p">Passed Goals</p>
              <p>Not Satisfied? You know what to do!</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Dashboard