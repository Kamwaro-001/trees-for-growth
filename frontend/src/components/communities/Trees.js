import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTree,addTree } from './treesAction';
import PropTypes from "prop-types";

class Trees extends React.Component {
    render() {
        const { tree } = this.props;
        return (
            <div>
                <p>{tree.content}</p>
            </div>
        )
    }
}

Trees.propTypes = {
    expense: PropTypes.object.isRequired
};
export default Trees;