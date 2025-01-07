import React, { useState, Fragment } from 'react';


function HouseSection({ house, quotes }){

    const colorScheme = '--' + house.slug;


    function openCloseAccordion(e){
        e.target.firstElementChild.classList.toggle('closed')
    }

    return (
    <div className={`houseCard ${colorScheme}`} id={house.slug}>
        <p className='houseTitle'>{house.name}</p>
        <ul className='houseMembers'>
            {
                house.members.map((member)=>{
                    

                    return (
                        <Fragment key={member.slug}>
                            <li onClick={openCloseAccordion} className='houseMemberName'>{member.name}</li>
                            {
                                quotes.filter((quote:object)=>{
                                        return quote.character.slug === member.slug
                                    }).length > 0 ?

                                    <div className='accordionBody'>
                                        <ul>
                                            {
                
                                                quotes.filter((quote:object)=>{
                                                    return quote.character.slug === member.slug
                                                })?.map((value:object)=>{
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