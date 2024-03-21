// Elements
export const Header = ({title, Size}) => {
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

export default Course
