import React from 'react'

const notificationStyle ={
    color:'purple',
    fontSize:20,
    padding:10,
    marginBottom:10}
const Query = ({showSearch,search,handleChange}) =>
(
<>
<form onSubmit={showSearch} >
<div style={notificationStyle}>
filter shown with: <input
value={search}
onChange={handleChange}></input>
<button type="submit">search</button>
</div>
</form>
</>
)


export default Query;