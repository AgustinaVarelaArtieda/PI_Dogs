import { Link } from 'react-router-dom'; 

import style from './card.module.css';

export default function Card({id, name, image, temperament, weight_min, weight_max}){
    // const navigate=useNavigate();

    // function handleClick(e){
    //     e.preventDefault();
    //     navigate(`/detail/${id}`)
    // }
    
    return(
        <div className={style.card2}> 
            <h1>{name}</h1>

            <Link to={`/detail/${id}`}>
                <img src={image} alt={name}/>
            </Link>
            
            <p>{temperament}</p>

            {isNaN(weight_min)&&isNaN(weight_max) ? (
                <h3>no data</h3> 
            ) : (
            isNaN(weight_min) ? (
                <h3>no data - {weight_max} kg</h3>
            ) : (
            isNaN(weight_max) ? (
                <h3>{weight_min} kg - no data</h3>
            ) : (
                <h3>{weight_min} kg - {weight_max} kg</h3>
            )
            ))}
        </div>
    )
}