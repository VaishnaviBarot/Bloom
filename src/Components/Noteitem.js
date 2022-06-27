import React, { useContext } from "react";
import noteContext from "../Context/Notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body flex-fill">
          <div className="d-flex align-items-center align-self-stretch">
          <h5 className="card-title align-self-stretch flex-grow-1">{note.title}</h5>
          <div div class="card-header d-flex justify-content-end">
          
            <i
              className="far fa-trash-alt mx-2 p-1"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted successfully", "success");
              }}
            ></i>
            <i
              className="far fa-edit mx-2 p-1"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
