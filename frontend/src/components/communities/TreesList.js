import React, { 
    // useState, 
    useEffect } from "react";
import { 
    // useDispatch, 
    useSelector } from "react-redux";
// import Trees from "./Trees";
import { getTree, 
    // addTree
 } from './treesAction';
// import { Link } from "react-router-dom";

// export default function TreesList() {
//     const dispatch = useDispatch()
//     const items = useSelector(state => state.items);
//     // let tree = items.map(e => {
//     //     key={e.id}; index={e};
//     // });

//     let tree = items.map((item,index) => {
//         let tree1=item
//     })

//     return(
//         <div>
//             {/* {items.map((item, index) => {
//             return item.inBasket ? (
//                item.value
//             ) : (

//                 item.value

//             );
//           })} */}
//         </div>

//     )
// }

export const TreesList = () => {
    const trees = useSelector(state => state.trees);
    // const dispatch = useDispatch();

    useEffect(() => {
        getTree();
    }, []);

    return (
        <div className="trees-list">
            <h2>TreesList</h2>
            <ul>
                {trees && trees.map((tree, index) => (
                    <li>{tree.tree_name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TreesList;