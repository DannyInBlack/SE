import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { doc, getDocs, collection, query, where, setDoc } from "firebase/firestore"; 
import { getDb } from "./firebase_setup/firebase"

function App() {

  const user = 'dan';

  const [data, setData] = useState([]);

  // document.getElementById("adding").style.display = "none";

  const onAddCarClick = () =>{
    let x = document.getElementById("adding");

    if(x.style.display == "none") x.style.display = "block"
    else x.style.display = "none"
    
  }

  


  const fetchCars = async () => {
    const collection_ref = collection(getDb(), "cars")
    const q = query(collection_ref, where("username", "==", user))
    const doc_refs = await getDocs(q);

    const res = []

    doc_refs.forEach(car => {
        res.push({
            id: car.id, 
            ...car.data()
        })
    })

    return res
  }
  

  useEffect(() => {
    fetchCars().then((data) => {
      setData(data);
    })
  }, [])

  const onSubmitClick = () => {
    let inputs = document.getElementsByClassName('inputs');
    let newCar = {}
    let plate = inputs[0].value
    newCar['model'] = inputs[1].value
    inputs[0].value = "";
    inputs[1].value = "";
    newCar['username'] = user
    const carsRef = doc(getDb(), 'cars', plate);
    setDoc(carsRef, newCar, { merge: true });
    fetchCars().then((data) => {
      setData(data);
    })
  }

  


  return (
    <>
      <h1>Cars</h1>
      
      <div id='main'>
        <div id='adding' style={{display:"none"}}>
          <input className='inputs' type='text' placeholder="Plate"/>
          <input className='inputs' type='text' placeholder="Model"/>
          <button onClick={() => onSubmitClick()}>Submit</button>
        </div>
       {data.map(wow => (
        <div key={wow.id} className="card">
        <p className='id'>Plate: {wow.id} </p>
        <p>Model: {wow.model}</p>
        </div>
       ))}
      </div>
      <h2><button id='addButton' onClick={() => onAddCarClick()} >Add Car</button></h2>
    </>
  )
}

export default App


// import './App.css';
// import handleSubmit from './handles';
// import { useRef } from 'react';
 
// function App() {
//   const dataRef = useRef()
 
//   const submithandler = (e) => {
//     e.preventDefault()
//     handleSubmit(dataRef.current.value)
//     dataRef.current.value = ""
//   }
 
//   return (
//     <div className="App">
//       <form onSubmit={submithandler}>
//         <input type= "text" ref={dataRef} />
//         <button type = "submit">Save</button>
//       </form>
//     </div>
//   );
// }
 
// export default App;
