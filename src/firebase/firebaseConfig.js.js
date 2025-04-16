import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBOb2oTcTJFq6HzSM_YnpjT7mrRXYwAYoA',
	authDomain: 'react-900b4.firebaseapp.com',
	projectId: 'react-900b4',
	storageBucket: 'react-900b4.firebasestorage.app',
	messagingSenderId: '114363672690',
	appId: '1:114363672690:web:1ab2ded915ee8f6edafaeb',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
