import {findByTestId, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './src/App'


// function sum(a, b){
//     return a+b
// }


// test('1 plus 2 equals 3', ()=>{
//     expect(sum(1, 2)).toBe(3)
// })


test('Shows a default call to action with no quotes', ()=>{
    render(<App />)

    expect(screen.findByTestId('defaultPrompt')).toHaveTextContent('Play the Game of Quotes') 
})