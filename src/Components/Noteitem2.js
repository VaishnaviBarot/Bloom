import React , {useState} from "react";
import { Button} from 'react-bootstrap';
import { Modal} from 'react-bootstrap';

const Noteitem2 = (props) => {
const { note, see } = props;
const [show, setShow] = useState(false);
let like=0;
let myFunction = () => {
  // like=like+1;
}
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body flex-fill">
          <div className="d-flex align-items-center align-self-stretch">
          <h5 className="card-title align-self-stretch flex-grow-1">{note.title}<span className="badge badge-primary rounded-circle bg-success text-center">{note.like}</span></h5>
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
        <i onClick={myFunction} class="fa fa-thumbs-up">{like}</i>
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
