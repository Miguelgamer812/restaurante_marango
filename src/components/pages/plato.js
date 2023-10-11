import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

const Plato = () => {

    const formik = useFormik({
        initialValues: {
            nombre: '',
            precio: '',
            categoria: '',
            imagen: '',
            descripcion: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(5, 'El nombre debe tener minimo 5 caracteres')
                .required('El nombre del plato es requerido'),

            precio: Yup.number()
                .min(0, 'El El precio no debe ser inferior a cero')
                .required('El precio del plato es requerido'),

            categoria: Yup.string()
                .min(5, 'La categoria debe tener minimo 5 caracteres')
                .required('la categoria del plato es requerida'),
            descripcion: Yup.string()
                .min(5, 'La descripcion debe tener minimo 5 caracteres')
                .required('La descripcion del plato es requerida'),
        }),
        onSubmit: datos => {
            console.log(datos);
        }
    })
    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form>
                        <h1 className="text-sky-600 m-4 font-light text-3xl">Elija el plato</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre del plato</label>
                            <input className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
                                id="nombre"
                                type="text"
                                placeholder="Nombre del plato"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio del plato</label>
                            <input className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
                                id="precio"
                                type="number"
                                placeholder="$40"
                                min="0"
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoria del plato</label>
                            <select className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none" id="categoria"
                                value={formik.values.categoria}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}>
                                <option value="" default>Seleccionar...</option>
                                <option value="Desayuno">Desayuno</option>
                                <option value="Almuerzo">Almuerzo</option>
                                <option value="Cena">Cena</option>
                                <option value="Bebidas">Bebidas</option>
                                <option value="Postre">Postre</option>
                                <option value="Ensalada">Ensalada</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">imagen del plato</label>
                            <input className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
                                id="imagen"
                                type="file"
                                accept="png"
                                value={formik.values.imagen}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción del plato</label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
                                id="descripcion"
                                placeholder="descripción"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>

                        </div>

                        <input className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Agregar"
                            id="enviar"
                            type="submit" />

                    </form>
                </div>
            </div>
        </>
    );
}

<script src="http://localhost:8097"></script>
export default Plato