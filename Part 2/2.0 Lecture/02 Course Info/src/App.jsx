// Elements
const Header = ({title, Size}) => {
  
  return (
    <div>
        <Size>{title}</Size>
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
  
  const total= contents.reduce((sum, content) => sum + content.exercises, 0)
  
  return (
    
      <div>
        <b>Number of exercises {total}</b>    
      </div>
  )
}

const Course = ({course}) => {
  
  return (
    <div>
      <Header title={course.name} Size="h2" />
      <Content contents={course.parts} />
      <Total contents={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    
    <div>
      {/* Main title */}
      <Header title="Web development curriculum" Size="h1"/>
      
      {/* Courses info */}
      { courses.map( (course) => 
          <Course key={course.id} course={course} /> 
      )}

    </div>
  )
}

export default App