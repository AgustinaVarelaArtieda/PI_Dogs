import {Link} from 'react-router-dom'

import style from './error.module.css'

export default function ErrorPage(){
    
    return(
        <div className={style.layout}>
            <div className={style.contend}>
                <h1>* Error *</h1>
                <h2>Page not found</h2>
            </div>
            <Link to='/home'>
                <button> Back to home</button>
            </Link>
        </div>
    )
}