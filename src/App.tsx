import React, { useState, useEffect } from 'react'
import HouseSection from './components/HouseSection.tsx'
import './App.css'
import AppMain from './components/AppMain.tsx'
import SignInScreen from './components/SignInModal.tsx'





function App() {

  const [signedIn, setSignedIn] = useState(false);
  
  const [userId, setUserId] = useState('');
  const [usersHouse, setUsersHouse] = useState('')


  return (
    <>
    {
      signedIn? 
        <AppMain userId={userId} usersHouse={usersHouse} />
        :
        <SignInScreen setUserId={setUserId} setUsersHouse={setUsersHouse} signedIn={signedIn} setSignedIn={setSignedIn}/>
    }
    </>
  )
}

export default App

