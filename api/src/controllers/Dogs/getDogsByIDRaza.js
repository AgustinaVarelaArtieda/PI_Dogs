const {Dog,Temperament}=require('../../db');

const getAllDogs=require('./getDogs');

const dogsIDByDB=async(id)=>{
    //Busco en la DB por PrimaryKey
    let dogDB=await Dog.findByPk(id,{
        include:{
            model:Temperament,
            attributes:['name'],
            through:{attributes:[]}
        }
    });

    //Si no existe el perro retorno un error
    if(!dogDB)throw Error(`No se han encontrado perros en la DB con el id ${id}`);

    return dogDB;
};

const dogsIDByAPI=async(id)=>{
    //Traigo todos los perros
    let allDogs=await getAllDogs();

    //Busco el perro, los de la API tienen un id numérico
    let dogID=allDogs.find(el=>el.id===Number(id));
    
    //Si no existe el perro retorno un error
    if(!dogID)throw Error(`No se han encontrado perros en la API con el id ${id}`);

    return dogID;
}

module.exports={dogsIDByAPI,dogsIDByDB};