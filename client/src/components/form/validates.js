export default function validate(newDog){
    let errors={}

    //Validaciones regex
    const numEnteroPositivo=/^[1-9]\d*$/;
    const noNumeros=/^[^\d]*$/;

    //Errores en nombre
    if(!newDog.name){
        errors.name="Name is required."
    }else if(!noNumeros.test(newDog.name)){
        errors.name="The name must not contain numbers."
    }else errors.name=null

    //Errores en weight
    if(!newDog.weight_min){
        errors.weight_min="Weight min is required."
    }else if(!numEnteroPositivo.test(newDog.weight_min)){
        errors.weight_min="Weight min must be a number."
    }else errors.weight_min=null

    if(!newDog.weight_max){
        errors.weight_max="Weight max is required."
    }else if(!numEnteroPositivo.test(newDog.weight_max)){
        errors.weight_max="Weight max must be a number."
    }else {
        //Para comparar min y max primero los transformo a number
        const weightMin = parseInt(newDog.weight_min);
        const weightMax = parseInt(newDog.weight_max);

        if (weightMin && weightMax < weightMin) {
            errors.weight_max = "Weight max must be greater than the Weight min.";
        }else if(newDog.weight_max>110){
            errors.weight_max="Weight max must be less than 110kg."
        }else errors.weight_max=null
    }

    //Errores en height
    if(!newDog.height_min){
        errors.height_min="Height min is required."
    }else if(!numEnteroPositivo.test(newDog.height_min)){
        errors.height_min="Height min must be a number."
    }else errors.height_min=null

    if(!newDog.height_max){
        errors.height_max="Height max is required."
    }else if(!numEnteroPositivo.test(newDog.height_max)){
        errors.height_max="Height max must be a number."
    }else {
        const heightMin = parseInt(newDog.height_min);
        const heightMax = parseInt(newDog.height_max);
        if (heightMin && heightMax < heightMin) {
            errors.height_max = "Height max must be greater than the Height min.";
        }else if(newDog.height_max>120){
            errors.height_max="Height max must be less than 120cm."
        }else errors.height_max=null
    }

    //Errores en life_span
    if(!newDog.life_span){
        errors.life_span="Life span is required"
    }else if(!numEnteroPositivo.test(newDog.life_span)){
        errors.life_span="Lifespan must be a number."
    }else if(newDog.life_span>20){
        errors.life_span="Dogs have an average lifespan of 20 years."
    }else errors.life_span=null

    //Errores en temperamentos
    if(newDog.temperament.length===0){
        errors.temperament="At least one temperament is required."
    }else errors.temperament=null

    return errors
}