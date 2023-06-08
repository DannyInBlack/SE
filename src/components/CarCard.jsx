
function CarCard(props){

  return (
    <div key={props.id} className="card">
      <p className='id'>Plate: {props.id} </p>
      <p>Model: {props.model}</p>
      <button onClick={() => props.onDeleteClick(props.id)}>Delete</button>
    </div>
  )
}

export default CarCard;