import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addTreeAsync, getTreeAsync, showTree } from '../../slices/Trees.slice';
import { toast } from 'react-toastify';


const Trees = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const tree = useSelector(showTree)
	const dispatch = useDispatch();
	const [newTree, setNewTree] = useState({
		tree_name: '',
		more_info: '',
		files: null
	})

	useEffect(() => {
		dispatch(getTreeAsync())
		// eslint-disable-next-line
	}, [])

	const handleInputChange = e => {
		const { name, value } = e.target;
		setNewTree({ ...newTree, [name]: value });
	}

	const addNewTree = () => {
		dispatch(addTreeAsync(newTree))
		window.location.reload();
		toast.success("Tree added. Verification should not take too long.");
	}

	return (
		<div>
			<h1>My Trees</h1>
			<div className='table-responsive'>
			<table className='table table-striped table-sm'>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Information</th>
						<th scope="col">Files</th>
					</tr>
				</thead>
				<tbody>
					{
						tree.map((t) => (
							t.map((item, i) => (
								<tr key={i}>
									<td>{item.tree_name}</td>
									<td>{item.more_info}</td>
									<td>{item.files}</td>
								</tr>
							))
						))
					}
				</tbody>
			</table>
				
			</div>
      
			<div className="comm-create">
				<Button variant="success" onClick={handleShow}>
					Planted another?
				</Button>
				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>Tree Details</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={addNewTree}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Tree Name</Form.Label>
								<Form.Control name="tree_name" type="text" placeholder="tree name" autoFocus value={newTree.tree_name} onChange={handleInputChange} />
								<Form.Label>More Information</Form.Label>
								<Form.Control name="more_info" type="textarea" placeholder="more information" autoFocus value={newTree.more_info} onChange={handleInputChange} />
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleClose && addNewTree} type="submit">Add Tree
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	)
}

export default Trees