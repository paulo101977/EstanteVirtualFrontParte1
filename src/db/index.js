

// the main imports
import firebase from 'firebase'

//the database db
import { FIRE_URL } from '../config/'

// Setup Firebase
var config = {
  databaseURL: FIRE_URL
}

var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()



export default  db;
