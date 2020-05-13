import React from 'react'

const Course = ({course}) => (
    <>
        <Header course={course} />
        <Parts course={course} />
        <Total course={course} />
    </>
)

const Parts = ({course}) => (
    <>

        {course.parts.map(part => 
        <Part key={part.id} part={part} />
        )}
    </>
)

const Part = ({part}) => {
    return (
    <>
        <p>{part.name} {part.exercises}</p>
    </>
    )
}

const Header = ({course}) =>(
    <>
    <h1>{course.name}</h1>
    </>
)
//https://stackoverflow.com/questions/15748656/javascript-reduce-on-object i got the use of Object.values from here
const Total = ({course}) => {
    const total = Object.values(course.parts).reduce((t,{exercises}) => t + exercises,0)
    console.log(total,course.parts)
    return (
        <>
        <h3>total of {total} exercises</h3>
        </>
    )
}

export default Course;