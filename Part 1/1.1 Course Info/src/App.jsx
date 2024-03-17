const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.content[0].part} {props.content[0].exercises}
      </p>
      <p>
        {props.content[1].part} {props.content[1].exercises}
      </p>
      <p>
        {props.content[2].part} {props.content[2].exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.excercise[0].exercises + props.excercise[1].exercises + props.excercise[2].exercises}</p>
    </div>
  )
}

const App = () => {
  // const-definitions
  // For header
  const course = 'Half Stack application development'
  // For content and total
  const content = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 },
  ]

  return (
    <>
      <Header course={course} />
      <Content content={content} />
      <Total excercise={content} />
    </>
  )
}

export default App