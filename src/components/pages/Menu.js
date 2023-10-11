import React from "react";
import { Link } from "react-router-dom";
const Menu = () => {
    return (
        <>
            <h1 className="text-center m-4 font-light text-3xl text-purple-950">Bienvenidos</h1>
            <h1 className="text-sky-600 m-4 font-light text-3xl">Este es el Menú</h1>
            <Link to="/plato" className="ml-3 bg-blue-800 hover:bg-blue-400,
            inline-block mb-5 p-2 text-white uppercase font-bold">Agregar un Plato</Link>
        </>
    );
}
export default Menu