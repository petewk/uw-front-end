import { useState, Fragment } from 'react';
import React from 'react'


function HouseSection({ house, quotes }){

    const colorScheme = '--' + house.slug;


    return (
    <div className={`houseCard ${colorScheme}`} id={house.slug}>
        <p className='houseTitle'>{house.name}</p>
        <ul className='houseMembers'>
            {
                house.members.map((member)=>{
                    

                    return (
                        <Fragment key={member.slug}>
                            <li className='houseMemberName'>{member.name}</li>
                            {
                                quotes.map((quote)=>{
                                    if(quote.character.slug === member.slug){
                                        return (
                                            <p key={quote.sentence}>{quote.sentence}</p>
                                        )
                                    }
                                })
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