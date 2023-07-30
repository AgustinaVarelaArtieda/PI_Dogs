const {Dog}=require('../../db');

const getAllDogs=require('./getDogs');

const dogsIDByDB=async(id)=>{
    let dogDB=await Dog.findByPk(id);
    
    return dogDB;
};

const dogsIDByAPI=async(id)=>{
    let allDogs=await getAllDogs();

    let dogID=allDogs.find(el=>el.id===Number(id));
    
    if(!dogID)throw Error(`No se han encontrado perros con el id ${id}`);

    return dogID;
}

module.exports={dogsIDByAPI,dogsIDByDB};