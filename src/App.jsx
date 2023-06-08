import { Component, useEffect, useState } from 'react'
import {deleteDoc, doc, getDocs, collection, query, where, setDoc } from "firebase/firestore"; 
import { getDb } from "./firebase_setup/firebase"
import CarCard from './components/CarCard';
import CarInput from './components/CarInput';
import './App.css'


function App() {

  const user = 'dan';
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [cars, setCars] = useState([]);

  const onAddCarClick = () =>{
    let form = document.getElementById("adding");

    if(form.style.visibility == "hidden") form.style.visibility = ""
    else form.style.visibility = "hidden"
    
  }

  const fetchCars = () => {
    const collection_ref = collection(getDb(), "cars")
    const q = query(collection_ref, where("username", "==", user))

    getDocs(q).then(query =>
      setCars(
        query.docs.map(doc => {
          return { 
            id: doc.id, 
            ...doc.data()
          }
        })
      ) 
    );
  }

  const onSubmitClick = () => {
    const newCar = {
      'username': user,
      'model': model
    }
    const carsRef = doc(getDb(), 'cars', plate);
    setModel("");
    setPlate("");
    setDoc(carsRef, newCar, { merge: true }).then(() => fetchCars());
  }

  const onDeleteClick = (id) => {
    deleteDoc(doc(getDb(), "cars", id)).then(() => fetchCars());
  }

  // const onSearchClick = (id) => {
  //   let plate = document.getElementById("searchBar").value;

  //   console.log(plate)

  //   // const collection_ref = collection(getDb(), "cars")
  //   // const q = query(collection_ref, where("Document ID", "==", plate))
  //   // const doc_refs = await getDocs(q);

  // }
  useEffect(() => fetchCars(), [])

  return (
    <>
      <h1>Cars</h1>
      
      <div id='main'>
        <h2>Showing cars for user: {user}</h2>
        <CarInput
          {...{plate, setPlate, model, setModel, onSubmitClick}}
        />

        {/* <div id='adding' style={{visibility:"hidden"}}>
          <input value={plate} onChange={e => setPlate(e.target.value)} className='inputs' type='text' placeholder="Plate"/>
          <input value={model} onChange={e => setModel(e.target.value)} className='inputs' type='text' placeholder="Model"/>
          <button onClick={() => {onSubmitClick()}}>Submit</button>
        </div> */

        cars.map(car => {
        return <CarCard 
          key = {car.id}
          {...{...car, onDeleteClick}}
        />
        })
       }
      </div>
      <h2><button id='addButton' onClick={() => onAddCarClick()} >Add Car</button></h2>
    </>
  )
}

export default App
