import React from "react";

import style from './pagination.module.css'

//Este componente renderiza los numeritos en si
export default function Pagination({dogsPerPage, allDogs, paginated, currentPage}){
    const pageNumber=[]

    for(let i=1;i<=Math.ceil(allDogs/dogsPerPage);i++){
        pageNumber.push(i)
    }

    return(
      <nav className={style.page}>
        <ul className={`pagination ${style.pagination}`}>
         {pageNumber?.map((number, index) => {
      // Verificar si el número de página es igual a la página actual o si es adyacente a la página actual
      if (number===currentPage || Math.abs(number-currentPage)===1) {
        return (
          <li className={`${style.number} ${currentPage===number? style.active:''}`} key={number}>
            <button className={style.btn} onClick={()=>paginated(number)}>
              {number}
            </button>
          </li>
        );
      } else if (index===0) {
        // Renderizar el primer número de página como el inicio de la paginación
        return (
          <li className={`${style.number}`} key={number}>
            <button className={style.btn} onClick={() => paginated(number)}>
              {number}
            </button>
          </li>
        );
      } else if (index===pageNumber.length-1) {
        // Renderizar el último número de página como el final de la paginación
        return (
          <li className={`${style.number}`} key={number}>
            <button className={style.btn} onClick={() => paginated(number)}>
              {number}
            </button>
          </li>
        );
      }
      // Omitir el renderizado de otros números de página
      return null;
      })}
        </ul>
      </nav>
    )
}