import * as firebase from 'firebase';
import "firebase/firestore";
/* types */
import { Shop } from './types/shop';

if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyBdvEQOMGnA3J5tD1HxMuVNr3Vto0BF0zw",
        authDomain: "shop-review-8df06.firebaseapp.com",
        projectId: "shop-review-8df06",
        storageBucket: "shop-review-8df06.appspot.com",
        messagingSenderId: "104299107525",
        appId: "1:104299107525:web:950afe8cbbcf17fdb00cac",
        measurementId: "G-35B03KRTEV"
    }
    firebase.initializeApp(firebaseConfig);
}


export const getShops = async () => {
    const snapshot = await firebase.firestore().collection("shops").get();
    const shops = snapshot.docs.map(doc => doc.data() as Shop);
    return shops;
};