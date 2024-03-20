import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  return(<p>{text}: {value}</p>)
}

const Statistics = ({good, neutral, bad, all}) => {
  
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
        <h2>Statistics</h2>
        < StatisticsLine text="Good" value={good} />
        < StatisticsLine text="Neutral" value={neutral} />
        < StatisticsLine text="Bad"  value={bad} />
        < StatisticsLine text="Average" value={ ((1)*good + (0)*neutral + (-1)*bad) / all } />
        < StatisticsLine text="Positive" value={ (good / all) * 100 + " %"} />
    </div>
  )

}

const App = () => {
  // state variable
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


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

  // main
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />      

    </div>
  )
}

export default App
