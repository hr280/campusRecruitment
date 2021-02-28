import firebase from 'firebase';

const config = {
	// paste config object here
 };

const initializeFirebase = () => firebase.initializeApp(config);

export default initializeFirebase;
