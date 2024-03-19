// the file imports the useState function
import { useState } from 'react'

const App = () => {

  // useState() adds state to the component and renders it initialized with the value of zero.
  // Destructuring assignment syntax:
  //  - "counter" -> initial value of state which is zero.
  //  - "setCounter" -> function that will be used to modify the state.
  const [ counter, setCounter ] = useState(0)

  // setTimeout(function, timeout)
  // e.g. The setCounter() is invoked one second after calling the setTimeout()
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  console.log('rendering...', counter)

  return (
    <div>{counter}</div>
  )
}

export default App