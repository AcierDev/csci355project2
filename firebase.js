
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
 apiKey: "AIzaSyAqG3uwzRGEkDtdiLYXlRECwtewog9KnE8",
 authDomain: "pro2-31ac0.firebaseapp.com",
 projectId: "pro2-31ac0",
 storageBucket: "pro2-31ac0.firebasestorage.app",
 messagingSenderId: "979495892487",
 appId: "1:979495892487:web:208d33af46c55956869ca2"
 };
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };