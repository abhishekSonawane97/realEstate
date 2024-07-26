import React, { Suspense, useContext } from "react";
import "./profilePage.scss";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilePage() {
  const data = useLoaderData();

  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={"/profile/update"}>
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar :{" "}
              <img
                src={
                  currentUser?.avatar ||
                  "https://tse4.mm.bing.net/th?id=OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH&pid=Api&P=0&h=220"
                }
                alt=""
              />
            </span>
            <span>
              Username : <b>{currentUser?.username}</b>
            </span>
            <span>
              E-mail : <b>{currentUser?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>

          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.profileResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(profileResponse) => (
                <List posts={profileResponse.data.userPosts} />
              )}
            </Await>
          </Suspense>

          {/* <List/> */}
          <div className="title">
            <h1>Saved List</h1>
          </div>
        </div>
        {/* <List/> */}
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.profileResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(profileResponse) => (
              <List posts={profileResponse.data.savedPosts} />
            )}
          </Await>
        </Suspense>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          {/* <Chat /> */}
          <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.chatResponse}
            errorElement={<p>Error loading chats!</p>}
          >
            {(chatResponse) => (
              <Chat chats={chatResponse.data} />
            )}
          </Await>
        </Suspense>
        </div>
      </div>
    </div>
  );
}
