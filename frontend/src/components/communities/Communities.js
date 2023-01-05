import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { addCommunityAsync, getCommunityAsync, showCommunity } from "../../slices/Communities.slice";
import { JoinCommunity, CommunitiesList } from "./Community.Modals";
import phoneNumberToken from "generate-sms-verification-code";
import "./Communities.css";
import { getAccountUserAsync, showAccount } from "../../slices/Account.Slice";
import { Link } from "react-router-dom";
import * as Icons from 'react-bootstrap-icons'


const Communities = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const community = useSelector(showCommunity)
	const { isLoggedIn } = useSelector((state) => state.auth)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCommunityAsync());
		dispatch(getAccountUserAsync());
	}, [dispatch])

	const letter = () => {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		return alphabet[Math.floor(Math.random() * alphabet.length)]
	}
	const user = useSelector(showAccount);
	console.log(user)

	let generatedToken = phoneNumberToken(8, { type: 'number' });

	const verificationCode = letter() + generatedToken;
	const [newComm, setNewComm] = useState({
		name: '',
		region: '',
		created_by: user.username,
		verif_code: verificationCode
	})

	const handleInputChange = event => {
		const { name, value } = event.target;
		setNewComm({ ...newComm, [name]: value });
	};

	const addNewCommunity = () => {
		dispatch(addCommunityAsync(newComm))
		window.location.reload();
	}

	let checkCommunities = 0;
	let checkMyCommunities = 0;

	return (
		<div>
			<div className="section-title pt-5">
				<h2>Communities</h2>
			</div>
			<section id="list-communities" className="list-communities section-bg">
				<div className="container">
					<div className="row">
						{
							community.map((c) => (
								c.map((item, i) => (
									<div className="col-md-6 pb-5" key={i}>
										<div className="icon-box">
											<span hidden>{checkCommunities += 1}</span>
											<h4><Link to="#" className="a">{item.name}</Link></h4>
											<p className="p1">{item.region}</p>
											<p className="p2">created by: {item.created_by}</p>
											<div className="join-btn text-end w-100">
												<JoinCommunity check={item.verif_code} community_name={item.name.toUpperCase()} />
											</div>
										</div>
									</div>
								))
							))
						}
						{
							checkCommunities === 0 ?
								<div className="col-lg-8 p-1 m-auto">
									<div className="card">
										<div className="card-body">
											<p className='text-center'>No communities added yet</p>
											<p className='text-center'>Create one to do more activities as a group</p>
											<div className="row">
												<div className="text-secondary text-center">
													{isLoggedIn ?
														<button className="btn btn-primary px-4" onClick={handleShow}>Create</button>
														:
														<Link to='/login'>
															<button className="btn btn-primary px-4">Login</button>
														</Link>
													}
												</div>
											</div>
										</div>
									</div>
								</div>
								: null
						}
					</div>
				</div>
			</section>
			<div className="comm-create">
				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>Create a Community</Modal.Title>
					</Modal.Header>
					<Modal.Body className='pb-0'>
						<Form onSubmit={addNewCommunity}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Community Name</Form.Label>
								<Form.Control name="name" type="text" placeholder="community name" autoFocus value={newComm.name} onChange={handleInputChange} required />
								<Form.Label>Region</Form.Label>
								<Form.Control name="region" type="text" placeholder="Primary Region" autoFocus value={newComm.region} onChange={handleInputChange} required />
							</Form.Group>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
								<Button variant="primary" type="submit">
									Create
								</Button>
							</Modal.Footer>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
			{
				isLoggedIn ?
					<>
						<div className="my-communities">
							<div className="section-title">
								<h2>Communities you have created</h2>
							</div>
							<section id="list-communities" className="list-communities section-bg">
								<div className="container">
									<div className="row">
										<div className="col-lg-3">
											<div className="card">
												<div className="card-body">
													<div className="d-flex flex-column align-items-center text-center">
														<p>Ready to add a community?</p>
														<button className="btn btn-success px-4" onClick={handleShow}>Create</button>
													</div>
												</div>
											</div>
										</div>

										<div className="col-lg-9">
											<div className="row">
												{
													community.map((c) => (
														c.map((item, i) => (
															item.created_by === user.username ?
																<div className="col-md-6 pb-5" key={i}>
																	<div className="icon-box">
																		<span hidden>{checkMyCommunities += 1}</span>
																		<h4><Link to="#" className="a">{item.name}</Link></h4>
																		<p className="p1">{item.region}</p>
																		<p className="p2">created on: {item.date_created}</p>
																		<div className="my-comm text-end">
																			<div className="my-comm-del">
																				<Icons.Trash />
																			</div>
																		</div>
																	</div>
																</div>
																: null
														))
													))
												}
												{
													checkMyCommunities === 0 ?
														<div className="col-lg-8 p-1 m-auto">
															<div className="card">
																<div className="card-body">
																	<p className='text-center'>You have not created a community yet</p>
																	<p className='text-center'>You can create yours and add members</p>
																	<div className="row">
																		<div className="text-secondary text-center">
																			<button className="btn btn-primary px-4" onClick={handleShow}>Create</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														: null
												}
											</div>
										</div>
									</div>

								</div>
							</section>
						</div>
						<div className="entered-communities">
							<div className="section-title">
								<h2>Communities you are a member of</h2>
							</div>
							<CommunitiesList />
						</div>
					</>
					:
					<div className="col-lg-8 p-1 m-auto">
						<div className="card">
							<div className="card-body">
								<p className='text-center'>Please Login to view your community information</p>
								<p className='text-center'>You will be able to create communities or even join existing ones</p>
								<div className="row">
									<div className="text-secondary text-center">
										<Link to='/login'>
											<button className="btn btn-primary px-4">Login</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
			}

		</div>
	)
}

export default Communities