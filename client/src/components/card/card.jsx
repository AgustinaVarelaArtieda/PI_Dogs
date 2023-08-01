import React from "react";

import style from './card.module.css';

export default function Card({name, image, temperament, weight_min, weight_max}){
    return(
        <div className={style.card2}> 
            <h1>{name}</h1>
            <img src={image} alt={name}/>
            <p>{temperament}</p>
            <p>{weight_min} - {weight_max}</p>
        </div>
    )
}