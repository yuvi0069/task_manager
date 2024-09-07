import React,{useContext,useState} from 'react'
import notecontext from '../context/notes/notescontext'
export default function Addnotes() {
    const context = useContext(notecontext);
    const {addnotes} = context;
const[note,setNote]=useState({title:"",desc:"",tag:""})
const handleClick=async (e)=>{
    e.preventDefault();
addnotes(note.title,note.desc,note.tag);
setNote({title: "", desc: "", tag: ""})
}
const onChange=(e)=>{
   
    setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <div>

<form>
  <div class="mb-3">
    <label for="title" class="form-label">Title</label>
    <input type="text" class="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange}></input>
    <div id="title" class="form-text"></div>
  </div>
  <div class="mb-3">
    <label for="desc" class="form-label">Description</label>
    <input type="text" class="form-control" name='desc' id="desc" value={note.desc} onChange={onChange}></input>
  </div>
  <div class="mb-3">
    <label for="desc" class="form-label">Tag</label>
    <input type="text" class="form-control" name='tag' id="tag" value={note.tag} onChange={onChange}></input>
  </div>            
  <button type="submit" class="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
    </div>
  )
}
