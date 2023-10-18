import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import VerPlatos from '../ui/verPlatos';

const Menu = () => {
  const { firebase } = useContext(FirebaseContext);
  const [platosIds, setPlatosIds] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.db.collection('plato').onSnapshot(snapshot => {
      const ids = snapshot.docs.map(doc => doc.id);
      setPlatosIds(ids);
    });

    return () => {
      // Limpiar el listener cuando el componente se desmonte
      unsubscribe();
    };
  }, [firebase.db]);

  return (
    <>
      <h1 className='text-center m-4 font-light text-3xl text-purple-950'>Bienvenidos</h1>
      <h1 className='text-sky-600 m-4 font-light text-3xl'>Este es el Menú</h1>
      <Link
        to='/plato'
        className='ml-3 bg-gray-500 hover:bg-blue-600 inline-block mb-5 p-2 text-white uppercase font-bold'
      >
        Agregar un Plato
      </Link>

      {/* Renderizar los platos usando el componente VerPlatos */}
      {platosIds.map(id => (
        <VerPlatos key={id} id={id} />
      ))}
    </>
  );
};

export default Menu;
