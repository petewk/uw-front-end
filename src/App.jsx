import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HouseSection from './components/housesection'





function App() {
  const [quotes, setQuotes] = useState([]);
  const [houses, setHouses] = useState([]);




  useEffect(()=>{
    getHouses();
  })


  async function getHouses(){
    const result = await fetch ('https://api.gameofthronesquotes.xyz/v1/houses', {
      method: "GET"
    })
    const fetchedHouses = await result.json();
    setHouses(fetchedHouses)
  }


  async function getQuote(){
    const newobject = await fetch('https://api.gameofthronesquotes.xyz/v1/random', {
      method: "GET"
    })
    const newjson = await newobject.json();
    const hasDuplicate = quotes.some(element => element.sentence === newjson.sentence);
    if(hasDuplicate){
      getQuote()
    } else {
      setQuotes([...quotes, newjson])
    }
  }





  return (
    <div>
      <button onClick={getQuote}>Get Quote</button>

      {
        houses?.length > 0 &&
        houses.map((house)=>{
          return (
            <HouseSection house={house} quotes={quotes} key={house.slug}/>
          )
        })
      }
    </div>
  )
}

export default App
