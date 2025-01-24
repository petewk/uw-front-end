import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './src/App';




// function plus1(){
//   return 1+1
// }

// test('plus 1', ()=>{
//   expect(plus1()).toBe(2)
// })

test('testing the main App component', ()=>{
  it('displays a prompt before any quotes retrieved', ()=>{
    const {queryByTestId} = render(<App />);
    const promptExists = !!queryByTestId('defaultPrompt')
    expect(promptExists).toBe(true)
  })
})
