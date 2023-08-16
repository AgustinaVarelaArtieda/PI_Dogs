import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDogs, getTemps, filterAndOrder } from "../../redux/actions";

import style from './filters.module.css'

export default function Filters ({reset}){
    const dispatch = useDispatch();

    const allTemperaments=useSelector((state)=>state.dogTemps)

    const filterOrig = useRef(null);
    const filterTemp = useRef(null);
    const orderName = useRef(null);
    const orderWeight = useRef(null);

    //para renderizar los temperamentos
    useEffect(()=>{
        dispatch(getTemps());
    },[dispatch]);

    //Para aplicar los filtros y ordenamientos
    //tengo un problema con los ordenamientos, cuando cambio a peso o nombre funciona sin problemas, 
    //pero al cambiar de nombre a peso se debe seleccionar la opcion dos veces, porque la primera vez no aplica el ordenamiento

    function handleFilterAndOrder(e) {
        e.preventDefault();
        const origin = filterOrig.current.value;
        const temperament = filterTemp.current.value;
        let orderByName = orderName.current.value;
        let orderByWeight = orderWeight.current.value;
    
        //Cambio el valor del select y del order al default
        if(orderByName!=='Default'){
            orderWeight.current.value = "Default";
            orderByName = orderName.current.value;
        }
        if(orderByWeight!=='Default'){
            orderName.current.value = "Default";
            orderByWeight = orderWeight.current.value;
        }

        const filtersAndOrder = {
          origin,
          temperament,
          orderByName,
          orderByWeight
        };

        dispatch(filterAndOrder(filtersAndOrder));

        reset(e)
      }

    //Reset Filters-sortings
    function handleReset(e){
        e.preventDefault();
        //Recargar/traer todos los perros
        dispatch(getDogs());

        //setea la paginacion a la primera pagina
        reset(e);

        //Establecer los valores de los filtros y ordenamientos a los predeterminados
        filterOrig.current.value='All';
        filterTemp.current.value='All';
        orderName.current.value='Default';
        orderWeight.current.value='Default';
    }

    return(
        <div className={style.filters}>
            <h2>Filtros</h2>
            {/*Esto de abajo es para resetear los filtros*/}
            <button className={style.btnFilter} onClick={e=>{handleReset(e)}}>Reset Filters</button>

            {/*Esto de abajo son los ordenamientos*/}
            {/*Orden alfabetico*/}
            <h5>Alphabetical<br/>order</h5>
            <select onChange={(e)=>handleFilterAndOrder(e)} ref={orderName} defaultValue='Default'>
                <option value='Default' disabled> - </option>
                <option value='nameAsc'>A - Z</option>
                <option value='nameDesc'>Z - A</option>
            </select>
                
            {/*Orden por peso*/}
            <h5>Order by weight</h5>
            <select onChange={(e)=>handleFilterAndOrder(e)} ref={orderWeight} defaultValue='Default'>
                <option value='Default' disabled> - </option>
                <option value='weightAsc'>Lower weight</option>
                <option value='weightDesc'>Greater weight</option>
            </select>

            {/*Esto de abajo son los filtros*/}
            {/*Filtro por temperamento*/}
            <h5>Temperaments</h5>
            <select onChange={e=>handleFilterAndOrder(e)} ref={filterTemp} defaultValue='All'>
                <option value='All'>All temperaments</option>
                {allTemperaments?.map((temp)=>(
                        <option value={temp} key={temp}>{temp}</option>
                ))}
            </select>
            {/*Filtro por origen*/}
            <h5>Origen</h5>
            <select onChange={e=>handleFilterAndOrder(e)} ref={filterOrig} defaultValue='All'>
                <option value='All'>All dogs</option>
                <option value='API'>Existing dogs</option>
                <option value='DB'>Dogs created</option>
            </select>
        </div>
    )
}