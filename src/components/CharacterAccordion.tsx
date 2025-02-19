import React, { useState, Fragment } from 'react';
import '../App.css'


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

  interface AccordionProps {
    characterQuotes: quoteElement[];
    member: HouseMemberType;
}

interface HouseMemberType {
    name: string;
    slug: string
}


function CharacterAccordion({characterQuotes, member}: AccordionProps){





      function openCloseAccordion(e:React.SyntheticEvent<HTMLElement>|null){
        if(e?.currentTarget?.nextElementSibling?.nodeName === 'DIV'){
            e?.currentTarget?.nextElementSibling?.classList.toggle('closed')
        }
        
    }

    const quoteMarkerArray = Array(characterQuotes.length).fill('.')


    return (
        <>
            <li onClick={openCloseAccordion} className='houseMemberName'>
                <span className='nameText'>{member.name}</span>
                
                {
                    quoteMarkerArray.map((dot, index)=>{
                        return <span key={index} className='quoteMarker'>&#x2022;</span>
                    })
                }
            </li>
            {
                characterQuotes.length > 0 ?

                <div className='accordionBody'>
                    <ul>
                        {
                            characterQuotes.map((value:quoteElement, index:number, array: quoteElement[])=>{
                                console.log()
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