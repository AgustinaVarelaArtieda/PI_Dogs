const axios=require('axios');

const {Temperament}=require('../../db');

const {APIKEY} = process.env;

const url='https://api.thedogapi.com/v1/breeds';

const getTemperaments=async()=>{
    
    //Consulto si los temperamentos estan en la DB
    const temperamentsDB= await Temperament.findAll();

    //Extraigo solo los nombres de los temperamentos y los guardo en un ARRAY
    const allTemperamentsNames=temperamentsDB.map(el=>el.name);  

    //Si no hay temperamentos en mi DB, los extraigo de la API
    if(temperamentsDB.length===0){
        //Extraigo los temperamentos de cada perro
        const dogsAPI=await axios.get(url);
        const temps=await dogsAPI.data.map(el=>{
            return {
                temperament:el.temperament
            }});

        //Extraigo los nombres de los temperamentos de todos los perros
        const arrayTemps=temps.map(el=>el.temperament).join(', ').split(', ');
        
        //Creo un array para guardan los temperamentos sin repetir
        let temperamentos = []
        arrayTemps.forEach(element=>{
            if(!temperamentos.includes(element)){
                temperamentos.push(element);
            };
        });

        //Un elemento del array es un espacio vacio, por lo que procedo a eliminarlo
        temperamentos.sort().shift();

        //Guardo los nombres de los temperamentos en la DB
        temperamentos.map((tem) => {
            Temperament.findOrCreate({
                where:{name:tem},
                defaults:{name:tem}
            });
        });

        return temperamentsDB;
    };

    return allTemperamentsNames;
}

module.exports=getTemperaments;