const { UUID } = require('sequelize');
const {Dog}=require('../../db');

const getAllDogs=require('./getDogs');

const dogsIDByDB=async(id)=>{
    //Verifico que el id sea uno del tipo de mi DB
    if(typeof id !== UUID)throw Error(`No se han encontrado perros con el id ${id}`);

    //Busco en la DB por PrimaryKey
    let dogDB=await Dog.findByPk(id);
    return dogDB;
};

const dogsIDByAPI=async(id)=>{
    //Traigo todos los perros
    let allDogs=await getAllDogs();

    //Busco el perro, los de la API tienen un id numérico
    let dogID=allDogs.find(el=>el.id===Number(id));
    
    //Si no existe el perro retorno un error
    if(!dogID)throw Error(`No se han encontrado perros con el id ${id}`);

    return dogID;
}

module.exports={dogsIDByAPI,dogsIDByDB};