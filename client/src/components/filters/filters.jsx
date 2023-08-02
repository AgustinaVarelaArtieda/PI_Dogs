import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDogs, getTemps, filterByTemp, filterOrigin, orderByName, orderByWeight } from "../../redux/actions";

import style from './filters.module.css'

export default function Filters (){
    const dispatch = useDispatch();

    //const allDogs = useSelector((state)=>state.videogames);       //Trae todo lo que esta en el estado de videogames(ESTADO GLOBAL)
    const allTemperaments=useSelector((state)=>state.dogTemps)

    //FILTROS
    const filterOrig=useRef();
    const filterTemp=useRef();

    //Filtro por origen
    function handleFilterOrigin(e){
        e.preventDefault()

        dispatch(filterOrigin(e.target.value))
        
    }

    //Filtro por temperamentos
        //para renderizar los temperamentos
    useEffect(()=>{
        dispatch(getTemps());
    },[dispatch]);

    function handleFilterTemp(e){
        e.preventDefault();
        
        dispatch(filterByTemp(e.target.value));
    }

    //ORDENAMIENTO
    const orderName=useRef();
    const orderWeight=useRef();

    //Orden alfabético
    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));

        orderWeight.current.value='default';    //setea el orden por peso
    }

    //Orden por peso
    function handleOrderByWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));

        orderName.current.value='default';    //setea el orden por nombre
    }

    //Reset Filters-sortings
    function handleReset(e){
        e.preventDefault();
        //Recargar/traer todos los perros
        dispatch(getDogs());

        //Establecer los valores de los filtros y ordenamientos a los predeterminados
        filterOrig.current.value='default';
        filterTemp.current.value='default';
        orderName.current.value='All';
        orderWeight.current.value='All';
    }

    return(
        <div className={style.filters}>
            <h2>Filtros</h2>
            {/*Esto de abajo es para resetear los filtros*/}
            <button className={style.btnFilter} onClick={e=>{handleReset(e)}}>Reset Filters</button>

            {/*Esto de abajo son los ordenamientos*/}
            {/*Orden alfabetico*/}
            <h5>Alphabetical<br/>order</h5>
            <select onChange={(e)=>handleOrderByName(e)} ref={orderName} defaultValue='default'>
                <option value='default' disabled> - </option>
                <option value='asc'>A - Z</option>
                <option value='desc'>Z - A</option>
            </select>
                
            {/*Orden por peso*/}
            <h5>Order by weight</h5>
            <select onChange={(e)=>handleOrderByWeight(e)} ref={orderWeight} defaultValue='default'>
                <option value='default' disabled> - </option>
                <option value='asc'>Lower weight</option>
                <option value='desc'>Greater weight</option>
            </select>

            {/*Esto de abajo son los filtros*/}
            {/*Filtro por temperamento*/}
            <h5>Temperaments</h5>
            <select onChange={e=>handleFilterTemp(e)} ref={filterTemp} defaultValue='All'>
                <option value='All'>All temperaments</option>
                {allTemperaments?.map((temp)=>(
                        <option value={temp}>{temp}</option>
                ))}
            </select>
            {/*Filtro por origen*/}
            <h5>Origen</h5>
            <select onChange={e=>handleFilterOrigin(e)} ref={filterOrig} defaultValue='All'>
                <option value='All'>All dogs</option>
                <option value='API'>Existing dogs</option>
                <option value='DB'>Dogs created</option>
            </select>
        </div>
    )
}