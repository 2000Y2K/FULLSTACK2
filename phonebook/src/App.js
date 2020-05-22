import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Query from './components/HandleChange'
import ReactDOM from 'react-dom'
import phoneService from './services/phoneService'
import Message from './components/Message'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [NewNumb, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {phoneService.getAll()
    .then(response => setPersons(response))},[persons])
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
    const names = persons.map(person => person.name.toLocaleLowerCase())
    console.log("this is the names",names)
    if (names.includes(newName.toLocaleLowerCase())){
      const contact = persons.find(n => n.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
      console.log("this is contact",contact)
      const changedcontact = {...contact, number: NewNumb}
      if(window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)){
        phoneService.changeNumber(contact,changedcontact).catch(error =>{
          setMessage(`${newName} was already removed from the server`)
          setType("error")
          setTimeout(() => setMessage(""),4000)
        })
        setMessage(`${newName} number was change in the server`)
        setType("success")
        setTimeout(() =>{
          setMessage(null)
        },4000 )
        setNewName('')
        setNewNumber('')
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else{
    const personObject = {
      name: newName,
      number: NewNumb,
    }
    setPersons(persons.concat(personObject))
    setMessage(`${newName} was added to the server`)
    setType("success")
    setTimeout(() =>{
      setMessage(null)
    },4000 )
    phoneService.addPerson(personObject)
    console.log(names)
    console.log(persons)
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
    <Message message={message} type={type}></Message>
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

export default App;