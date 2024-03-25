import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  // stored notes
  const [notes, setNotes] = useState([])
  // new note
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  // displayed notes
  const [showAll, setShowAll] = useState(true)

  // Get notes
  const hook = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }
  
  useEffect(hook, [])

  // handler button
  const addNote = (event) => {

    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,  // server will create the "id" for us
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        // Add the new note
        setNotes(notes.concat(response.data))
        // Reset the string array for new notes
        setNewNote('')
      })    
  }

  // handler input text
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  // if showAll is true, then notesToShow= notes. Else, then the filter is apply.
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      {/* Title */}
      <h1>Notes</h1>
      
      {/* Toggle Filter */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      
      {/* Displayed Notes */}
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>

      {/* New Note */}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 