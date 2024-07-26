import React, { useContext, useState } from 'react';
import './navbar.scss';
import logo from '../../assets/realEstateLogo.jpeg';
import menu from '../../assets/menuIcon.jpeg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from '../../lib/notificationStore';



export default function Navbar() {

  const { currentUser } = useContext( AuthContext );
  const [ open, setOpen ] = useState(false);
  const fetch = useNotificationStore(state => state.fetch);
  const number = useNotificationStore(state => state.number);
  if(currentUser){
    fetch();
  }

  return (
    <nav>
        <div className="left">
          <a href="/" className='logo'>
            <img src={logo} alt="" />
            <span>NammaEstates</span>
          </a>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/agents">Agents</a>
        </div>
        <div className="right">
          {
            currentUser ? (<div className='user'>
              <img src={currentUser.avatar || "https://tse4.mm.bing.net/th?id=OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH&pid=Api&P=0&h=220" } alt="" />
              <span>{currentUser.username }</span>
              <Link to={'/profile'} className='profile'>
                { number > 0 && <div className="notification">{number}</div>}
                <span>Profile</span></Link>
            </div>) : (<><a href="/login">Sign in</a>
          <a href="/register" className='register'>Sign up</a></>)
        
        }
          <div className="menuIcon">

          <img src={menu} alt="menuIcon" onClick={()=> setOpen(!open) } />
          </div>
          <div className={ open ? "menu active" : "menu" }>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/" >Sign up</a>
          </div>
        </div>
    </nav>
  )
}
