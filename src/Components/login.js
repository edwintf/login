import React, { Component } from "react"
import "./login.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyAyuMvivyIEgRTRF51ltk745z12NXP3yPI",
  authDomain: "login-bd259.firebaseapp.com"
})

class login extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      //console.log("user", user)
      console.log({user:  user.displayName,
        correo:  user.email,
      })
    })
  }

  render() {
    return (
      <div className="login">
        {this.state.isSignedIn ? (
          <span>
            <div className="titulo">Bienvenido</div>
            <h1>{firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
            <br></br>
            <button onClick={() => firebase.auth().signOut()} className="btn-salir">Cerrar sesion</button>
          </span>
        ) : (
          <span>
          <h2>Login Firebase Ed</h2>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          /></span>
        )}
      </div>
    )
  }
}

export default login