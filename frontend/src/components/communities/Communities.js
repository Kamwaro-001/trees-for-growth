import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { addCommunityAsync, getCommunityAsync, showCommunity } from "../../slices/Communities.slice";
import { JoinCommunity, CommunitiesList } from "./Community.Modals";
import phoneNumberToken from "generate-sms-verification-code";
import "./Communities.css";
import { showAccount } from "../../slices/Account.Slice";


const Communities = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const community = useSelector(showCommunity)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCommunityAsync());
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

	return (
		<div>
			<h1>Communities</h1>

			<table>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Region</th>
						<th>Created By</th>
					</tr>
					{
						community.map((c) => (
							c.map((item, i) => (
								<tr key={i}>
									<td>{item.name}</td>
									<td>{item.region}</td>
									<td>{item.created_by}</td>
									<td><JoinCommunity check={item.verif_code} /></td>
								</tr>
							))
						))
					}
				</tbody>
			</table>
			<div className="comm-create">
				<Button variant="primary" onClick={handleShow}>
					Create a Community
				</Button>
				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>Create a Community</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={addNewCommunity}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Community Name</Form.Label>
								<Form.Control name="name" type="text" placeholder="community name" autoFocus value={newComm.name} onChange={handleInputChange} />
								<Form.Label>Region</Form.Label>
								<Form.Control name="region" type="text" placeholder="Primary Region" autoFocus value={newComm.region} onChange={handleInputChange} />
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={addNewCommunity} type="submit">
							<span onClick={handleClose} className="add-btn">Create</span>
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div className="my-communities">
				<h3>My communities</h3>
				<div className="get-communities">
					{
						community.map((c) => (
							c.map((item, i) => (
								item.created_by === user.username ?
									<ul key={i} className='my-communities'>
										<li>{item.name}</li>
										<li>{item.region}</li>
										<li>{item.date_created}</li>
									</ul>
									: null
							))
						))
					}
				</div>
			</div>
			<div>
				<h3>Communities I am a member of</h3>
				<CommunitiesList />
			</div>
		</div>
	)
}

export default Communities