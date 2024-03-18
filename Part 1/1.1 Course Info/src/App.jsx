// Elements
const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log("Here!")
  console.log(props)
  return(
    <div>
      <p>
        {props.content.name} {props.content.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part content={props.content[0]} />
      <Part content={props.content[1]} />
      <Part content={props.content[2]} />
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


// Root element
const App = () => {
  // const-definitions
  // For header
  const course = 'Half Stack application development'
  // For content and total
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ]

  return (
    <>
      <Header course={course} />
      <Content content={parts} />
      <Total excercise={parts} />
    </>
  )
}

export default App