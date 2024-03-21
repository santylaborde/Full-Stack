// Elements
const Header = ({title}) => {
  
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Part = ({content}) => {
  return(
    <div>
      <p>
        {content.name} {content.exercises}
      </p>
    </div>
  )
}

const Content = ({contents}) => {

  return (
    <div>

      {/* Dynamic mapping of parts */}
      { contents.map(content => 
        <Part key={content.id} content={content} />                  
      )}

    </div>
  )
}

const Total = ({contents}) => {
  
  const total= contents.reduce(function(sum, content) {return sum + content.exercises}, 0)
  
  return (
    
      <div>
        <p>Number of exercises {total}</p>    
      </div>
  )
}

const Course = ({course}) => {
  
  return (
    <div>
      <Header title={course.name} />
      <Content contents={course.parts} />
      <Total contents={course.parts} />
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App