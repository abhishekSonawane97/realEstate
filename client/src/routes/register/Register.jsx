import React, { useState } from 'react';
import lobby from '../../assets/lobby.jpg';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';


export default function Register() {

    const [ error, setError ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{

        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try{

            const res = await apiRequest.post("/auth/register", {
                username, email, password
            });
            navigate("/login");
        }
        catch(err){
            setError( err.response.data.message );
        }
        finally{
            setIsLoading(false);
        }
    }


  return (
    <div className='register'>
      <div className="formContainer">
            <div className="wrapper">
            <form onSubmit={ handleSubmit }>
                <h1>Create an Account</h1>
                <input type="text" name='username' placeholder='Username' />
                <input type="email" name='email' placeholder='Email' />
                <input type="text" name='password' placeholder='Password' />
                <button disabled={ isLoading }>Register</button>
                { error && <span className='errMsg'>{error}</span>}
                <Link to={ '/login' }>Do you have an account?</Link>
            </form>
            </div>
        </div>
        <div className="imgContainer">
            <img src={lobby} alt="" />
        </div>
    </div>
  )
}
