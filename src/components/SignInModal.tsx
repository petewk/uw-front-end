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
    const [message, setMessage] = useState('');
    
    
    function handleSignInRegister(buttonType:string):void{
        switch(buttonType){
            case 'register':
                createUserWithEmailAndPassword(auth, userName, passWord)
                    .then((userCredential) => {
                        // Signed up 
                        if(userCredential){
                            const user = userCredential.user;
                            console.log(user)
                            confirmFlash('authContainer')
                            showMessage('success', 'Account registered')
                            const target = document.getElementsByClassName('success')[0]
                            setTimeout(()=>{
                                target.classList.remove('success');
                            }, 2000)
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
                        if(userCredential){
                            const user = userCredential.user;
                            console.log(user)
                            confirmFlash('authContainer')
                            setSignedIn(true)
                        }
                    })
                    .catch((error) => {
                        handleFirebaseError(error)
                    });
                    break;
        }
    }


    function errorShake(element:HTMLElement):void{
        element?.classList.toggle('shake');
        setTimeout(()=>{
            element?.classList.toggle('shake')
        })
    }

    function confirmFlash(elementClass:string):void{
        let target = document.getElementsByClassName(elementClass)[0];
        console.log(target);
        target.classList.add('flashGreen')
    }

    function showMessage(messageType:string, messageText:string):void{
        const target = document.getElementsByClassName('messageBox')[0];
        setMessage(messageText)
        target.classList.add(messageType)
        setTimeout(()=>{
            setMessage('')
        }, 2000)
    }

    interface ErrorCode {
        code: string,
        customData: string,
        name: string
    }

    function handleFirebaseError(error:ErrorCode):void{
        const errorBox = document.getElementById('messageBox')
        errorBox?.classList.add('error')
        setTimeout(()=>{
            errorBox?.classList.remove('error')
        }, 2000)
        const passwordInput:HTMLElement|null = document.getElementById('passwordInput') as HTMLElement
        const emailInput:HTMLElement|null = document.getElementById('emailInput') as HTMLElement
        switch(error.code){
            case 'auth/invalid-email':
                showMessage('error', 'Invalid email')
                errorShake(emailInput);
                break;

            case 'auth/invalid-credential':
                showMessage('error', 'Invalid password')
                errorShake(passwordInput)
                break;

            case 'auth/email-already-in-use':
                showMessage('error', 'Email already registered')
                errorShake(emailInput)
                break;

            case 'auth/too-many-requests':
                showMessage('error', 'Too many attempts')
                const wholeBox = document.getElementsByClassName('authContainer')[0];
                wholeBox.classList.toggle('shake');
                break;
        }
    }

    function handleEmailChange(event){
        setUsername(event?.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    return (
        <div className='signInFullScreen'>
            <div className='authContainer'>
                <p className="messageBox" id="messageBox">{message}</p>
                <div className='authBoxSection signInBox'>
                    <form onSubmit={(event)=>event.preventDefault()}>
                        <label>
                        E-mail: <br />
                            <input className="authFormsInput" id="emailInput" onChange={handleEmailChange} placeholder='Enter your e-mail' type='E mail'></input>
                        </label>
                        <br />
                        <label>
                            Password: <br /> 
                        <input className="authFormsInput" id="passwordInput" onChange={handlePasswordChange} placeholder='Enter your Password' type='password'></input>
                        </label>
                        <br />
                        <button onClick={()=>{handleSignInRegister('register')}} className="loginButtons" value='register' name='register' type='submit'>Register</button>
                        <button onClick={()=>{handleSignInRegister('login')}} className="loginButtons" value='login' name='login' type='submit'>Log In</button>
                        </form>
                    </div>
            </div>
        </div>
    )
}


export default SignInScreen;