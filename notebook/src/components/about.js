import React,{useContext} from 'react'
import notecontext from '../context/notes/notescontext'

export default function About() {
  const a=useContext(notecontext);
  return (
    <div>about {a.name}</div>
  )
}
