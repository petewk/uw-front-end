import React, { useState, Fragment } from 'react';
import CharacterAccordion from './CharacterAccordion';



interface House {
    name: string,
    slug: string,
    members: Character[];
  }

  interface Character {
    house: House,
    name: string,
    slug: string
  }

  interface QuoteElement {
    character: Character,
    sentence: string,
    slug: string,
    house: House
  }

interface HouseSectionProps {
    house: House;
    quotes: QuoteElement[];
}

function HouseSection({ house, quotes }:HouseSectionProps){

    const colorScheme = '--' + house.slug;
    
    
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




    return (
        <div className="HouseSectionWrapper">
            <div data-testid="HouseSection" className={`houseCard ${colorScheme}`} id={house.slug}>
                <p className='houseTitle'>{house.name}</p>


                {/* Rebuilding this with the character accordion section  */}
                {/* Render accordion component for each character, with the array of their quotes passed as a prop */}

                {
                    house.members.map((member:character)=>{
                        
                        const characterQuotes:quoteElement[] = [] 
                        quotes.filter((quote:quoteElement)=>{
                            if(quote.character.slug === member.slug){
                                characterQuotes.push(quote)
                            }
                        })


                        return(
                            <CharacterAccordion characterQuotes={characterQuotes} member={member} key={member.slug}/>
                        )
                    })
                }

            </div>
        </div>
    )
}


export default HouseSection;