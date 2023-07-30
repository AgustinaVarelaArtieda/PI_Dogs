const getAllDogs=require('./getDogs');

const getDogsByName=async(name)=>{
    //Traigo todos los perros
    let allDogs=await getAllDogs();

    //Busco el perro
    let dogName=allDogs.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()));
    
    //Si no existe el perro retorno un error
    if(dogName.length===0)throw Error(`No se han encontrado perros con el nombre ${name}`);

    return dogName;
}

module.exports=getDogsByName;