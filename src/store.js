import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import 'firebase/firestore';

//Custom reducers
//@todo

const firebaseConfig = {
  apiKey: 'AIzaSyDWaticRwb5oYmU_CvdHoJJT4ioL9Mh_as',
  authDomain: 'payoneer-62d99.firebaseapp.com',
  databaseURL: 'https://payoneer-62d99.firebaseio.com',
  projectId: 'payoneer-62d99',
  storageBucket: 'payoneer-62d99.appspot.com',
  messagingSenderId: '153866526418'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
//asign it to a const named firestore
firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
