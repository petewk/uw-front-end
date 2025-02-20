import React, { useContext } from 'react'
import '../App.css'
import { createPortal } from 'react-dom';


import { AuthContext } from './AuthContextProvider';



function SignInScreen(){


    const { setPassword, userName, setUsername, resetPassword, handleSignInRegister, message } = useContext(AuthContext)


    const key = import.meta.env.VITE_FIREBASE_KEY;
    
    
    // handling typing into the input boxes

    function handleEmailChange(event: React.MouseEvent<HTMLInputElement>):void{
        setUsername(event?.currentTarget.value);
    }

    function handlePasswordChange(event: React.MouseEvent<HTMLInputElement>):void{
        setPassword(event?.currentTarget.value);
        console.log('changing password')
    }
    
    const targetNode = document.getElementById('authBoxSection');
    console.log(targetNode)



    return (
        <div className='signInFullScreen'>
            <div className='authContainer'>
                {
                    targetNode ? 
                    createPortal(
                        <p className="messageBox" id="messageBox">{message}</p>,
                        targetNode
                    )
                    :
                    null
                }
                <div className='authBoxSection signInBox' id="authBoxSection">
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