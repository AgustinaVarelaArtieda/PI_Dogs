const getTemperaments=require('../controllers/Temperaments/getTemperaments');

const getAllTemperaments=async(req,res)=>{
    try {
        const temps = await getTemperaments();

        return res.status(200).json(temps);
        
    } catch (error) {
        res.status(400).send({error:error.message});
    };
};

module.exports=getAllTemperaments;