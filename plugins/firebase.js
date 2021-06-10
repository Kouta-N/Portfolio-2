import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDdTSPdAoE7WN2E5kEGtDP2jOdjYFLMQpw',
    authDomain: 'yourcoach-21414.firebaseapp.com',
    projectId: 'yourcoach-21414',
    storageBucket: 'yourcoach-21414.appspot.com',
    messagingSenderId: '172171539847',
    appId: '1:172171539847:web:b57688b664acb0461b0f22',
    measurementId: 'G-Q6X3W5TCMV',
  })
}

export default firebase
