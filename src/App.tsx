import { useState, useEffect } from 'react'
import './App.css'
import HouseSection from './components/HouseSection.tsx'
import React from 'react';





function App() {

  interface quoteElement {
    character: object,
    sentence: string,
    slug: string,
    house: string
  }
  
  interface quoteElements extends Array<quoteElement>{}


  const [quotes, setQuotes] = useState<quoteElements>([]);
  const [currentQuote, setCurrentQuote] = useState<quoteElement>();
  const [houses, setHouses] = useState([]);


  useEffect(()=>{
    getHouses();
  })


  function flashHouse(houseSlug){
    console.log(houseSlug)
    const houseCard = document.getElementById(houseSlug);
    console.log(houseCard)
  }


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
    const newjson:quoteElement = await newobject.json();
    const hasDuplicate = quotes.some(element => element.sentence === newjson.sentence);
    if(hasDuplicate){
      console.log('duplicated')
      getQuote()
    } else {
      setCurrentQuote(newjson)
      setQuotes([...quotes, newjson])
    }
    flashHouse(currentQuote.character.house.slug)
  }





  return (
    <div>
      {/* Section here displaying the most recent quote */}

      <div className='containerButtonQuote'>
        {
          currentQuote ? 
          <div className={`${'--' + currentQuote.character.house.slug} mostRecentQuoteBox glow`}>
            <p className='recentQuoteText'>{currentQuote.sentence}</p> 
            <p className='recentQuoteName'>~{currentQuote.character.name}~</p>
          </div>
            
            : 
            <p className='defaultText'>Click the button for a line</p>
          }
          <button className='getQuoteButton' onClick={getQuote}>Click for a Quote</button>
      </div>
      
      {/* Box below containing houses which will flex grow on hover */}

      <div className='containerHouses'>
        {
          houses?.length > 0 &&
          houses.map((house:quoteElement)=>{
            return (
              <HouseSection house={house} quotes={quotes} key={house.slug}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default App