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
    
    
    function handleSignInRegister(buttonType){
        switch(buttonType ){
            case 'register':
                createUserWithEmailAndPassword(auth, userName, passWord)
                    .then((userCredential) => {
                        // Signed up 
                        if(userCredential){
                            const user = userCredential.user;
                            console.log(user)
                        }
                    })
                    .catch((error) => {
                        handleFirebaseError(error)
                    });
                    break;
            case 'login' :
                console.log('logging in')
                signInWithEmailAndPassword(auth, userName, passWord)
                    .then((userCredential) => {
                        // Signed up 
                        if(userCredential){
                            const user = userCredential.user;
                            console.log(user)
                            setSignedIn(true)
                        }
                    })
                    .catch((error) => {
                        handleFirebaseError(error)
                    });
                    break;
        }
    }

    function handleFirebaseError(error){
        switch(error.code){
            case 'auth/invalid-email':
                console.log('problem with your login email')
                break;

            case 'auth/invalid-credential':
                console.log('problem with your password')
                 break;

            case 'auth/email-already-in-use':
                console.log('you already have an account');
                break;

            case 'auth/too-many-requests':
                console.log('too many attempts, relax for a minute')
        }
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
                <div className='authBox'>
                    <div className='authBoxSection signInBox'>
                        <form onSubmit={(event)=>event.preventDefault()}>
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
                            <button onClick={()=>{handleSignInRegister('login')}} value='login' name='login' type='submit'>Log In</button>
                            <button onClick={()=>{handleSignInRegister('register')}} value='register' name='register' type='submit'>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignInScreen;