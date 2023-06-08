
function CarCard(props){

  return (
    <div key={props.id} className="card">
      <p className='id'>Plate: {props.plate} </p>
      <p>Model: {props.model}</p>
      <button className="delete" onClick={() => props.onDeleteClick(props.plate)}>Delete</button>
    </div>
  )
}

export default CarCard;