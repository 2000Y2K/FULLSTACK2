import React from 'react'

const Query = ({showSearch,search,handleChange}) =>(
    <>
<form onSubmit={showSearch} >
<div>
filter shown with: <input
value={search}
onChange={handleChange}></input>
<button type="submit">search</button>
</div>
</form>
</>
)


export default Query;