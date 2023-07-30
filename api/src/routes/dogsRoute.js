const {Router}=require('express');

const {getDogs,getDogsId,postDog}=require('../handlers/dogsHandler');

const dog=Router();

dog.get('/',getDogs);
dog.get('/:id',getDogsId);
dog.post('/',postDog);

module.exports=dog;