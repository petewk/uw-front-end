
import React from 'react';
import { shallow } from 'enzyme'
import App from './App';
import HouseSection from './src/components/HouseSection';


function sum(a, b) {
    return a + b;
  }

describe('example test',()=>{
    test('adds 1+2 to equal 3', ()=>{
        expect(sum(1,2)).toBe(3)
    })
})


describe('Testing the app', ()=>{
    let wrapper; 

    beforeEach(()=>{
        wrapper = shallow(<App />)
    })


    describe('Component validation', ()=>{
        it('should list 14 houses', ()=>{
            expect(wrapper.find(HouseSection)).to.have.lengthOf(14)
        })
    })
})