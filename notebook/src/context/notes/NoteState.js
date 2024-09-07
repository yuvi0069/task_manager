import Notecontext from "./notescontext";
import { useState } from "react";
const NotesState = (props) => {
const host="https://task-manager-6ttv.onrender.com";
    const noteinitial = []
    const [notes,setNotes]=useState(noteinitial);
    const getNotes=async()=>{
        const response = await fetch(`${host}/notes/getall`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
               "token":localStorage.getItem("token"),
            },
            
          });
        const json=await response.json();
        setNotes(json);
    }
    const addnotes=async(title,desc,tag)=>{
        const response = await fetch(`${host}/notes/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
               "token":localStorage.getItem("token"),
            },
            body: JSON.stringify({title, desc, tag})
          });
          const note=await response.json();
           setNotes(notes.concat(note));
    }
    const delt=async(id)=>{
        const response=await fetch(`${host}/notes/deletenote/${id}`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                 "token":localStorage.getItem("token"),
              },
              
        })
        const json=await response.json();
        let newNote=notes.filter((note)=>{return note._id!==id});
        setNotes(newNote);
    }
  const edit=async (id,title,desc,tag)=>{
    const response = await fetch(`${host}/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           "token":localStorage.getItem("token"),
        },
        body: JSON.stringify({title, desc, tag})
      });
      const json=await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes))
    for(let i=0;i<newNotes.length;i++)
    {
        let element=newNotes[i];
        if(id===element._id)
        {
            
            newNotes[i].title=title;
            newNotes[i].desc=desc;
            newNotes[i].tag=tag;
            break;
        }
    }
    setNotes(newNotes);
  }
    return (
        <Notecontext.Provider value={{notes,addnotes,delt,edit,getNotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default NotesState;