import React from "react";
import {Link} from 'react-router-dom'

export default function AboutPage(){
    return(
        <div>
            <h1>Hello! I'm Agustina Varela</h1>

            <Link to='/home'>
                <button>HOME</button>
            </Link>
        </div>
    )
}