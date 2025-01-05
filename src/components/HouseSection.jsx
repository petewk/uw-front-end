import { useState, Fragment } from 'react';


function HouseSection({ house, quotes }){


    return (
    <div className='houseCard'>
        <p className='houseTitle'>{house.name}</p>
        <ul className='houseMembers'>
            {
                house.members.map((member)=>{
                    

                    return (
                        <Fragment key={member.slug}>
                            <li >{member.name}</li>
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