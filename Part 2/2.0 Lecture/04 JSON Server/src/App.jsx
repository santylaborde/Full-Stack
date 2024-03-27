import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notificaction'
import noteService from './services/Notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  /* STATE VARIABLES */
  // stored notes
  const [notes, setNotes] = useState([])
  // new note
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  // displayed notes
  const [showAll, setShowAll] = useState(true)
  // error message
  const [errorMessage, setErrorMessage] = useState('some error happened...')

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
      .catch(error => {
        console.log();
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
        setNotes(notes.filter(n => n.id !== id))
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
      <Notification message={errorMessage} />
      
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

      <Footer />
      
    </div>
  )
}

export default App 