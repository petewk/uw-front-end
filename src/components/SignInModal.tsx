import React, { useState, useEffect } from 'react'
import '../App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";





function SignInScreen({signedIn, setSignedIn}){


    const key = import.meta.env.VITE_FIREBASE_KEY;


    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: key,
      authDomain: "uw-got.firebaseapp.com",
      projectId: "uw-got",
      storageBucket: "uw-got.firebasestorage.app",
      messagingSenderId: "129264600580",
      appId: "1:129264600580:web:6f803527e668df370e5751"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('');

    function moveBox(direction: string | undefined){
        console.log(direction)
    }
    
    function signIn(event){
        event.preventDefault();
        signInWithEmailAndPassword(auth, userName, passWord)
            .then((userCredential)=>{
                if(userCredential){
                    const user = userCredential
                    setSignedIn(true)
                }
            })
            .catch((error) => {
                if(error == 'FirebaseError: Firebase: Error (auth/invalid-credential).'){
                    console.log('bad login details, check again')
                }
                const errorCode = error.code;
                const errorMessage = error.message;
              });
    }
    
    function registerAccount(event){
        event.preventDefault()
        console.log(userName, passWord)
        createUserWithEmailAndPassword(auth, userName, passWord)
            .then((userCredential) => {
                // Signed up 
                if(userCredential){
                    const user = userCredential.user;
                    console.log(user)
                }
            })
            .catch((error) => {
                if(error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).'){
                    console.log('email already registered, handle this')
                }
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    function handleEmailChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    return (
        <div className='signInFullScreen'>
            <div className='authContainer'>
                <div className='authTopButtons'>
                    <button onClick={()=>{moveBox('right')}}>Log In</button>
                    <button onClick={()=>{moveBox('left')}}>Register</button>
                </div>
                <div className='authBox'>
                    <div className='authBoxSection signInBox'>
                        <p className='authFormName'>Sign in going here</p>
                        <form onSubmit={signIn}>
                        <label>
                                E-mail:
                                <input onChange={handleEmailChange} placeholder='e-mail' type='email'></input>
                            </label>
                            <br />
                            <label>
                                Password
                                <input onChange={handlePasswordChange} placeholder='password' type='password'></input>
                            </label>
                            <br />
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                    <div className='authBoxSection registerBox'>
                        <p className='authFormName'>Register going here</p>
                        <form onSubmit={registerAccount}>
                            <label>
                                E-mail:
                                <input onChange={handleEmailChange} placeholder='e-mail' type='email'></input>
                            </label>
                            <br />
                            <label>
                                Password
                                <input onChange={handlePasswordChange} placeholder='password' type='password'></input>
                            </label>
                            <br />
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignInScreen;