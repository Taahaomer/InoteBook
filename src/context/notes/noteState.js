import Alert from "../../components/Alert";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) =>{

    const host= "http://localhost:5000"

    // Fetch all Notes
        const fetchAllNotes = async () => {

            // API call
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    "Content-Type":"application/json",
                    "auth-token": localStorage.getItem('token')
                } 
            });

            const json = await response.json();

            setNotes(json)
        }

    const notesInitial=[]
    let [notes,setNotes]=useState(notesInitial)


    // Add a note
    const addNote = async(title, description, tag) => {

        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
            "auth-token": localStorage.getItem('token')
        } ,
        body: JSON.stringify({title, description, tag}) 

        });

        const note = await response.json();
        setNotes(notes.concat(note))
        showAlert("Note added", "success")

    }
    // Delete a note
       const deleteNote = async(id) =>{
        
        // API call                 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
            headers: {
                "Content-Type":"application/json",
                "auth-token": localStorage.getItem('token')
            } ,
        });
        const json = await response.json()
        

            const newNotes = notes.filter((note)=>{ return note._id !== id});
            setNotes(newNotes)
            showAlert("Note deleted", "success")
       }
    // Edit a note
       const editNote = async (id, title, description, tag) => {
          // API call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type":"application/json",
                "auth-token": localStorage.getItem('token')
            } ,
            body: JSON.stringify({title, description, tag}) 

        });
        const json = await response.json();
        
          // edit note on client side
        const newNotes = JSON.parse(JSON.stringify(notes))
        for(let i=0; i<newNotes.length; i++){
            var element = newNotes[i]
            if (element._id === id){
                newNotes[i].title=title;
                newNotes[i].description=description;
                newNotes[i].tag=tag;
                break;
            }    
        }
        setNotes(newNotes)
        showAlert("Note updated", "success")
       }

// Alert context

       const [alert, setAlert] = useState(null);

       const showAlert = (message, type) => {
            
            setAlert({
                message: message,
                type:type
            });

            setTimeout(() => {
                setAlert(null)
            }, 1500);
       }

    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes, showAlert, alert}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;