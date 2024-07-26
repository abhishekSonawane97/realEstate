import React, { useContext } from 'react';
import './homePage.scss'
import lobby from '../../assets/lobby.jpg';
import SearchBar from '../../components/searchBar/SearchBar';
import { AuthContext } from '../../context/AuthContext';

export default function HomePage() {

    const { currentUser } = useContext( AuthContext );

  return (
    <div className="homePage">
        <div className="textContainer">
            <div className="wrapper">

            <h1 className='title'>Find Real Estate & Get Your Dream Place</h1>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>

            <SearchBar/>
            <div className="boxes">
                <div className="box">
                    <h1>16+</h1>
                    <h2>Years of Experience</h2>
                </div>
                <div className="box">
                    <h1>200</h1>
                    <h2>Award Gained</h2>
                </div>
                <div className="box">
                    <h1>1200</h1>
                    <h2>Property Ready</h2>
                </div>
            </div>
            </div>
        </div>
        <div className="imgContainer">
            <img src={lobby} alt="" />
        </div>
    </div>
  )
}


