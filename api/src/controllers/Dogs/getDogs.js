const axios=require('axios')

const {Dog, Temperament}=require('../../db')

const url='https://api.thedogapi.com/v1/breeds'

const getDogsFromAPI=async()=>{
    const {data}=await axios.get(url);

    //Extraigo solo la info que voy a utilizar
    const dogsAPI= data.map((el)=>{
        return {
            id:el.id,
            name:el.name,
            image:el.image.url,
            temperament:el.temperament,
            life_span:el.life_span,
            weight_min:el.weight.metric.split(' - ')[0],    //La info está en la API como un string, por eso hago un split, para separar el min y max
            weight_max:el.weight.metric.split(' - ')[1],
            height_min:el.height.metric.split(' - ')[0],
            height_max:el.height.metric.split(' - ')[1],
        };
    });

    return dogsAPI;
}

const getDogsFromDB=async()=>{

    //Traigo los perros de la DB
    const dogsDB=await Dog.findAll({
        include:{
            model:Temperament,
            attributes:['name'],
            through:{attributes:[]}
        }
    });

    return dogsDB;
}

const getAllDogs=async()=>{
    //Traigo la info de los perros de la API y la DB
    let [resDB, resAPI]=await Promise.all([getDogsFromDB(),getDogsFromAPI()]);
    
    //Paso a fomato json la info de la DB
    resDB=resDB?.map(el=>el.toJSON());
    
    //Guardo toda la info en un array y la retorno
    let allDogs=[...resDB,...resAPI];
    return allDogs;
}

module.exports=getAllDogs;