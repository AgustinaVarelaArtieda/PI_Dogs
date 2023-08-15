import { NavLink } from 'react-router-dom'; 

import style from './card.module.css';

export default function Card({id, name, image, temperament, weight_min, weight_max}){
    
  //Para mostrar los temperamentos
  let temps=''
    
    if(typeof temperament === 'string'){
        temps= temperament
    }
    if(Array.isArray(temperament)){
        temps=temperament.map(el=>el.name).join(', ')                                      
    }

    //Imagen para cuando no hay imagen
    const imgDefault='https://thumbs.gfycat.com/DependableElementaryAquaticleech-size_restricted.gif'

    if(image===''){
        image=imgDefault
    }

    return(
      <div className={style.card}> 
      <div className={style.card2}>
     <NavLink to={`/detail/${id}`} style={{textDecoration:'none'}}>
        <img src={image} width="300px" height="200px" alt={name}/>
        <h1>{name}</h1>
        
        
          <p>{temps?temps:'No data about temperaments'}</p>
        

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
          )))}
        
     </NavLink>
      </div>
      </div>
    )
}
