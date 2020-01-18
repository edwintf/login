 import React, { Component } from "react"
import "./login.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import data from "../config"

firebase.initializeApp({
  apiKey: data.apiKey,
  authDomain:data.authDomain
})

class login extends Component {
  state = { isSignedIn: false }
  state2 = { isSignedIn2: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //  firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  uiConfig2 = {
    signInFlow2: "popup",
    signInOptions: [
   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  change(){
    this.setState({
      isSignedIn: false
    })
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
            
            {this.state2.isSignedIn2 ? (
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
            ):(
              <span> 
              <div className="titulo">Verificacion de cuenta</div>
              <StyledFirebaseAuth
          uiConfig={this.uiConfig2}
            firebaseAuth={firebase.auth()}
          />
          <br></br>
            <button onClick={() => firebase.auth().signOut()} className="btn-salir" >Cancelar</button>
            </span>
            )}
          </span>
        ) : (
          <span>
          <h2>Login Firebase Ed</h2>
          <StyledFirebaseAuth
          uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <br></br>
          </span>
        )}
      </div>
    )
  }
}

export default login