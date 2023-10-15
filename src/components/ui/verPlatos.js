import React, { useRef, useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase';

const VerPlatos = ({ id }) => {
  const [platoData, setPlatoData] = useState(null);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = firebase.db.collection('plato').doc(id).onSnapshot(snapshot => {
      setPlatoData(snapshot.data());
    });

    return () => {
      // Limpiar el listener cuando el componente se desmonte
      unsubscribe();
    };
  }, [firebase.db, id]);

  if (!platoData) {
    return null; // Mientras los datos se cargan, no renderizar nada o puedes mostrar un indicador de carga
  }

  const { nombre, imagen, existencia, categoria, precio, descripcion } = platoData;

  const actualizarExistencias = () => {
    const nuevaExistencia = !existencia; // Cambiar el valor de existencia
    try {
      firebase.db.collection('plato').doc(id).update({ existencia: nuevaExistencia });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className='plato-item'>
        <img className='plato-imagen' src={imagen} alt='Imagen de platillo' />
        <div className='plato-info'>
          <label>
            <span>Existencias</span>
            <select value={existencia} onChange={actualizarExistencias}>
              <option value='true'>Disponible</option>
              <option value='false'>No Disponible</option>
            </select>
          </label>
          <div>
            <p>{nombre}</p>
            <p>{categoria}</p>
            <p>{descripcion}</p>
            <p>$ {precio}</p>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default VerPlatos;