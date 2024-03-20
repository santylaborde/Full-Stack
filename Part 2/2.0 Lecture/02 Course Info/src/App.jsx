// Elements
const Header = ({title}) => {
  
  return (
    <div>
      <h1>{title}</h1>
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

const Course = ({course}) => {
  
  return (
    <div>
      <Header title={course.name} />
      <Content content={course.parts} />
      {/* <Total excercise={course.parts} /> */}
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App