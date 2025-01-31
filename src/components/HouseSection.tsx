import React, { useState, Fragment } from 'react';
import CharacterAccordion from './CharacterAccordion';


function HouseSection({ house, quotes }){

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



                {/* <ul className='houseMembers'>

                
                    {
                        house.members.map((member)=>{
                            

                            return (
                                <Fragment key={member.slug}>
                                    <li onClick={openCloseAccordion} className='houseMemberName'>{member.name}</li>

                                

                                    {
                                        quotes.filter((quote:quoteElement)=>{
                                                return quote.character.slug === member.slug
                                            }).length > 0 ?
                                           
                                            <div className='accordionBody'>
                                                <ul>
                                                    {
                        
                                                        quotes.filter((quote:quoteElement)=>{
                                                            return quote.character.slug === member.slug
                                                        })?.map((value:quoteElement)=>{
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

                                </Fragment>
                            )
                        })
                    }
                    
                </ul> */}

            </div>
        </div>
    )
}


export default HouseSection;