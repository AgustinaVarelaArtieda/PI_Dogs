const getAllDogs=require('./getDogs');

const getDogsByName=async(name)=>{
    let allDogs=await getAllDogs();

    let dogName=allDogs.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()));
    
    if(dogName.length===0)throw Error(`No se han encontrado perros con el nombre ${name}`);

    return dogName;
}

module.exports=getDogsByName;