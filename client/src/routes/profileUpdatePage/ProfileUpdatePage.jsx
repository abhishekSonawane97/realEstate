import React, { useContext, useState } from 'react';
import './profileUpdatePage.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/UploadWidget';


export default function ProfileUpdatePage() {

    const { currentUser, updateUser } = useContext(AuthContext);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    const [ avatar, setAvatar ] = useState([]);


    const handleSubmit = async(e) =>{
      e.preventDefault();
      setError(false);
      setIsLoading(true);

      const formData = new FormData(e.target);
      const { username, email, password } = Object.fromEntries(formData);
      // console.log(username, email, password);
      try{

        const res = await apiRequest.put(`/user/${currentUser.id}`, {
          username, password, email, avatar : avatar[0],
        });
        updateUser(res.data);
        navigate('/profile');
      }
      catch(err){
        setError(err);
        console.log('Error : ', err );
      }
      finally{
        setIsLoading(false);
      }
      
    };
    
  return (
    <div className='profileUpdatePage'>
      <div className="formContainer">
        <form  onSubmit={ handleSubmit }>
            <h1>Update Profile</h1>
        <div className="item">
            <label htmlFor="username">Username</label>
            <input type="text" name='username' id='username' defaultValue={ currentUser.username } />
        </div>
        <div className="item">
            <label htmlFor="email">Email</label>
            <input type="text" name='email' id='email' defaultValue={ currentUser.email } />
        </div>
        <div className="item">
            <label htmlFor="password">Password</label>
            <input type="text" name='password' id='password' />
        </div>
        <button disabled={isLoading}>Update</button>
        { error && <span>{ error }</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={ avatar[0] || currentUser.avatar || "https://tse4.mm.bing.net/th?id=OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH&pid=Api&P=0&h=220" } alt="" className='avatar' />
        <UploadWidget uwConfig={{
            cloudName : "dac9jwe8d",
            uploadPreset : "estate",
            multiple : false,
            maxImageFileSize : 2000000,
            folder : 'avatars',
          }}
          setState = { setAvatar }
          />
      </div>
    </div>
  )
}
