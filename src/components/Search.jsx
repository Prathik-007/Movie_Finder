import React from 'react'

function Search( propes ) {
    
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />
        <input type="text" placeholder='Any Movie In Mind...' value={propes.searchTerm}
        onChange={(e)=> propes.setSearchTerm(e.target.value)}/>
      </div>
    </div>
  )
}

export default Search
