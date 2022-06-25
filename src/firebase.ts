import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

initializeApp({
  apiKey: 'AIzaSyAEXdoLQFlIS9KFsK5fbvauM5evP-Y062E',
  authDomain: 'kanban-test-34.firebaseapp.com',
  databaseURL: 'https://kanban-test-34-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'kanban-test-34',
  storageBucket: 'kanban-test-34.appspot.com',
  messagingSenderId: '32895675546',
  appId: '1:32895675546:web:aa17830cc1d7b3576c8323',
})

export default getFirestore()
