import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { searchDogName } from '../../redux/actions';

import style from './searchBar.module.css'

export default function SearchBar(){
    const dispatch=useDispatch()

    //creo un ESTADO LOCAL
    let [name,setName]=useState('')

    //En esta funcion guardo en mi estado local lo que se agregue en mi input
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    //En esta le doy funcionalidad al boton
    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchDogName(name))

        //Para limpiar el input
        setName('')
    }

    return(
        <div className={style.group}>
            <input type="text" placeholder='Search...' value={name} onChange={(e)=>handleInputChange(e)}></input>
            <button className={style.btnS} type='submit' onClick={(e)=>handleSubmit(e)}>🔍︎</button>
        </div>
    )
}