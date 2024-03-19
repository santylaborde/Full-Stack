import { useState } from 'react'

const App = () => {
  // state variable
  const [clicks, setClicks] = useState({ left: 0, right: 0 })

  // handlers
  const handleLeftClick = () => {
    setClicks({...clicks, left:  clicks.left + 1})
  }

  const handleRightClick = () => {
    setClicks({...clicks, right: clicks.right + 1})
  }

  // main
  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}

export default App
