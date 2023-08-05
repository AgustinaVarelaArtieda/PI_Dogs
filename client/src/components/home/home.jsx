import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDogs } from '../../redux/actions';

import LoadingPage from "../../views/loading/loading";
import Pagination from "../pagination/pagination";
import SearchBar from "../searchBar/searchBar";
import NavBar from "../navBar/navBar";
import Card from "../card/card";

import style from './home.module.css'
import Filters from "../filters/filters";

export default function HomePage(){
    const dispatch = useDispatch();
    
    //Traigo el estado global
    const allDogs = useSelector((state)=>state.dogs);       

    //PAGINACION
    //Creacion de estados LOCALES
    const [currentPage, setCurrentPage]=useState(1)     //Pagina actual y seteo de pagina actual, empieza en 1 porque siempre voy a entrar a la primera pagina
    
    // eslint-disable-next-line
    const [dogsPerPage, setDogsPerPage]=useState(8)  //Cuantos dogs por pagina quiero

    //Creacion de constantes para ubicar los perros segun el indice
    const indexOfLastDog=currentPage*dogsPerPage  
    const indexOfFirstDog=indexOfLastDog-dogsPerPage

    //Division de games por pagina
    const currentDogs= allDogs.slice(indexOfFirstDog,indexOfLastDog) //Esta const contiene los perros que van a tener la pagina actual
    
    //Funcion para el renderizado del paginado
    function paginated(pageNumber){
        setCurrentPage(pageNumber)
    }

    //Traigo los perros del estado cuando se monte el HOME
    useEffect(()=>{
        dispatch(getDogs());
    },[dispatch]);
      
    //LOADING
    const [loading, setLoading] = useState(true);       //para controlar si se debe mostrar LoadingPage o las cartas

    useEffect(()=>{
        const timer=setTimeout(()=>{        //temporizador para desactivar la loading
            setLoading(false)
        },1700);
        return ()=>{
            clearTimeout(timer)
        }
    },[]);

    //Para volver a la pagina 1
    function reset(e){
        e.preventDefault();
        setCurrentPage(1);
    }


    return(
        <div className={style.layout}>
            {/*Esto va a ser la header*/}
            <div className={style.header}>  
                {/*Nombre de la pagina(icono/logo)*/}
                <h1>DOGS!</h1>

                {/*Aca va la NavBar*/}
                <div className={style.nav}>
                    <NavBar/>
                </div>
            </div>

            {/*Esto va a tener la busqueda, filtrado y ordenamiento*/}
            <div className={style.leftSide}>
                {/*Aca va la SearchBar*/}
                <div className={style.search}>
                    <SearchBar/>
                </div> 
                {/*Aca van los filtros y orden*/}
                <div className={style.filter}>
                    <Filters reset={(e)=>reset(e)}/>
                </div>
                {/*Aca va la imagen de la parte de abajo*/}
                <div className={style.img}>
                    <h2>Imagen</h2>
                </div>
            </div>

            {/*Esto va a tener las cards y la paginación*/}
            <div className={style.body}>
                <div className={style.spacePagination}>
                    {/*Esto realiza el paginado*/}
                    <Pagination currentPage={currentPage} dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated}/>
                </div>
                
                <div className={style.spaceCards}>
                    {loading ? (
                        <LoadingPage />     /*Esto trae la LoadingPage*/
                    ) : (
                        currentDogs?.length===0 ? (
                            <h2 className={style.noDogs}>No dogs with these characteristics were found.</h2>
                        ) : (
                            currentDogs.map(el => {
                                return (
                                    <Card key={el.id} id={el.id} name={el.name} image={el.image} temperament={el.temperament?el.temperament:el.temperaments} weight_min={el.weight_min} weight_max={el.weight_max}/>
                                );
                            })
                        )
                    )}
              
                </div>
                <div className={style.spacePagination}>
                    {/*Esto realiza el paginado*/}
                    <Pagination currentPage={currentPage} dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated}/>
                </div>
            </div>

            {/*Esto va a ser el pie de pagina*/}
            <div className={style.footer}>
                <h5>Created by Agustina Varela</h5>
            </div>
            
        </div>
    )
}