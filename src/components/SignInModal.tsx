import React, { useState, useEffect } from 'react'
import '../App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


import { collection, getDocs, getDoc, setDoc, query, where, doc } from 'firebase/firestore';




function SignInScreen({signedIn, setSignedIn, setUsersHouse, setUserId}){


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
    const db = getFirestore(app)


    
    
    
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    
    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('');
    const [message, setMessage] = useState('');


    
    
    
    // Function here trying to get user info from Firestore database
    
    const getQuery = query(collection(db, 'users'))


    async function setUser(){
        await setDoc(doc(db, 'users', userName),{
            house: 'stark'
        })
    }


    
    async function checkUser(){
        const querySnapshot = await getDocs(getQuery);
       }


    checkUser();


    async function getCurrentUser(){
        const loggedInUser = await getDoc(doc(db, 'users', userName));
        console.log(loggedInUser)
        setUsersHouse(loggedInUser._document.data.value.mapValue.fields.house.stringValue)
        setUserId(loggedInUser._document.data.value.mapValue.fields.id.stringValue)
        
    }

  

    // function to handle the sign in request and the corresponding response
    
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
                    .then(()=>{
                        setUser()
                    })
                    .catch((error) => {
                        console.log(error)
                        handleFirebaseError(error)
                    });
                    break;
            case 'login' :
                console.log('logging in')
                getCurrentUser();
                signInWithEmailAndPassword(auth, userName, passWord)
                    .then((userCredential) => {
                        if(userCredential){
                            const user = userCredential.user;
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


    // Functions for visual feedback on the response to login attempts/failures

    function errorShake(element:HTMLElement|null):void{
        element?.classList.toggle('shake');
        setTimeout(()=>{
            element?.classList.toggle('shake')
        })
    }

    function confirmFlash(elementClass:string):void{
        let target = document.getElementsByClassName(elementClass)[0];
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


    // switch statement to determine the cause for the error and execute the visual feedback

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
        
            case 'auth/missing-password':
                showMessage('error', 'Set a password to register')
                errorShake(emailInput)
                break;

            case 'auth/too-many-requests':
                showMessage('error', 'Too many attempts')
                const wholeBox = document.getElementsByClassName('authContainer')[0];
                wholeBox.classList.toggle('shake');
                break;
        }
    }

    function resetPassword(email){
        if(email){
            sendPasswordResetEmail(auth, email)
            .then(()=>{
                alert('Please check your emails for a password reset')
            })
        } else {
            errorShake(document.getElementById('emailInput'))
            alert('Please enter an email to request a password reset')
        }
    }


    // handling typing into the input boxes

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
                        <p className='resetPassword' onClick={()=>{resetPassword(userName)}}>Click to reset password</p>
                        <button onClick={()=>{handleSignInRegister('register')}} className="loginButtons" value='register' name='register' type='submit'>Register</button>
                        <button onClick={()=>{handleSignInRegister('login')}} className="loginButtons" value='login' name='login' type='submit'>Log In</button>
                        </form>
                    </div>
            </div>
        </div>
    )
}


export default SignInScreen;