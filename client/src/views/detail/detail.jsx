import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { getDogDetails } from '../../redux/actions'
import NavBar from '../../components/navBar/navBar'
import LoadingPage from '../loading/loading'

export default function DetailPage(){
    
    const dispatch = useDispatch();

    const { id }=useParams();

    //Traigo el estado global dogDetails
    const detail=useSelector((state)=>state.dogDetails)

    useEffect(()=>{
        dispatch(getDogDetails(id))
    },[id, dispatch]);

    //LOADING
    const [loading, setLoading] = useState(true);     //para controlar la LoadingPage

    useEffect(()=>{
        const timer=setTimeout(()=>{        //temporizador para desactivar la loading
            setLoading(false)
        },1000);
        return ()=>{
            clearTimeout(timer)
        }
    },[]);

    //Para renderizar los temperamentos
    let temps=''
    
    if(detail.temperament){ //Si la info viene de la API
        temps= detail.temperament
    }
    if(detail.temperaments){ //Si la info viene de la DB
        temps=detail.temperaments.map(el=>el.name).join(', ')                                      
    }

    return(
        <div>
            <NavBar/>

            <h1>Detail</h1>

            {
                    loading ? (
                    <LoadingPage/>
                    ) : (
                    <div>
                        <h1>{detail.name}</h1>
                        <h5>{detail.id}</h5>
                        <img src={detail.image} alt={detail.name} />
                        <p>Life span: {detail.life_span}</p>
                        <p>Weight: {detail.weight_min} - {detail.weight_max} kg</p>
                        <p>Height: {detail.height_min} - {detail.height_max} cm</p>
                        <p>Temperaments: {temps}</p>
                        
                    </div>)
                }
                <Link to= "/home">
                    <button>volver</button>
                </Link>
        </div>
    )
}