import firebase from 'firebase'
import axios from 'axios'
import route from './route'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class dbHandel {
  // Initialize Firebase
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.serverAlive = false
    this.username = "mor bargig"
  }

  newPdf = async () => {
    if (!this.serverAlive) {
      firebase.database().ref(`CV/${this.username}/`).set({
        HebPDF: '',
        EngPDF: '',
        language: 'EngPDF',
        linkedin: '',
      });
    } else {
      await axios.get(`${route}newPdf`)
    }
  }

  getPdf = async () => {
    // if (this.serverAlive) {
    //   this.serverAlive = (await axios.get(`${route}isAlive`)).data === 200
    // }
    if (!this.serverAlive) {
      let data
      await firebase.database().ref(`CV/${this.username}/`).once('value').then((snap) => {
        data = snap.val()
        // console.log(snap.val())
      });
      // console.log(data)
      return data
    } else {
      const res = await axios.get(`${route}getPdf`)
      return res.data[0]
    }
  }

  uplodadPdf = async (uploadedImage, noServerUploade = false) => {
    if (!this.serverAlive || noServerUploade) {
      try {

        const storageRef = firebase.storage().ref();
        const fileRef = storageRef
          .child(`/CV/${this.username}/${uploadedImage.name}`);

        const uploadTaskSnapshot = await fileRef.put(uploadedImage);

        return await uploadTaskSnapshot.ref.getDownloadURL();
      }
      catch (error) {
        console.log("ERR ===", error);
        alert("Image uploading failed!");
      }

    }
    else {
      return this.uplodadPdf(uploadedImage, noServerUploade = true)
      // let data = new FormData();
      // data.append("file", uploadedImage);

      // await axios.post(`${route}uploadPdf`, data).then(res => { // then print response status
      //   console.log(res.statusText)
      // })
    }
  }

  updatePdf = async (upDate) => {
    if (!this.serverAlive) {
      let data
      await firebase.database().ref(`CV/${this.username}/`).once('value').then((snap) => {
        data = snap.val()
      });

      for (let i in upDate) {
        if (upDate[i]) {
          data[i] = upDate[i]
        }
      }
      // console.log(data)
      await firebase.database().ref(`CV/${this.username}`).set({
        HebPDF: data.HebPDF,
        EngPDF: data.EngPDF,
        language: data.language,
        linkedin: data.linkedin,
      });
    } else {
      await axios.put(`${route}updatePdf/`, upDate)
    }
  }
}


export default new dbHandel()

