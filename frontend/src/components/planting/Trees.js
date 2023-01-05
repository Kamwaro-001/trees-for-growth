import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { addTreeAsync, getTreeAsync, showTree } from '../../slices/Trees.slice';
import { Link } from 'react-router-dom';
import './Trees.css';
import { Tree } from 'react-bootstrap-icons';
import { Formik, Form, Field } from 'formik';


const Trees = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const tree = useSelector(showTree)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTreeAsync())
	}, [dispatch])

	const initialValues = {
		tree_name: '',
		more_info: '',
		files: null
	}

	const addNewTree = (formValue) => {
		dispatch(addTreeAsync(formValue))
		window.location.reload();
	}

	let checkTrees = 0;

	return (
		<div>
			<div className="section-title pt-5">
				<h2>My Tree Planting information</h2>
				<p>Add a tree or view all the trees that you have added to the site so far.</p>
			</div>
			<section id="list-trees" className="list-trees section-bg">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 add-part mb-5">
							<div className="card h-100">
								<div className="card-body">
									<div className="d-flex flex-column align-items-center">
										<p>Ready to add a tree?</p>
										<button className="btn btn-success px-4" onClick={handleShow}>Add <Tree /></button>
									</div>
									<div className='more-add text-center rounded-2'>
										<p>Start recording your tree planting activity</p>
									</div>
								</div>
							</div>
						</div>
						<div className='col-lg-8'>
							<div className='row'>
								{
									tree.map((t) => (
										t.map((item, i) => (
											<div className="col-md-4 mb-3 tree-map" key={i}>
												<div className="icon-box">
													<span hidden>{checkTrees += 1}</span>
													<h4>
														<Link to="#" className="a">{item.tree_name}</Link>
													</h4>
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
					<Modal.Body className='pb-0'>
						<Formik initialValues={initialValues} onSubmit={addNewTree}>
							<Form className='mb-3'>
								<label htmlFor="tree-name">Tree Name</label>
								<div className="form-group">
									<Field type="text" name="tree_name" className="form-control" id="tree-name" placeholder="Tree Name" required maxLength={255} />
								</div>
								<label htmlFor="more-info">More Info</label>
								<div className="form-group">
									<Field type="text" name="more_info" className="form-control" id="more-info" placeholder="Any more information about the tree" required maxLength={255} />
								</div>
								<Modal.Footer>
									<button className='btn btn-secondary' onClick={handleClose}>
										Close
									</button>
									<button className='btn btn-primary' type="submit">Add Tree
									</button>
								</Modal.Footer>
							</Form>
						</Formik>
					</Modal.Body>
				</Modal>
			</div>
		</div>
	)
}

export default Trees