import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config.js';

class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig); // Inicializa la app con la configuración
        this.db = getFirestore(app); // Obtiene una instancia de Firestore usando la app inicializada
    }
}

const firebase = new Firebase();

export default firebase;