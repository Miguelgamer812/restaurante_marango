import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config.js';
import { getStorage, ref } from 'firebase/storage'; // Importa getStorage desde 'firebase/storage'


class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig); // Inicializa la app con la configuración
        this.db = getFirestore(app); // Obtiene una instancia de Firestore usando la app inicializada
        this.storage = getStorage(app); // Obtiene una instancia del servicio de almacenamiento en la nube
    }
}

const firebase = new Firebase();

export default firebase;