const Hello = (props) => {
  console.log(props)
  return (
    <div>
      Hello {props.name}, you are {props.age} years old
    </div>
  )
}

const App = () => {
  
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <>
      <h1>Greetings</h1>
      <Hello name={friends[0].name} age={friends[0].age } />
      <Hello name={friends[1].name} age={friends[1].age} />
    </>
  )
}

export default App