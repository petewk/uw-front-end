import React, { useState, useEffect } from 'react'
import HouseSection from './components/HouseSection.tsx'
import './App.css'
import AppMain from './components/AppMain.tsx'
import SignInScreen from './components/SignInModal.tsx'





function App() {

  const [signedIn, setSignedIn] = useState(false);


  return (
    <>
    {
      signedIn? 
        <AppMain />
        :
        <SignInScreen signedIn={signedIn} setSignedIn={setSignedIn}/>
    }
    </>
  )
}

export default App

