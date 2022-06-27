import React,{ useContext, useEffect, useRef, useState} from 'react';
import noteContext from "../Context/Notes/NoteContext"
import Noteitem2 from './Noteitem2';

export const All = (props) => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, searchHandle } = context;

  useEffect(() => {
        getAllNotes()
    // eslint-disable-next-line
}, [])

const ref = useRef(null)
const refClose = useRef(null)
const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  return (
    <div className="row my-3">
                <h2>All Interviews</h2>
                <input type="text" className='search mx-auto' placeholder='Search by company' onChange={searchHandle}/>
                <div className="mx-2 my-3">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem2 key={note._id} showAlert={props.showAlert} note={note}/>
                })}
    </div>
  );
};

