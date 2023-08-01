import { GET_TEMPS, GET_DOGS, GET_DOG_DETAILS, FILTER_BY_TEMP, FILTER_ORIGIN, ORDER_BY_NAME, ORDER_BY_WEIGHT, SEARCH_DOG_NAME, POST_DOG } from './typeActions';

//Creo los estados globales
const initialState={
    dogs:[],
    allDogs:[],     //me sirve de backup para los filtros y ordenamientos
    dogDetails:[],
    dogTemps:[],
};

function rootReducer(state=initialState, action){
    switch(action.type){
        //Para traer todos los dogs
        case GET_DOGS:
            return{
                ...state,
                dogs:action.payload,
                allDogs:action.payload
            };
        
        //Para traer los detalles de un dog
        case GET_DOG_DETAILS:
            return{
                ...state,
                dogDetails:action.payload
            };
        
        //Para buscar un dog por nombre
        case SEARCH_DOG_NAME:
            return{
                ...state,
                dogs:action.payload
            };
                
        //Para traer los temperamentos
        case GET_TEMPS:
            return{
                ...state,
                dogTemps:action.payload
            };
        
        //Para crear un nuevo dog
        case POST_DOG:
            return{
                ...state,
                dogs:action.payload //revisar esto
            };    
        
        //Para ordenar por nombre
        case ORDER_BY_NAME:
            let sortArr=[...state.dogs];
            sortArr.sort((a,b)=>a.name.localeCompare(b.name));
            return{
                ...state,
                dogs:sortArr,
            };

        //Para ordenar por peso
        case ORDER_BY_WEIGHT:
            let sortedArr=[...state.dogs];
            sortedArr.sort((a,b)=>a.weight-b.weight);
            return{
                ...state,
                dogs:sortedArr,
            };

        //Para filtrar por origen
        case FILTER_ORIGIN:
            let originFilters=[...state.dogs];
    
            if(action.payload==='All'){
                originFilters=[...state.allDogs]
            }else if(action.payload==='DB'){
                originFilters=state.allDogs.filter((dog)=>isNaN(dog.id))
            }else if(action.payload==='API'){
                originFilters=state.allDogs.filter((dog)=>!isNaN(dog.id))
            };
            return{
                ...state,
                dogs:originFilters,
            };
        
        //Para filtrar por temperamentos
        case FILTER_BY_TEMP:
            let tempFilters=[...state.dogs];

            if(action.payload==='All'){
                tempFilters=[...state.allDogs]
            } else{
                tempFilters=state.allDogs.filter((dog)=>dog.temperament.includes(action.payload))
            }
            return{
                ...state,
                dogs:tempFilters,
            };
        
        default:
            return state;
    }
};

export default rootReducer;