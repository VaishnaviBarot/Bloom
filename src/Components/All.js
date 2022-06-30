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
    <div className="row  allint">
     
                <h1 className='d-flex justify-content-center interview mb-3 mt-3'>All Interviews</h1>
                <div className='d-flex justify-content-center mb-3 mt-3'>
                <input type="text" className='search w-50 ' placeholder='Search by company' onChange={searchHandle}/> <button type="button" class="btn btn-primary">
                <i class="fas fa-search"></i>
                </button></div>
                <div className="mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                <div className='allcard mb-3 overflow-auto'>
                {notes.map((note) => {
                    return <Noteitem2 key={note._id} showAlert={props.showAlert} note={note}/>
                })}</div>
    </div>
  );
};

