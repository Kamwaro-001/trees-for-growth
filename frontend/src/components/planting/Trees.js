import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./Trees.css";
import dataService from '../../services/data.service';

const Trees = () => {
   const [trees, setTrees] = useState([]);
   const [currentTree, setCurrentTree] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(-1);

   useEffect(() => {
      retrieveTrees();
   }, []);

   const retrieveTrees = () => {
      dataService.getTrees()
         .then(response => {
            setTrees(response.data);
            console.log(response.data);
         })
         .catch(e => {
            console.log(e);
         })
   }

   const refreshList = () => {
      retrieveTrees();
      setCurrentTree(null);
      setCurrentIndex(-1);
   }

   const findByName = () => {
      
   }

   return (
      <div>
         <h2>manage here</h2>
         <div className='trees-info'>
            <p>No of planted trees: </p>
            <p></p>
         </div>
      </div>
   )
}

export default Trees;