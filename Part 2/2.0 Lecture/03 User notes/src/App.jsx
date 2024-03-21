import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  // stored notes
  const [notes, setNotes] = useState(props.notes)
  // new note
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 

  // handler button
  const addNote = (event) => {
    event.preventDefault()

    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    
    // Add the new note
    setNotes(notes.concat(noteObject))
    // Reset the string array for new notes
    setNewNote('')
  }
  
  // handler input text
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 