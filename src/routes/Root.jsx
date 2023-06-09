import { Component, useEffect, useState } from 'react'
import {deleteDoc, doc, getDocs, collection, query, where, setDoc } from "firebase/firestore"; 
import { getDb } from "../firebase_setup/firebase"
import CarCard from '../components/CarCard';
import CarInput from '../components/CarInput';
import '../styles/root.css';
import CarSearch from '../components/CarSearch';


function Root() {

  const user = 'dan';
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [searchBox, setSearchBox] = useState("");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const onAddCarClick = () =>{
    let form = document.getElementById("adding");

    form.style.visibility = form.style.visibility == "hidden" ? "" : "hidden"
    
  }

  const fetchCars = () => {
    const collection_ref = collection(getDb(), "cars")
    const q = query(collection_ref, where("username", "==", user))

    getDocs(q).then(query =>{
      setCars(
        query.docs.map(doc => {
          return { 
            plate: doc.id, 
            ...doc.data()
          }
        })
      );
    });
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

  const searchMethod = (car) => {
    let plate = car.plate.toLowerCase();
    let model = car.model.toLowerCase();
    let search = searchBox.toLowerCase();

    return plate.includes(search) || model.includes(search)
  }

  useEffect(() => {
    setFilteredCars(
      cars.filter(car => searchMethod(car))
    )
  }, [searchBox, cars])


  useEffect(() => fetchCars(), [])

  return (
    <>
      <h1>Cars</h1>
      <h2><button id='addButton' onClick={() => onAddCarClick()} >Add Car</button></h2>
      <CarSearch {...{searchBox, setSearchBox}} />
      <div id='main'>
        <h2>Showing cars for user: {user}</h2>
        <CarInput {...{plate, setPlate, model, setModel, onSubmitClick}} />

        {
          filteredCars.map(car => {
              return <CarCard key = {car.plate}{...{...car, onDeleteClick}}/> 
          }) 
        }
      </div>
    </>
  )
}

export default Root
