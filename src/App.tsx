import React, { useState, useEffect, useContext } from 'react'
import HouseSection from './components/HouseSection.tsx'
import './App.css'
import AppMain from './components/AppMain.tsx'
import SignInScreen from './components/SignInModal.tsx'

import { AuthContext } from './components/AuthContextProvider.tsx'




function App() {

  const { signedIn } = useContext(AuthContext)
  const isLoaded = true



  return (
    <>
    {
      isLoaded?
        signedIn? 
          <AppMain/>
          :
          <SignInScreen/>
          :
          null
    }
    </>
  )
}

export default App

