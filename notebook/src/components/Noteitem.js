import React, { useContext } from 'react';
import notecontext from '../context/notes/notescontext';
import { useDrag } from 'react-dnd';

export default function Noteitem(props) {
  const context = useContext(notecontext);
  const { delt } = context;
  const { note, updatenote } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'note',
    item: { id: note._id, note },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="col-md-3" style={{ opacity: isDragging ? 0.5 : 1 ,cursor:'move',width:'2000' }}>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.desc}</p>
          <i className="far fa-trash-alt" onClick={() => delt(note._id)}></i>
          <i className="far fa-edit mx-2" onClick={() => updatenote(note)}></i>
        </div>
      </div>
    </div>
  );
}
