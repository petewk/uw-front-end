import React, { useState, useEffect } from 'react'
import './App.css'
import HouseSection from './components/HouseSection.tsx'





function App() {

  interface house {
    name: string,
    slug: string
  }

  interface character {
    house: house,
    name: string,
    slug: string
  }

  interface quoteElement {
    character: character,
    sentence: string,
    slug: string,
    house: house
  }
  
  interface quoteElements extends Array<quoteElement>{}


  const [quotes, setQuotes] = useState<quoteElements>([]);
  const [currentQuote, setCurrentQuote] = useState<quoteElement>();
  const [houses, setHouses] = useState([]);


  useEffect(()=>{
    getHouses();
  })


    // Initial onLoad request to get all house info
  async function getHouses(){
    const result = await fetch ('https://api.gameofthronesquotes.xyz/v1/houses', {
      method: "GET"
    })
    const fetchedHouses = await result.json();
    setHouses(fetchedHouses)
  }


    // onPress function to retrieve the quote, add to array of all previous, and update current quote 
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
      console.log(currentQuote)
      setQuotes([...quotes, newjson])
    }
  }





  return (
    <div>
      {/* Section here displaying the most recent quote */}

      <div className='containerButtonQuote'>
       
          <div className='recentQuoteOuterBox'>
            <img src='./src/assets/pngegg.png' alt="" className='GoTLogo'/>
            <div className={`${'--' + currentQuote?.character.house.slug} mostRecentQuoteBox glow`}>
            {
              currentQuote ? 
              <>
                <p className='recentQuoteText'>{currentQuote.sentence}</p> 
                <p className='recentQuoteName'>~{currentQuote.character.name}~</p>

              </>
              : 
              <p className='defaultText'>Play the Game of Quotes</p>
            }
            </div>
            <img src='./src/assets/pngegg.png' alt="" className='GoTLogo' style={{transform: 'scale(-1, 1)'}}/>

          </div>
            

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
