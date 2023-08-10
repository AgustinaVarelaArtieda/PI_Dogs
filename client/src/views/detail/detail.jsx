import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { getDogDetails } from '../../redux/actions'
import NavBar from '../../components/navBar/navBar'
import LoadingPage from '../loading/loading'

import style from './detail.module.css'

export default function DetailPage(){
    
    const dispatch = useDispatch();

    const { id }=useParams();

    //Traigo el estado global dogDetails
    const detail=useSelector((state)=>state.dogDetails)

    useEffect(()=>{
        dispatch(getDogDetails(id))
    },[id, dispatch]);

    //Para renderizar los temperamentos
    let temps='';
    
    if(detail.temperament){ //Si la info viene de la API
        temps= detail.temperament
    };
    if(detail.temperaments){ //Si la info viene de la DB
        temps=detail.temperaments.map(el=>el.name).join(', ')                                      
    };

    //Para agregar la palabra years a los life_span
    let lifespan='';
    if(detail.life_span){

        if(!detail.life_span.includes('years')){
            lifespan=detail.life_span+' years';
        }else lifespan=detail.life_span;
    }


    //LOADING
    const [loading, setLoading] = useState(true);     //para controlar la LoadingPage

    useEffect(()=>{
        const timer=setTimeout(()=>{        //temporizador para desactivar la loading
            setLoading(false)
        },1200);
        return ()=>{
            clearTimeout(timer)
        }
    },[]);
    
    return(
        <div className={style.layout}>
            <div className={style.contNav}>
            <NavBar/>
            </div>

            {
                    loading ? (
                    <LoadingPage/>
                    ) : (
                    <div className={style.details}>
                            <h1>* {detail.name} *</h1>
                            <h5>ID: {detail.id}</h5>
                        <div className={style.info}>
                        <img src={detail.image} alt={detail.name} />
                            <div className={style.med}>
                            <h4>Life span:</h4>
                            <p>{lifespan} </p>
                            <h4>Weight:</h4>
                            {isNaN(detail.weight_min)&&isNaN(detail.weight_max) ? (
                              <p>no data</p> 
                            ) : (
                                isNaN(detail.weight_min) ? (
                                  <p>no data - {detail.weight_max} kg</p>
                            ) : (
                                  isNaN(detail.weight_max) ? (
                                    <p>{detail.weight_min} kg - no data</p>
                                ) : (
                                  <p>{detail.weight_min} kg - {detail.weight_max} kg</p>
                            )))}
                            <h4>Height:</h4>
                            {isNaN(detail.height_min)&&isNaN(detail.height_max) ? (
                                <p>no data</p> 
                            ) : (
                                isNaN(detail.height_min) ? (
                                    <p> no data - {detail.height_max} cm</p>
                                ) : (
                                isNaN(detail.height_max) ? (
                                     <p>{detail.height_min} cm - no data</p>
                                ) : (
                                    <p>{detail.height_min} cm - {detail.height_max} cm</p>
                            )))}
                            <h4>Temperaments:</h4>
                            <p>{temps?temps:'No data about temperaments'}</p>
                            </div>
                        </div>
                        
                    </div>)
                }
                <Link to= "/home">
                    <button>volver</button>
                </Link>
        </div>
    )
}