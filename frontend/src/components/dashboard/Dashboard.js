import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTreeAsync, showTree } from "../../slices/Trees.slice";
import { useSelector } from "react-redux";
import { getPersonAsync } from "../../slices/other.Slice";

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
      </div>
    </>
  )
}

export default Dashboard