import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyBPL0aP6IEJ-vC3t-K5r_pA7rDR9D8HEIg",

  authDomain: "my-social-33395.firebaseapp.com",

  projectId: "my-social-33395",

  storageBucket: "my-social-33395.appspot.com",

  messagingSenderId: "577981775487",

  appId: "1:577981775487:web:f0b272a0c2ac933f0e094a"

  
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db,auth,storage};
  