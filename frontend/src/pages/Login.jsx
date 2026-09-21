import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import "./SignupStyle.css";
import { handleError, handleSuccess } from "../toastmsg";
function Login ()
{
    const [loginInfo, setLoginInfo] = useState({
        UserEmail: "",
        UserPassword: ""
        })
        const navigate = useNavigate();
    const handleChange = (e)=>
    {
        const {name, value} =e.target;
        
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }
    const handleLogin = async(e)=>{
        e.preventDefault();
        const {UserEmail, UserPassword} = loginInfo;
        if(!UserEmail || !UserPassword)
        {
            return handleError('Fillup all information')
        }
        try{
            const url = "http://localhost:5005/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const {success, message, jwtToken, UserName, error} = result;
            if(success)
            {
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',UserName);
                setTimeout( ()=>{
                    navigate("/")
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
            console.log(result);
        }catch(error)
        {
            handleError(error.message);
        }
    }
    return (
        <div className="container">
            
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div>
                    <label htmlFor = 'UserEmail'>Email</label>
                    <input
                    onChange={handleChange}
                    type="email" name = 'UserEmail' placeholder="Enter your email..." value = {loginInfo.UserEmail} />
                    
                </div>


                <div>
                    <label htmlFor = 'UserPassword'>Password</label>
                    <input onChange={handleChange}
                    type="password" name = 'UserPassword'  placeholder="Enter your password..."
                    value = {loginInfo.UserPassword} />
                    
                </div>

                <button type="submit">Login</button>

                <span>Don't have an account?</span>

                <Link to ="/signup" >Signup</Link>
            </form>

            <ToastContainer />

        </div>
    )
}
export default Login;