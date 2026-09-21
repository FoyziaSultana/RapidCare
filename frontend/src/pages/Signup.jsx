import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import "./SignupStyle.css";
import { handleError, handleSuccess } from "../toastmsg";
function Signup ()
{
    const [signupInfo, setSignupInfo] = useState({
        UserName: "",
        UserEmail: "",
        UserPhone: "",
        UserPassword: ""
        })
        const navigate = useNavigate();
    const handleChange = (e)=>
    {
        const {name, value} =e.target;
        
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignUp = async(e)=>{
        e.preventDefault();
        const {UserName, UserEmail, UserPhone, UserPassword} = signupInfo;
        if(!UserName || !UserEmail || !UserPhone || !UserPassword)
        {
            return handleError('Fillup all information')
        }
        
        try{
            const url = "http://localhost:5005/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const {success, message, error} = result;
            if(success)
            {
                handleSuccess(message);
                setTimeout( ()=>{
                    navigate('/login')
                },1000)
            }
            else if(error)
            {
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success)
            {
                handleError(message);
            }
            
        }catch(error)
        {
            handleError(error.message);
        }
    }
    return (
        <div className="container">
            
            <form onSubmit={handleSignUp}>
                <h1>Signup</h1>
                <div>
                    <label htmlFor = 'UserName'>Name</label>
                    <input
                    onChange={handleChange}
                    type="text"
                    name = 'UserName'
                    autoFocus
                    placeholder="Enter your name..."
                    value = {signupInfo.UserName}
                    />
                    
                </div>

                <div>
                    <label htmlFor = 'UserEmail'>Email</label>
                    <input
                    onChange={handleChange}
                    type="email" name = 'UserEmail' placeholder="Enter your email..." value = {signupInfo.UserEmail} />
                    
                </div>

                <div>
                    <label htmlFor = 'UserPhone'>Phone</label>
                    <input onChange={handleChange}
                    type="tel" name = 'UserPhone'  placeholder="Enter your phone number.." value = {signupInfo.UserPhone} />
                    
                </div>

                <div>
                    <label htmlFor = 'UserPassword'>Password</label>
                    <input onChange={handleChange}
                    type="password" name = 'UserPassword'  placeholder="Enter your password..."
                    value = {signupInfo.UserPassword} />
                    
                </div>

                <button type="submit">Signup</button>

                <span>Already have an account?</span>

                <Link to ="/login" >Login</Link>
            </form>

            <ToastContainer />

        </div>
    )
}
export default Signup;