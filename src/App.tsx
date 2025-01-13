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
    try {

      const result = await fetch ('https://api.gameofthronesquotes.xyz/v1/houses', {
        method: "GET"
      })
      if(!result.ok){
        window.alert(`Response Status: ${result.status}`)
      }
  
      const fetchedHouses = await result.json();
      setHouses(fetchedHouses)
    } catch(error){
      console.error(error.message)
    }
    
  }

  // Three functions here which handle how to highlight elements on screen, depending on whether or not the box to be highlighted is within scroll view
  

  function boxIsVisible(id:string):boolean{
    let elementTop:number|undefined = document.getElementById(id)?.getBoundingClientRect().top;
    let screenHeight:number = window.innerHeight;
    return elementTop! <= screenHeight;

    // QUESTION: should I be using this non null assertion, if not then how to avoid it? Same problem is in the flashScreenBottom function below
  }


  function flashHouseBox(slug:string){
    const houseBox:HTMLElement| null = document.querySelector(`#${slug}`)
    houseBox!.classList.toggle('glow') 
  }

  function flashScreenBottom(slug:string){
    const bottomBorder:HTMLElement| null = document.querySelector('#bottomBorder');
    bottomBorder.style.boxShadow = `0px -5px 13px 10px var(--${slug})`;
    setTimeout(()=>{
      bottomBorder.style.boxShadow = ``;
    }, 1000)
    flashHouseBox(slug)
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

      // remove glow from all elements
      const glowing:Element[] = Array.from(document.querySelectorAll('.glow'));
      glowing.forEach((node)=>{
        node.classList.remove('glow')
      })
      
      // set the current quote and adds to array
      setCurrentQuote(newjson)
      setQuotes([...quotes, newjson])
      const houseSlug:string = newjson.character.house.slug;

      // handle the flash of relevant house, or if it's off the bottom of the screen, glow the bottom edge
      if(boxIsVisible(houseSlug)){
        flashHouseBox(houseSlug)
      } else {
        flashScreenBottom(houseSlug)
      }
    }
  }





  return (
    <>
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

      {/* // bottom border to glow colour of hidden houses */}
      <div className='bottomBorder' id='bottomBorder'></div>
    </>
  )
}

export default App
