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
                    <text>Hacer este proyecto de crear una pagina web fue un proceso con altibajos, pero al ver a mi peludo Milo todos los dias me recordaba que tenia que volver a la carga con la pagina.
                        <br/>
                        Al realizarla pude reafirmar y volcar lo aprendido en el curso de Henry, mejorar mis practicas de codeo y, especialmente, aprender a solucionar bugs! 
                    </text>
                    <h2>Sobre mi:</h2>
                    <text>Paso mi tiempo libre leyendo, viendo anime o jugando en la grieta del invocador. Mi autor favorito es Brandon Sanderson!
                        <br/>
                        Una de mis aspiraciones en este nuevo camino de programacion que he elegido es llegar a trabajar en un videojuego o en la empresa de RIOT para sacar skins legendarias a mis campeones favoritos (Tranquilo Malza, tu seras el primero).
                        <br/>
                        <p>{'{'}</p>
                    </text>
                </div>
            </div>
            </div>
        </div>
    )
}