// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage, ref } from 'firebase/storage';
import firebaseConfig from './config.js';
import app from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

// class Firebase {
//     constructor() {
//         const app = initializeApp(firebaseConfig); // Inicializa la app con la configuración

//         const storage = getStorage(app); // Obtiene una instancia del servicio de almacenamiento en la nube
//         const storageRef = ref(storage, "gs://restaurantemarango.appspot.com"); // Crea una referencia a la carpeta 'imgproductos'

//         this.db = getFirestore(app); // Obtiene una instancia de Firestore usando la app inicializada
//         this.storage = storageRef; // Asigna la referencia del servicio de almacenamiento a la propiedad 'storage'
//     }
// }
class Firebase{
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
        }
        this.db = app.firestore();
        this.storage = app.storage();
    }
}

const firebase = new Firebase();
export default firebase;