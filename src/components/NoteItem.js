import React, {useContext} from 'react';
import NoteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
   const {note, updateNote} = props;
   const context = useContext(NoteContext)
   const {deleteNote} = context

   note.tags=note.tags.toString().split(/,\s*/)

   return (
    <div className="col-md-3"> 
        <div className="card my-3" >
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <div className="d-flex justify-content-between ">
                    {/* {console.log(note.tags)} */}
                    {(note.tags[0]!==null) &&  <div className='d-flex gap-1'>
                        {note.tags.map((tag)=>{ return <p role="button" className={"border border-dark p-1 rounded"}>{tag}</p>  })}
                    </div>}
                    
                    <div>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)} } ></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i> 
                    </div>
      
                           
                    
                </div> 

            </div>
        </div>
    </div>
  )
}

export default NoteItem;