import { useEffect, useState } from 'react';
 import HomePage from './routes/homePage/HomePage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from './routes/listPage/ListPage.jsx';
import {Layout, RequiredAuth} from './routes/Layout/Layout.jsx';
import SinglePage from './routes/singlePage/SinglePage.jsx';
import Login from './routes/Login/Login.jsx';
import ProfilePage from './routes/profilePage/ProfilePage.jsx';
import Register from './routes/register/Register.jsx';
import ProfileUpdatePage from './routes/profileUpdatePage/ProfileUpdatePage.jsx';
import NewPostPage from './routes/newPostPage/NewPostPage.jsx';
import { listPageLoader, profilePageLoader, singlePageLoader } from './lib/loaders.js';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children : [
        {
          path : "/",
          element : <HomePage/>
        },
        {
          path : "/list",
          element : <ListPage/>,
          loader : listPageLoader,
        },
        {
          path : "/:id",
          element : <SinglePage/>,
          loader : singlePageLoader,
        },
        {
          path : "/login",
          element : <Login/>
        },
        {
          path : "/register",
          element : <Register/>
        },
        
      ]
    },
    {
      path : "/",
      element : <RequiredAuth/>,
      children : [
        {
          path : "/profile",
          element : <ProfilePage/>,
          loader : profilePageLoader,
        },
        {
          path : "/profile/update",
          element : <ProfileUpdatePage/>
        },
        {
          path : "/add",
          element : <NewPostPage/>
        },
      ]
    }
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
