import React, {useState, useEffect} from 'react';
import axios from 'axios';


function App() {
  const [search,setSearch] = useState('')
  const [country, setCountry] = useState([])
  const [information, setInformation] = useState("")
  const handleChange = (event) =>{
    console.log(event.target.value)
    setSearch(event.target.value)
    document.getElementById("weatherimg").src = ``
    document.getElementById("weather").innerHTML = ``
  }

const loadData = () =>{
  console.log("promise")
  axios.get(`https://restcountries.eu/rest/v2/name/${search}`).then(response =>{
    console.log("promise fulfilled")
    console.log("this is the response",response.data)
    setCountry(response.data)
  })
}
const loadInfo = () =>{
  const numb = country.length
  if (numb === 1){
    const pais =country[0]
    loadWeather(pais)
      return setInformation(<><h1>{pais.name}</h1>
      <p>capital {pais.capital}</p>
      <p>population {pais.population}</p>
      <h3>languages</h3>
      <ul>
      {pais.languages.map(lengua =><li key={lengua.iso639_2}>{lengua.name}</li>)}
      </ul>
      <img src={pais.flag} alt={`flag of ${pais.name}`}></img>
      <h4>Weather in {pais.capital}</h4>
      </>)
  }
  else if (numb < 11){
    return setInformation([country.map(count =>
    <li key={count.numericCode}>{count.name}<button onClick={() => setSearch(count.name)}>search</button></li>)])
    }
    else{
      return setInformation(`Too many options, use another filter`)
    }}

const loadWeather = (pais) =>{
const params = { access_key : process.env.REACT_APP_API_KEY,
query: pais.capital}
axios.get(`http://api.weatherstack.com/current`,{params})
.then(response =>{document.getElementById("weather").innerHTML = `temperature ${response.data.current.temperature}cº
 wind: ${response.data.current.wind_speed} mph direction ${response.data.current.wind_dir}`
document.getElementById("weatherimg").src = `${response.data.current.weather_icons}`})
}

useEffect(loadData,[search])
useEffect(loadInfo,[country])

  return (
    <div>
    find countries<input value={search} onChange={handleChange}/> 
    <div>{information}</div>
    <div id="weather"></div>
    <img id="weatherimg"></img>
    </div>
  );}


export default App;
