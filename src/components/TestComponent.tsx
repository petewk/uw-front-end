import React, { useState, Fragment } from 'react';


function TestComponent({word}){
    return (
        <p data-testid='TestComponent'>{word}</p>
    )
}


export default TestComponent;