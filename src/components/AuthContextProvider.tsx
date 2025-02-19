import React, { useState, useEffect, createContext, useContext } from 'react'

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserLocalPersistence, signOut } from "firebase/auth";
import { getDoc, setDoc, doc } from 'firebase/firestore';


interface FireBaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}
  
  
const key = import.meta.env.VITE_FIREBASE_KEY;
  
  // Your web app's Firebase configuration
const firebaseConfig:FireBaseConfig = {
  apiKey: key,
  authDomain: "uw-got.firebaseapp.com",
  projectId: "uw-got",
  storageBucket: "uw-got.firebasestorage.app",
  messagingSenderId: "129264600580",
  appId: "1:129264600580:web:6f803527e668df370e5751"
};
  
  
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const auth = getAuth(app);


type AuthContextChildren = {
  children: React.ReactNode
}


type firebaseAsyncFunction = (a: string) => void;


type AuthContextType = {
  signedIn: boolean;
  userName: string;
  setUsername:  React.Dispatch<React.SetStateAction<string>>;
  passWord: string;
  setPassword:  React.Dispatch<React.SetStateAction<string>>;
  resetPassword: firebaseAsyncFunction;
  handleSignInRegister: firebaseAsyncFunction;
  message: string;
  userId:  string;
  setUserId:  React.Dispatch<React.SetStateAction<string>>;
  usersHouse:  string;
  setUsersHouse:  React.Dispatch<React.SetStateAction<string>>;
  signOutUser: firebaseAsyncFunction;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);




function AuthContextProvider({children}:AuthContextChildren){

    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [usersHouse, setUsersHouse] = useState('')


    useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        if (user){
          getCurrentUser(user.email)
          setSignedIn(true)
        }
      })
    }, [])

  async function addUserToDB():Promise<void>{
      await setDoc(doc(db, 'users', userName),{
          house: 'stark'
      })
  }


  async function signOutUser():Promise<void>{
    signOut(auth)
    .then(()=>{
      setSignedIn(false)
      console.log('signing out user')
    }).catch((error)=>{
      console.log(error)
    })
  }
  
  async function getCurrentUser(email:string|null):Promise<void>{
      const loggedInUser = await getDoc(doc(db, 'users', email));
      const data = await loggedInUser.data();
      setUsersHouse(data?.house)
      setUserId(data?.id)
  }


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
                          addUserToDB()
                      })
                      .catch((error) => {
                          console.log(error)
                          handleFirebaseError(error)
                      });
                      break;
              case 'login' :
                  console.log('logging in')
                  getCurrentUser(userName);
                  setPersistence(auth, browserLocalPersistence)
                  .then(()=>{
                    signInWithEmailAndPassword(auth, userName, passWord)
                      .then((userCredential) => {
                          if(userCredential){
                              console.log(userCredential)
                              const user = userCredential.user;
                              confirmFlash('authContainer')
                              setSignedIn(true)
                          }
                      })  
                      .catch((error) => {
                          handleFirebaseError(error)
                      });
                  })
                      break;
          }
  }

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
    
  function resetPassword(email:string | null):void{
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


  return (

    <AuthContext.Provider value={{
      signedIn,
      userName,
      setUsername,
      passWord,
      setPassword,
      resetPassword,
      handleSignInRegister,
      message,
      userId,
      setUserId,
      usersHouse, 
      setUsersHouse, 
      signOutUser
    }}>
      {children}
    </AuthContext.Provider>

  )
}


export default AuthContextProvider;