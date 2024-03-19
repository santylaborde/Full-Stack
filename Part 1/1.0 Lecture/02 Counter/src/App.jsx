import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  // handlers
  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>

      {/* increment counter */}
      <button onClick={increaseByOne}>
        plus
      </button>

      {/* reset counter */}
      <button onClick={setToZero}>
        zero
      </button>

    </div>
  )
}

export default App