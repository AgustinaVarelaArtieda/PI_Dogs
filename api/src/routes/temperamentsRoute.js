const {Router}=require('express');

const getAllTemperaments=require('../handlers/temperamentsHandler');

const temperaments=Router();

temperaments.get('/',getAllTemperaments);

module.exports=temperaments;