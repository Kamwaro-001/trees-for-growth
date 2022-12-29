import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addTreeAsync, getTreeAsync, showTree } from '../../slices/Trees.slice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Trees.css'


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
	}, [dispatch])

	const handleInputChange = e => {
		const { name, value } = e.target;
		setNewTree({ ...newTree, [name]: value });
	}

	const addNewTree = () => {
		dispatch(addTreeAsync(newTree))
		window.location.reload();
		toast.success("Tree added. Verification should not take too long.");
	}

	let checkTrees = 0;

	return (
		<div>
			<div className="section-title pt-5">
				<h2>My Tree Planting information</h2>
			</div>
			<section id="list-trees" className="list-trees section-bg">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 add-part mb-5">
							<div className="card h-100">
								<div className="card-body h-100 test1">
									<div className="d-flex flex-column align-items-center  test">
										<p>Ready to add a tree?</p>
										<button className="btn btn-success px-4" onClick={handleShow}>Add</button>
									</div>
								</div>
							</div>
						</div>
						<div className='col-lg-8'>
							<div className='row'>
								{
									tree.map((t) => (
										t.map((item, i) => (
											<div className="col-md-4 pb-5 tree-map" key={i}>
												<div className="icon-box">
													<span hidden>{checkTrees += 1}</span>
													<h4><Link to="#" className="a">{item.tree_name}</Link></h4>
													<p className="p1">{item.more_info}</p>
												</div>
											</div>
										))
									))
								}
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="comm-create">
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