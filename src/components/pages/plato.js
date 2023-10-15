import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase'
import FileUploader from 'react-firebase-file-uploader';
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage();
// const storageRef = ref(storage, 'imagenes'); // Crear una referencia a la carpeta 'imgproductos'


const Plato = () => {

    const [subiendo, setSubiendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [urlImagen, setUrlimagen] = useState('');

    const { firebase } = useContext(FirebaseContext);

    console.log({ FirebaseContext });

    const navigate = useNavigate();

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
                .min(0, 'La categoria debe tener minimo 5 caracteres')
                .required('la categoria del plato es requerida'),
            descripcion: Yup.string()
                .min(5, 'La descripcion debe tener minimo 5 caracteres')
                .required('La descripcion del plato es requerida'),
        }),
        onSubmit: plato => {
            try {
                plato.existencia = true;
                plato.imagen = firebase.db.collection('plato').add(plato);
                navigate('/menu');
            }
            catch (e) {
                console.log(e);
            }
        }
    })

    //metodos para el manejo de imágenes
    const handleUploadStart = () => {
        setProgreso(0);
        setSubiendo(true);
    }
    const handleUploadError = error => {
        setSubiendo(false);
        console.log(error);
    }
    const handleUploadSuccess = async nombreImagen => {
        setSubiendo(false);
        setProgreso(100);
        try {
            const urlImagen = await getDownloadURL(ref(storage, `imagenes/${nombreImagen}`)); // Obtiene la URL de descarga de la imagen
            setUrlimagen(urlImagen);

            // Guarda la URL de la imagen en la base de datos Firestore
            const plato = {
                nombre: formik.values.nombre,
                precio: formik.values.precio,
                categoria: formik.values.categoria,
                imagen: urlImagen, // Agrega la URL de la imagen como un campo en tu documento Firestore
                descripcion: formik.values.descripcion
            };

            await firebase.db.collection('plato').add(plato);
            navigate('/menu');
        } catch (error) {
            console.error('Error al guardar la URL de la imagen en Firestore: ', error);
        }
    }


    const handleProgress = progreso => {
        setProgreso(progreso);
        console.log(progreso);
    }

    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form onSubmit={formik.handleSubmit}>
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
                        {formik.touched.nombre && formik.errors.nombre ? (<p className="text-red-700">{formik.errors.nombre}</p>) : null}

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
                        {formik.touched.precio && formik.errors.precio ? (<p className="text-red-700">{formik.errors.precio}</p>) : null}

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
                        {formik.touched.categoria && formik.errors.categoria ? (<p className="text-red-700">{formik.errors.categoria}</p>) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">imagen del plato</label>
                            {/* <input className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
                                id="imagen"
                                type="file"
                                accept="png"
                                value={formik.values.imagen}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            /> */}
                            <FileUploader
                                accept="image/*"
                                name="imagen"
                                id="imagen"
                                randomizeFilename
                                storageRef={firebase.storage.ref("imagenes")} // Pasa la referencia al componente FileUploader
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
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