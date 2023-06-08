function CarSearch(props){


  return(
      <div id="search">
        <h2>Search using plate or model: </h2>
        <input className="inputs"
          value={props.searchBox} 
          onChange={(e) => props.setSearchBox(e.target.value)} 
        />
      </div>
  )
}

export default CarSearch;