import React, { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import "./layout.scss";
import { AuthContext } from '../../context/AuthContext';

export function Layout() {
  return (
      <div className="layout">
        <div className="navbar">
        <Navbar/>
        </div>

        <div className="content">
        <Outlet/>
        </div>
      </div>
  )
}

export function RequiredAuth() {

  const { currentUser } = useContext( AuthContext );

  return (
      !currentUser? (<Navigate to="/login"/>) : (<div className="layout">
        <div className="navbar">
        <Navbar/>
        </div>

        <div className="content">
        <Outlet/>
        </div>
      </div>)
  )
}
