const getAllDogs=require('../controllers/Dogs/getDogs');
const getDogsByName=require('../controllers/Dogs/getDogsByName');
const createDog=require('../controllers/Dogs/postNewDog');
const {dogsIDByAPI,dogsIDByDB}=require('../controllers/Dogs/getDogsByIDRaza')

const getDogs = async (req,res) =>{
    const {name} = req.query;

    try {
        const dog=name? await getDogsByName(name) : await getAllDogs(); 
        
        res.status(200).json(dog);
        
    } catch (error) {
        res.status(400).send({error:error.message});
    };
};
 
const getDogsId = async (req,res) =>{
    const {id} = req.params;

    try {
        const data= isNaN(id)? await dogsIDByDB(id):await dogsIDByAPI(id); 

        res.status(200).json(data);

    } catch (error) {
        return res.status(400).send({error:error.message});
    };
};
 
const postDog = async (req,res) =>{   
    const {name,image,temperament,life_span,weight_min,weight_max,height_min,height_max}=req.body;
 
    try {
        const newDog=await createDog(name,image,temperament,life_span,weight_min,weight_max,height_min,height_max);
        
        res.status(200).json(newDog);

    } catch (error) {
        return res.status(400).json({error:error.message});
    };
};
 
module.exports={
    getDogs,
    getDogsId,
    postDog
}