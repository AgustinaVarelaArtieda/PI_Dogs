import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { postDog, getTemps } from '../../redux/actions'

import validate from './validates'

import styles from './newDog.module.css'
import NavBar from '../navBar/navBar'

export default function FormPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Traigo los temperamentos del estado Global
    const allTemperaments = useSelector((state) => state.dogTemps); 

    //Creo un estado Local para los inputs del form
    const [newDog, setNewDog] = useState({
        name: '',
        image:'',
        life_span:'',
        weight_min: '',
        weight_max: '',
        height_min: '',
        height_max: '',
        temperament: []
    });

    //Creo un estado Local para los errors
    const [errors, setErrors] = useState({});

    //Para renderizar los temperamentos
    useEffect(()=>{
        dispatch(getTemps())
    },[dispatch]);

    function handleChange(e){
        e.preventDefault();
        //Para guardar los inputs
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        });

        //Para verificar las validaciones
        setErrors(validate({
            ...newDog,
            [e.target.name]: e.target.value
        }));
    };

    //Para el select de los temperamentos
    function handleTemperament(e){
        e.preventDefault();
        const selectedTemperament=e.target.value;

        if (newDog.temperament.includes(selectedTemperament)) {
            setNewDog({
              ...newDog,
              temperament: newDog.temperament.filter(temp => temp !== selectedTemperament)
            });
          } else {
            setNewDog({
              ...newDog,
              temperament: [...newDog.temperament, selectedTemperament]
            });
          }
    };

    //Para eliminar algun temperamento que agregue por error
    function handleTemperamentDelete(temperament){
        const updatedTemperaments = newDog.temperament.filter((temp) => temp !== temperament);
        setNewDog({
            ...newDog,
            temperament: updatedTemperaments
        });
    };

    //Para limpiar el input y cargar la info
    function handleSubmit(e){
        e.preventDefault();
        
        dispatch(postDog(newDog));

        alert('Dog created successfully!')

        setNewDog({
            name: '',
            image:'',
            life_span:'',
            weight_min: '',
            weight_max: '',
            height_min: '',
            height_max: '',
            temperament: []
        });

        //Me redirige a home
        navigate('/home');
    }

    return(
        <div>
            <NavBar/>
            
            <h1>New Dog!</h1>

            <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type="text" value={newDog.name} name='name' onChange={(e)=>handleChange(e)}></input>
                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </div>
                <div>
                    <label>Image</label>
                    <input type="text" value={newDog.image} name='image' onChange={(e)=>handleChange(e)}></input>
                    {errors.image && (
                        <span className="error">{errors.image}</span>
                    )}
                </div>
                <div>
                    <label>Life Span</label>
                    <input type="text" value={newDog.life_span} name='life_span' onChange={(e)=>handleChange(e)}></input>
                    {errors.life_span && (
                        <span className="error">{errors.life_span}</span>
                    )}  
                </div>
                <div>
                    <label>Weight Min</label>
                    <input type="text" value={newDog.weight_min} name='weight_min' onChange={(e)=>handleChange(e)}></input>
                    {errors.weight_min && (
                        <span className="error">{errors.weight_min}</span>
                    )}  
                </div>
                <div>
                    <label>Weight Max</label>
                    <input type="text" value={newDog.weight_max} name='weight_max' onChange={(e)=>handleChange(e)}></input>
                    {errors.weight_max && (
                        <span className="error">{errors.weight_max}</span>
                    )}  
                </div>
                <div>
                    <label>Height Min</label>
                    <input type="text" value={newDog.height_min} name='height_min' onChange={(e)=>handleChange(e)}></input>
                    {errors.height_min && (
                        <span className="error">{errors.height_min}</span>
                    )}  
                </div>
                <div>
                    <label>Height Max</label>
                    <input type="text" value={newDog.height_max} name='height_max' onChange={(e)=>handleChange(e)}></input>
                    {errors.height_max && (
                        <span className="error">{errors.height_max}</span>
                    )}
                </div>
                <div>
                    <label>Temperaments</label>
                    <select onChange={(e) => handleTemperament(e)} >
                        <option value="">Seleccione un temperamento</option>
                            {allTemperaments.map((temperament) => (
                                <option key={temperament} value={temperament}>
                                    {temperament}
                                </option>
                            ))}
                    </select>
                    {newDog.temperament.length > 0 && (
                     <div>
                        <p>Selected temperaments: </p>
                        {newDog.temperament.map((temp, index) => (
                            <p key={index}> {index===0 ? temp : `, ${temp}`} <button className='deleteTemp' type='button' onClick={() => handleTemperamentDelete(temp)}>x</button></p>
                        ))}
                     </div>
                    )}
                </div>

                <button type="submit">Create Dog!</button>
            </form>
        </div>
    )
}

//Para cargar una imagen(revisar si funciona bien)
// function handleImageChange(e) {
//     const file = e.target.files[0]; // Obtén el archivo de imagen seleccionado
//     setNewDog({
//       ...newDog,
//       image: URL.createObjectURL(file) // Establece la URL de la imagen como valor del estado newDog.image
//     });
//   }
/* <div>
  <label>Image</label>
  <input type="file" onChange={handleImageChange}></input>
</div> */