import axios from 'axios';

import { GET_TEMPS, GET_DOGS, GET_DOG_DETAILS, CLEAR_DOG_DETAILS, APPLY_FILTERS_AND_ORDER, SEARCH_DOG_NAME } from './typeActions';

//Para traer todos los dogs desde el back
export function getDogs(){
    return async function(dispatch){
        let info=await axios.get('/dogs');
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
            let info=await axios.get(`/dogs/${id}`);
            return dispatch({
                type:GET_DOG_DETAILS,
                payload:info.data
            });
        } catch(error){
            console.log(error.message)
            alert('We do not have details of that dog!');
        };
    };
};

//Para limpiar los detalles del perro
export function clearDogDetails(){
    return {
        type:CLEAR_DOG_DETAILS
    };
}

//Para buscar un dog por nombre
export function searchDogName(name){
    return async function(dispatch){
        try {
            let info=await axios.get(`/dogs?name=${name}`);
            return dispatch({
                type:SEARCH_DOG_NAME,
                payload:info.data
            });
        } catch(error){
           alert("We don't have the dog you are looking for!");
        };
    };
};

//Para traer los temperamentos
export function getTemps(){
    return async function(dispatch){
        let info=await axios.get('/temperaments');
        return dispatch({
            type:GET_TEMPS,
            payload:info.data
        });
    };
};

//Para crear un nuevo dog
export function postDog(dog){
    return async function(dispatch){
        const response=await axios.post('/dogs',dog);
        return response;
    };
};

//Para los filtros y ordenamientos
export function filterAndOrder(filtersAndOrder){
    return {
        type:APPLY_FILTERS_AND_ORDER,
        payload:filtersAndOrder
    };
};
