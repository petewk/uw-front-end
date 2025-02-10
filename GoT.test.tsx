import React from 'react'
import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './src/App'
import HouseSection from './src/components/HouseSection';
import * as Data from './data-2025029132723.json';






test('Shows a default call to action with no quotes', ()=>{
    render(<App />)

    const element = screen.getByTestId('defaultPrompt');
    expect(element).toHaveTextContent('Play the Game of Quotes')
})


test('Should show app rendering 14 sections for the different houses', async()=>{

    global.fetch = jest.fn(()=>{
        return Promise.resolve({
                'ok': true,
                'json': ()=>Data
            
        })
        
    })as jest.Mock

    render(<App />)

    const houseSections = await screen.findAllByTestId('HouseSection');
    console.log(houseSections);

    expect(houseSections.length).toBe(14)
})