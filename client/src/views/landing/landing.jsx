import React from "react";
import {NavLink} from 'react-router-dom'

import style from './landing.module.css'

export default function LandingPage(){
    return(
      <div className={style.layout}>

          <div className={style.land}>
              <h1>Welcome to the Dogs Page!</h1>
              <NavLink to='/home' style={{textDecoration:'none'}}>
                  <button></button>
              </NavLink>
              
          </div>
        
      </div>
    )
}