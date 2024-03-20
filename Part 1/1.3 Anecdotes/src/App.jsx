import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // state variable
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  // anecdotes
  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
    
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // handlers
  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(good + updatedNeutral + bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(good + neutral + updatedBad)
  }

  const handleAnecdotesClick = () => {
    const min= 0
    const max= anecdotes.length - 1
    // random integer between 0 and 8
    const updateSelected= Math.floor(Math.random() * (max - min + 1)) + min
    // update the display anecdote
    setSelected(updateSelected)
  }

  const handleVoteClick = () => {
    // create a copy of the matrix
    const updatedVotes = { ...votes }
    // add a vote to the selected anecdote
    updatedVotes[selected] += 1
    // update the matrix with the modified copy
    setVotes(updatedVotes)
  }

  // main
  return (
    <div>
      
      <h1>Vote anecdote</h1>
      {anecdotes[selected]}

      <br></br><br></br>
      <Button handleClick={handleVoteClick} text='Vote' />
      <Button handleClick={handleAnecdotesClick} text='Next' />
      <p>Has {votes[selected]} votes</p>

    </div>
  )
}

export default App