import React , { useContext, useState } from 'react';
import './login.scss';
import lobby from '../../assets/lobby.jpg';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';


export default function Login() {

  const { updateUser } = useContext( AuthContext );

  const [ error, setError ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{

      e.preventDefault();
      setIsLoading(true);
      setError("");
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        try{
            const res = await apiRequest.post("/auth/login", {
                username, password
            });

            updateUser(res.data);
            navigate("/"); 
        }
        catch(err){
            setError( err.response.data.message );
        }finally{
          setIsLoading(false);
        }
    }


  return (
    <div className='login'>
      <div className="formContainer">
            <div className="wrapper">
            <form onSubmit={ handleSubmit }>
                <h1>Welcome back</h1>
                <input type="text" required minLength={3} maxLength={20} name='username' placeholder='Username' />
                <input type="text" required minLength={3} maxLength={20} name='password' placeholder='Password' />
                <button disabled={isLoading}>Login</button>
                { error && <span className='errMsg'>{error}</span>}
                <Link to={ '/register' }>Don't have an account?</Link>
            </form>
            </div>
        </div>
        <div className="imgContainer">
            <img src={lobby} alt="" />
        </div>
    </div>
  )
}
