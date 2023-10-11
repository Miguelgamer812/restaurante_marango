import React from "react";
import { NavLink } from 'react-router-dom';
import '../../index.css';

const Sidebar = () => {
    return (
        <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
            <div className="p-6">
                <p className="upercase text-white text-2x1 tracking-wide text-center font-bold">Restaurante Marango</p>
                <p className="mt-3 text-gray-600">Administra tu restaurante a las siguientes opciones:</p>

                <nav className="mt-10">
                    <NavLink className="p-1 text-gray-600 block hover:bg-yellow-500 hover:text-gray-900" end to="/">Orders</NavLink>
                    <NavLink className="p-1 text-gray-600 block hover:bg-yellow-500 hover:text-gray-900" end to="/menu">Menu</NavLink>
                </nav>
            </div>
        </div>
    );
}
export default Sidebar