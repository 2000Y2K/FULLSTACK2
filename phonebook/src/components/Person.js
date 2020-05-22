import React from 'react'
import handleDelete from './handleDelete'

const Person = ({person}) => 
  (
  <>
  <p>{person.name} {person.number}  <button onClick={() => handleDelete({person})}>delete</button></p>
  </>
)
export default Person; 