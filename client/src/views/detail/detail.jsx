import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { getDogDetails } from '../../redux/actions'

const imgDefault='https://thumbs.gfycat.com/DependableElementaryAquaticleech-size_restricted.gif'

export default function DetailPage(){
    
    const dispatch = useDispatch();

    const { id }=useParams();

    //Traigo el estado global dogDetails
    const detail=useSelector((state)=>state.dogDetails)

    useEffect(()=>{
        dispatch(getDogDetails(id))
    },[id, dispatch]);


    return(
        <div>
            <h1>Detail</h1>

            {
                    detail ?
                    (<div>
                        <h1>{detail.name}</h1>
                        <img src={detail.image ? detail.image : imgDefault} alt={detail.name} />
                        <p>Life span:{detail.life_span}</p>
                        <p>Weight:{detail.weight_min} - {detail.weight_max} kg</p>
                        <p>Height:{detail.height_min} - {detail.height_max} cm</p>
                        <p>Temperaments: {!detail.createInDb? detail.temperaments + " " : detail.temperament.map((el)=> el.name + " ")}</p>
                        
                    </div>)
                    :
                    (<div>
                        <h1>loading...</h1>
                    </div>)
                }
                <Link to= "/home">
                    <button>volver</button>
                </Link>
        </div>
    )
}