import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  return(
    // new row
    <tr>
      {/* 1st column */}
      <td> {text}  </td>
      {/* 2nd column */}
      <td> {value} </td>
    </tr>
    )
}

const Statistics = ({good, neutral, bad, all}) => {
  
  // No feedback yet
  if (all === 0) 
  {
    return(
      <div>
        <h2>Statistics</h2>
          No feedback given
      </div>
    )    
  }  

  return(
    <div>
        {/* Header */}
        <h2>Statistics</h2>
        
        {/* Table */}
        <table>
          <tbody>
            < StatisticsLine text="Good" value={good} />
            < StatisticsLine text="Neutral" value={neutral} />
            < StatisticsLine text="Bad"  value={bad} /> 
            < StatisticsLine text="Average" value={ ((1)*good + (0)*neutral + (-1)*bad) / all } />
            < StatisticsLine text="Positive" value={ (good / all) * 100 + " %"} />
          </tbody>
        </table>

    </div>
  )

}

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

    setSelected(updateSelected)
  }

  // main
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />    
      
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />

      <h1>Give anecdote</h1>
      {anecdotes[selected]}

      <br></br><br></br>

      <Button handleClick={handleAnecdotesClick} text='Next' />
      
    </div>
  )
}

export default App
