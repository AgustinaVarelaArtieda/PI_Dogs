import React from "react";
import {Link} from 'react-router-dom'

export default function ErrorPage(){
    return(
        <div>
            <h1>Error 404: Page not found</h1>

            <Link to='/home'>
                <button>HOME</button>
            </Link>
        </div>
    )
}