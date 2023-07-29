const {Dog,Temperament}=require('../../db')  //traigo los modelos desde la BASEDEDATOS

const {Op}=require('sequelize')

const createDog=async(name,image,temperament,life_span,weight_min,weight_max,height_min,height_max)=>{
    
    //Verifico que se ingresen todos los datos necesarios
    if(!name||!image||!temperament||!life_span||!weight_min||!weight_max||!height_min||!height_max)throw Error('faltan datos');
    
    //Verifico que no exista el dog en la DB
    const dog=await Dog.findOne({
        where:{name:{[Op.iLike]: `${name}`}}
    });
    if(dog) throw Error(`El perro ${name} ya fue creado, su id es ${dog.id}`);

    //Creo un nuevo perro
    const newDog=await Dog.create({
        name,
        image,
        temperament,
        life_span,
        weight_min,
        weight_max,
        height_min,
        height_max,
    });

    //Relacion tablas de DB Dog y Temperament
    //Primero busco los registros de Temperament que coincidan con los ingresados y los filtro
    const temperamentObj=await Temperament.findAll({
        where:{name:temperament}
    });
    //Luego asocio el temperamento encontrado con el perro creado
    await newDog.addTemperament(temperamentObj);

    //Para obtener los datos de ambas tablas(el perro con sus temperamentos)
    newDog=await Dog.findByPk(newDog.id, {
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });

    return newDog;
};

module.exports=createDog;