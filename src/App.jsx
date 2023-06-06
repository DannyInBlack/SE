import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import {deleteDoc, doc, getDocs, collection, query, where, setDoc } from "firebase/firestore"; 
import { getDb } from "./firebase_setup/firebase"

function App() {

  const user = 'dan';

  const [cars, setCars] = useState([]);

  // document.getElementById("adding").style.visibility = "hidden";

  const onAddCarClick = () =>{
    let form = document.getElementById("adding");

    if(form.style.visibility == "hidden") form.style.visibility = ""
    else form.style.visibility = "hidden"
    
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

  const fetch = () =>{
    fetchCars().then((data) => {
      setCars(data);
    })
  }

  
  useEffect(() => {
    const interval = setInterval(() => {
      fetch()
    }, 3000);
    return () => clearInterval(interval);
  }, []);
    

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
    fetch()
  }


  const onDeleteClick = (id) => {
    deleteDoc(doc(getDb(), "cars", id));
    fetch()
  }


  // const onSearchClick = (id) => {
  //   let plate = document.getElementById("searchBar").value;

  //   console.log(plate)

  //   // const collection_ref = collection(getDb(), "cars")
  //   // const q = query(collection_ref, where("Document ID", "==", plate))
  //   // const doc_refs = await getDocs(q);

  // }

  


  return (
    <>
      <h1>Cars</h1>
      
      <div id='main'>
        <h2>Showing cars for user: {user}</h2>

        <div id='adding' style={{visibility:"hidden"}}>
          <input className='inputs' type='text' placeholder="Plate"/>
          <input className='inputs' type='text' placeholder="Model"/>
          <button onClick={() => onSubmitClick()}>Submit</button>
        </div>
        {/* <div>
          <input id='searchBar' className='search' type='text' placeholder='Search By Car Plate'></input>
          <button onClick={() => onSearchClick()}>Search</button>
        </div> */}
       {cars.map(wow => (
        <div key={wow.id} className="card">
        <p className='id'>Plate: {wow.id} </p>
        <p>Model: {wow.model}</p>
        <button onClick={() => onDeleteClick(wow.id)}>Delete</button>
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
