import axios from 'axios';

import { GET_TEMPS, GET_DOGS, GET_DOG_DETAILS, FILTER_BY_TEMP, FILTER_ORIGIN, ORDER_BY_NAME, ORDER_BY_WEIGHT, SEARCH_DOG_NAME } from './typeActions';

//Para traer todos los dogs desde el back
export function getDogs(){
    return async function(dispatch){
        let info=await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type:GET_DOGS,
            payload:info.data
        });
    };
};

//Para los detalles de un dog
export function getDogDetails(id){
    return async function(dispatch){
        try {
            let info=await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type:GET_DOG_DETAILS,
                payload:info.data
            });
        } catch(error){
            console.log(error.message)
            alert('No tenemos detalles de este perro!');
        };
    };
};

//Para buscar un dog por nombre
export function searchDogName(name){
    return async function(dispatch){
        try {
            let info=await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({
                type:SEARCH_DOG_NAME,
                payload:info.data
            });
        } catch(error){
           alert('El perro que buscas no existe!');
        };
    };
};

//Para traer los temperamentos
export function getTemps(){
    return async function(dispatch){
        let info=await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type:GET_TEMPS,
            payload:info.data
        });
    };
};

//Para crear un nuevo dog
export function postDog(dog){
    return async function(dispatch){
        const response=await axios.post('http://localhost:3001/dogs',dog);
        return response;
    };
};

//Para filtrar por temperamentos
export function filterByTemp(temp){
    return {
        type:FILTER_BY_TEMP,
        payload:temp
    };
};

//Para filtrar por origen
export function filterOrigin(origin){
    return {
        type:FILTER_ORIGIN,
        payload:origin
    };
};

//Para ordenar por nombre
export function orderByName(order){
    return {
        type:ORDER_BY_NAME,
        payload:order
    };
};

//Para ordenar por peso
export function orderByWeight(order){
    return {
        type:ORDER_BY_WEIGHT,
        payload:order
    };
};