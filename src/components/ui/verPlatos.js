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

  return (
    <>
      <div className='w-full px-3 mb-4'>
        <div className='p-5 shadow-md bg-white'>
          <div className='lg:flex'>
            <img src={imagen} alt='Imagen de platillo' />
            <label>
              <span>Existencias</span>
              <select value={existencia ? 'true' : 'false'}>
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
      </div>
    </>
  );
};

export default VerPlatos;