import React, { useContext, useEffect, useRef, useState } from 'react';
import notecontext from '../context/notes/notescontext';
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';

export default function Notes() {
  const context = useContext(notecontext);
  const { notes, getNotes, edit } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edesc: "", etag: "" });
  let navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate("/home");
    } 
 
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  
  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({ id: currentnote._id, etitle: currentnote.title, edesc: currentnote.desc, etag: currentnote.tag });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("updating notes");
    edit(note.id, note.etitle, note.edesc, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  const todoNotes = notes.filter(note => note.tag === 'todo');
  const inProgressNotes = notes.filter(note => note.tag === 'in-progress');
  const doneNotes = notes.filter(note => note.tag === 'done');

  const handleDrop = (note, newTag) => {
  
    edit(note._id, note.title, note.desc, newTag);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Addnotes />

  
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>

      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edesc" name="edesc" value={note.edesc} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="row my-3">
        <div className="col-md-4">
          <h3>To-Do</h3>
          <Column tag="todo" notes={todoNotes} onDrop={handleDrop}>
            {todoNotes.map(note => (
              <Noteitem key={note._id} note={note} updatenote={updatenote} />
            ))}
          </Column>
        </div>
        <div className="col-md-4">
          <h3>In Progress</h3>
          <Column tag="in-progress" notes={inProgressNotes} onDrop={handleDrop}>
            {inProgressNotes.map(note => (
              <Noteitem key={note._id} note={note} updatenote={updatenote} />
            ))}
          </Column>
        </div>
        <div className="col-md-4">
          <h3>Done</h3>
          <Column tag="done" notes={doneNotes} onDrop={handleDrop}>
            {doneNotes.map(note => (
              <Noteitem key={note._id} note={note} updatenote={updatenote} />
            ))}
          </Column>
        </div>
      </div>
    </DndProvider>
  );
}
