import React, {useState, useContext} from 'react'
import NoteContext from '../context/notes/noteContext'

function AddNote() {

    const context = useContext(NoteContext);
    const {addNote} = context;

    var [note, setNote] = useState({title:"" , description:"", tag:""})

    const handleClick = (e) =>{
      e.preventDefault();

      // Checking if title is empty
      let noteCheck=note.title.replace(/\s/g, '');
      if (noteCheck===""){
          console.log(noteCheck);
          alert("Title can not be empty")
      }
      
      addNote(note.title, note.description, note.tag)
      setNote({title:"" , description:"", tag:""})
    }

    const onChange = (e) => {
      setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <>
      <h2 className="my-3"> Add a note </h2>
      <div className="container my-3">
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} minLength={3} required placeholder="Enter title" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder="Enter description" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
    </>
  )
}

export default AddNote