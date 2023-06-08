function CarInput(props){

  return (
    <div id='adding' style={{visibility:"hidden"}}>
      <input value={props.plate} onChange={e => props.setPlate(e.target.value)} className='inputs' type='text' placeholder="Plate"/>
      <input value={props.model} onChange={e => props.setModel(e.target.value)} className='inputs' type='text' placeholder="Model"/>
      <button id="submit-btn" onClick={() => {props.onSubmitClick()}}>Submit</button>
    </div>
  )
}

export default CarInput