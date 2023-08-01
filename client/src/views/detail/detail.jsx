import React from "react";
import {Link} from 'react-router-dom'

export default function DetailPage(){
    return(
        <div>
            <h1>Detail</h1>

            <Link to='/home'>
                <button>HOME</button>
            </Link>
        </div>
    )
}