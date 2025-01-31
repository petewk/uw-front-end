import React, { useState, Fragment } from 'react';
import '../App.css'


function CharacterAccordion({characterQuotes, member}){

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

      function openCloseAccordion(e){
        if(e.target.nextElementSibling.nodeName === 'DIV'){
            e.target.nextElementSibling.classList.toggle('closed')
        }
        console.log(quoteMarkerArray)
        
    }

    const quoteMarkerArray = Array(characterQuotes.length).fill('.')


    return (
        <>
            <li onClick={openCloseAccordion} className='houseMemberName'>
                <span className='nameText'>{member.name}</span>
                
                {
                    quoteMarkerArray.map((dot)=>{
                        return <span className='quoteMarker'>&#x2022;</span>
                    })
                }
            </li>
            {
                characterQuotes.length > 0 ?


                                            
                // if that filter returns anything, map through them and put each quote into the accordion body 
                // Don't like this an awful lot because I'm filtering twice
                // TODO find a way to do this with just one filter

                <div className='accordionBody'>
                    <ul>
                        {
                            characterQuotes.map((value:quoteElement)=>{
                                return (
                                    <li className="quoteText" key={value.sentence}>{value.sentence}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                   :
                null
                                            
            }
            <br></br>
        
        </>
    )
}

export default CharacterAccordion;