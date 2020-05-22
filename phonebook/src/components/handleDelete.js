import phoneService from '../services/phoneService'

const handleDelete = ({person}) =>{
    console.log(person)
    if (!person){
    }
    else if (window.confirm(`Delete ${person.name}`)){
         phoneService.deletePerson(person);
    }
  }

export default handleDelete;