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
            let sortArr= [...state.dogs]; 
            let newSort=action.payload;

            sortArr.sort(function(a,b){
                if (a.name > b.name){
                    return newSort === 'asc' ? 1 : -1;
                }
                if (a.name < b.name){
                    return newSort === 'asc' ? -1 : 1; 
                }
                return 0
            })

            return{
                ...state,
                dogs:sortArr,
            };

        //Para ordenar por peso
        case ORDER_BY_WEIGHT:
            let weightOrder=[...state.dogs];
            let sortWeight=action.payload

            weightOrder.sort(function(a, b) {
                const weightA = Number(a.weight_min) || 0;
                const weightB = Number(b.weight_min) || 0;
            
                if (weightA !== weightB) {
                  if (sortWeight === "desc") {
                    return weightB - weightA;
                  } else if (sortWeight === "asc") {
                    return weightA - weightB;
                  }
                } else {
                  const maxWeightA = Number(a.weight_max)|| 0;
                  const maxWeightB = Number(b.weight_max)|| 0;
            
                  if (maxWeightA !== maxWeightB) {
                    if (sortWeight === "desc") {
                      return maxWeightB - maxWeightA;
                    } else if (sortWeight === "asc") {
                      return maxWeightA - maxWeightB;
                    }
                  }
                }
            
                return 0;
            });

            return{
                ...state,
                dogs: weightOrder
            }

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
                tempFilters = state.allDogs.filter((dog) => {
                    if(dog.temperament){
                        //Dividimos la cadena de temperamentos y eliminamos los espacios en blanco
                        const temperaments = dog.temperament.split(',').map((t) => t.trim());
                        // verificamos si el temperamento del perro coincide exactamente con el valor del payload
                        return temperaments.includes(action.payload);
                    }
                    return false
                });
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