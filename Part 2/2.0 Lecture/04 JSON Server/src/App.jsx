import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/Notes'

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
    noteService
      .getAll()
      .then(initialNotes  => {
        setNotes(initialNotes)
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

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  // handler importance
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
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
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
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