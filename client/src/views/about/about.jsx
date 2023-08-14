import {Link} from 'react-router-dom'

import style from './about.module.css'

export default function AboutPage(){
    
    return(
        <div className={style.layout}>
            <Link to='/home'>
                <button className={style.btnHome}>+ HOME +</button>
            </Link>
            <div className={style.contenedor}>

                <h1>Hola! Me llamo Agustina Varela</h1>
            <div className={style.info}>
                <div className={style.info1}>
                    <div className={style.foto}/>
                    <div className={style.platfomrs}>
                        <h3>Contact me:</h3>
                        <div className={style.btnsContact}>
                        <a href='https://www.linkedin.com/in/agustina-varelaa/' rel="noopener noreferrer" target="_blank"><button className={style.linkedin}><span className={style.tooltip1}>@AgustinaVarela</span></button></a>
                        <a href='https://github.com/AgustinaVarelaArtieda' rel="noopener noreferrer" target="_blank"><button className={style.github}><span className={style.tooltip2}>@AgustinaVarelaArtieda</span></button></a>
                        </div>
                    </div>
                </div>
                <div className={style.info2}>
                    <span>Hacer este proyecto de crear una pagina web fue un proceso con altibajos, pero al ver a mi peludo Milo todos los dias me recordaba que tenia que volver a la carga con la pagina.
                        <br/>
                        Al realizarla pude reafirmar y volcar lo aprendido en el curso de Henry, mejorar mis practicas de codeo y, especialmente, aprender a solucionar bugs! 
                    </span>
                    <div className={style.bot}>
                    <h2>Sobre mi:</h2>
                    <span>Paso mi tiempo libre leyendo, viendo anime o jugando en la grieta del invocador. Mi autor favorito es Brandon Sanderson!
                        <br/>
                        Una de mis aspiraciones es llegar a crear o trabajar en un videojuego, seria genial trabajar en la empresa de RIOT para sacar skins legendarias a mis campeones favoritos (Malzahar tu seras el primero).
                        <br/>
                        <p>{'{'}</p>
                    </span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}