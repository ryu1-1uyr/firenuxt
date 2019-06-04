import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {

    }
  )
}

export default firebase
