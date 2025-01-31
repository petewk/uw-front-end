import React from 'react'
import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'

import App from './src/App'
import HouseSection from './src/components/HouseSection';
import * as Data from './data-2025029132723.json';



const server = setupServer(
    http.get('https://api.gameofthronesquotes.xyz/v1/houses', ()=>{

        return HttpResponse.json(Data)
    })
)
4
beforeAll(() => server.listen())

test('Shows a default call to action with no quotes', ()=>{
    render(<App />)

    const element = screen.getByTestId('defaultPrompt');
    expect(element).toHaveTextContent('Play the Game of Quotes')
})


test('Should show app rendering 14 sections for the different houses', async()=>{
    render(<App />)


    const testComponents = await screen.findAllByTestId('TestComponent');
    const houseSections = await screen.findAllByTestId('HouseSection');
    console.log(houseSections);

    expect(testComponents.length).toBe(6)
})