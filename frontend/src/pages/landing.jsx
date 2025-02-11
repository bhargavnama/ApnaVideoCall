import React from 'react'
import "../App.css"

import { Link, useNavigate } from 'react-router-dom';
export default function LandingPage() {

  let getRoomId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  }

  const router = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <div className='navHeader'>
          <h2>Apna Video Call</h2>
        </div>
        <div className='navlist'>
          <p onClick={() => {
            let roomId = getRoomId();
            router(`/${roomId}`);
          }}>Join as Guest</p>
          <p onClick={() => {
            router("/auth");
          }}>Register</p>
          <div role='button'>
            <p onClick={() => {
              router("/auth")
            }}>Log In</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1><span style={{color: '#FF9838'}}>Connect</span> with your loved ones</h1>
        
          <p>Cover a distance by apna video call</p>
          <div role='button'>
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
  )
}
