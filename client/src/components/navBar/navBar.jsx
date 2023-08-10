import { NavLink } from "react-router-dom";

import style from './navBar.module.css'

export default function NavBar(){
    return(
        <div className={style.navBar}>
            <NavLink to='/home' className={style.link}>+ Home</NavLink>
            <NavLink to='/about' className={style.link}>+ About</NavLink>
            <NavLink to='/newdog' className={style.link}>+ New Dog </NavLink>
        </div>
    )
}