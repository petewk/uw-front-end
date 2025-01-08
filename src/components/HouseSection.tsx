import React, { useState, Fragment } from 'react';


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


    function openCloseAccordion(e){
        if(e.target.nextElementSibling.nodeName === 'DIV'){
            e.target.nextElementSibling.classList.toggle('closed')
        }
    }

    return (
    <div className={`houseCard ${colorScheme}`} id={house.slug}>
        <p className='houseTitle'>{house.name}</p>
        <ul className='houseMembers'>

            {/* Map through each member of a given house and add them to the section as a clickable list item */}

            {
                house.members.map((member)=>{
                    

                    return (
                        <Fragment key={member.slug}>
                            <li onClick={openCloseAccordion} className='houseMemberName'>{member.name}</li>

                            {/* Filter through all the quotes and seperate out the ones which match this member */}

                            {
                                quotes.filter((quote:quoteElement)=>{
                                        return quote.character.slug === member.slug
                                    }).length > 0 ?

                                    // if that filter returns anything, map through them and put each quote into the accordion body 
                                    // Don't like this an awful lot because I'm filtering twice
                                    // TODO find a way to do this with just one filter

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
            
        </ul>

    </div>
    )
}


export default HouseSection;