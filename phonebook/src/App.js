import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Query from './components/HandleChange'
import axios from 'axios'
import { render } from '@testing-library/react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [NewNumb, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(response =>{
      setPersons(response.data)
    })
   },
  []
  )
  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleChange1 = (event) => {
    setNewNumber(event.target.value)
  }
  const handleChange2 = (event) => {
    setSearch(event.target.value)
    console.log("this is the search ",search)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log(persons)
    const names = persons.map(person => person.name)
    console.log(names)
    if (names.includes(newName)){
      window.alert(`${newName} is already added to phonebook`);
      setNewName('')
      setNewNumber('')
    }
    else{
    const personObject = {
      name: newName,
      number: NewNumb,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
}
const showSearch = (event) => {
  event.preventDefault()
  console.log("this is showSearch",search)
   const obj = persons.find(n => n.name.toLocaleLowerCase() === search.toLocaleLowerCase())
   const found = {...obj}
   console.log(found)
   if (obj !== undefined){
    ReactDOM.render(`${obj.name} ${obj.number}`,document.getElementById("query"));
    setSearch("")}
    else {
      ReactDOM.render(`${search} is not in the phonebook`,document.getElementById("query"));
      setSearch("") 
    }
   }


  return (
    <>
    <h1>Phonebook</h1>
    <Query showSearch={showSearch} search={search} handleChange={handleChange2}></Query>
      <h2>add a new</h2>
      <form onSubmit={addName} >
        <div>
          name: <input
          value={newName}
          onChange={handleChange} />
        </div>
        <div>
          number: <input
          value={NewNumb}
          onChange={handleChange1} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons}></Persons>
      </div>
      </>
  )
}

export default App