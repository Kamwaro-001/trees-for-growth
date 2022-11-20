import React, { useState, useEffect } from "react";
import dataService from '../../services/data.service';
import { Button, Modal, Form } from "react-bootstrap";
import "./Communities.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";

const Communities = (props) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    dataService.getCommunities().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  const [show, setShow] = useState(false);
  // const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialState = {
    name: '',
    region: '',
    created_by: 'jobk',
    verif_code: 'xyz'
  }
  const [community, setCommunity] = useState(initialState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCommunity({ ...community, [name]: value });
  };

  const saveCommunity = () => {
    var data = {
      name: community.name,
      region: community.region,
      created_by: community.created_by,
      verif_code: community.verif_code
    };

    dataService.addCommunity(data)
      .then(response => {
        setCommunity({
          id: response.data.id,
          name: response.data.name,
          region: response.data.region,
          created_by: response.data.created_by,
          verif_code: response.data.verif_code
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const newCommunity = () => {
  //   setCommunity(initialState);
  // };

  let x = [];
  for (let i = 0; i < content.length; i++) {
    if (content[i] !== undefined) {
      let cont = content[i]
      x.push(<><td>{cont.name}</td><td>{cont.region}</td><td>{cont.created_by}</td></>)
    } else {

    }
  }
  if (content[0] === undefined) {
    x.push(<td>No added Communities</td>)
  }

  return (
    <>
      <div id='communities-board'>
        <h2 className='communities-heads'>Communities</h2>
        <div className="comm-create">
          <Button variant="primary" onClick={handleShow}>
            Create a Community
          </Button>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Create a Community</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={saveCommunity}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Community Name</Form.Label>
                  <Form.Control name="name" type="text" placeholder="community name" autoFocus value={community.name} onChange={handleInputChange} />
                  <Form.Label>Region</Form.Label>
                  <Form.Control name="region" type="text" placeholder="Primary Region" autoFocus value={community.region} onChange={handleInputChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={saveCommunity} type="submit">
                <span onClick={handleClose}>Create</span>
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <table className="community-table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Region</th>
              <th>Created By</th>
            </tr>
            {
              x.map((community, index) => (
                <tr key={index}>
                  {community}
                  <td>
                    <button type="button" className="join-btn btn btn-success btn-block">Join</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Communities