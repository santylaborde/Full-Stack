import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  // click handler
  const handleClick = () => {    
    console.log('clicked')
    setCounter(counter + 1)
  }

  return (
    <div>
      <div>{counter}</div>

      {/* increment counter */}
      <button onClick={handleClick}>
        plus
      </button>

      {/* reset counter */}
      <button onClick={() => setCounter(0)}>
        zero
      </button>

    </div>
  )
}

export default App