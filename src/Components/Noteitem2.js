import React , {useState,useContext} from "react";
import { Button} from 'react-bootstrap';
import { Modal} from 'react-bootstrap';
import noteContext from "../Context/Notes/NoteContext"
import {FaRegThumbsUp,FaRegThumbsDown} from "react-icons/fa";

const Noteitem2 = (props) => {
const { note, see } = props;
const [show, setShow] = useState(false);
const context = useContext(noteContext);
const { putlike, pulllike } = context;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body flex-fill">
          <div className="d-flex align-items-center align-self-stretch">
          <h5 className="card-title align-self-stretch flex-grow-1">{note.title}<span className="badge badge-primary rounded-circle bg-success text-center">{note.like.length}</span></h5>
          <Button variant="primary" onClick={handleShow}>
        Read More
      </Button>
          </div>
    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{note.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{note.description}</Modal.Body>
        <Modal.Footer>
        <button className="btn btn-primary">{note.like.length}</button>
        <FaRegThumbsUp
              className=""
              onClick={() => {
                putlike(note._id);
                // props.showAlert("Liked", "success");
              }}/>
            <FaRegThumbsDown
              className=""
              onClick={() => {
                pulllike(note._id);
                // props.showAlert("Liked", "success");
              }}
            />
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
          <p className="card-text text-truncate">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem2;
