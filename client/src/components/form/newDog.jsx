import React from "react";
import {Link} from 'react-router-dom'

export default function FormPage(){
    return(
        <div>
            <h1>New Dog!</h1>

            <Link to='/home'>
                <button>HOME</button>
            </Link>
        </div>
    )
}