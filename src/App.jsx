import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {

  const user = '1234';

  const [data, setData] = useState([]);

  // document.getElementById("adding").style.display = "none";

  const onAddCarClick = () =>{
    let x = document.getElementById("adding");

    if(x.style.display == "none") x.style.display = "block"
    else x.style.display = "none"
    
  }

  const onSubmitClick = async () => {
    const {wow} = await axios.post('https://httpbin.org/post', 
    {
      firstName: 'Fred',
      lastName: 'Flintstone',
      orders: [1, 2, 3]
    }, 
    {
      headers: 
      {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(wow)
  }

  const fetchCars = () => {
    axios.get('http://localhost:80/software/dbh.php?user=' + user)
    .then((response) => {
      return response['data'];
    })
    .then(data => setData(data))
  }

  useEffect(() =>{
     fetchCars()
  }, []);


  return (
    <>
      <h1>Cars</h1>
      
      <div id='main'>
        <div id='adding' style={{display:"none"}}>
          <input type='text' placeholder="Plate"/>
          <input type='text' placeholder="Model"/>
          <button onClick={() => onSubmitClick()}>Submit</button>
        </div>
       {data.map(wow => (
        <div className="card">
        <p className='id'>Plate: {wow.Plate} </p>
        <p>Model: {wow.Model}</p>
        </div>
       ))}
      </div>
      <h2><button id='addButton' onClick={() => onAddCarClick()} >Add Car</button></h2>
    </>
  )
}

export default App
