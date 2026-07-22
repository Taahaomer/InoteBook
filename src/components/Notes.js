import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes() {
  const context = useContext(NoteContext);
  const { notes, fetchAllNotes, editNote } = context;
  const navigate = useNavigate()
  var [note, setNote] = useState({id:"" , etitle:"" , edescription:"", etag:""})

  
  const ref = useRef(null);
  const refClose = useRef(null);

    // const handleClick = (e) =>{
    //   e.preventDefault();
    //   addNote(note.title, note.description, note.tag)
    // }

    const onChange = (e) => {
      setNote({...note, [e.target.name]:e.target.value})
    }
    const onClick = () => {
        
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    useEffect(() => {
        fetchAllNotes();

        if(localStorage.getItem('token')){
            navigate("/");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  const updateNote = (currentNote) => {
    setNote({ id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag })
    ref.current.click();
  };


  return (
    <>
      <AddNote />

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModalLong" >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header justify-content-between">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">        
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} placeholder="Enter description" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" placeholder="" value={note.etag} onChange={onChange}/>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button"  onClick={onClick} className="btn btn-primary">
                Update Note
                
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
            {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem note={note} key={note._id} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
