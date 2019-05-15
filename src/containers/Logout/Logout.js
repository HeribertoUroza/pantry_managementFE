import React from 'react';
import firebase from '../../firebase';
import { Link,  } from 'react-router-dom';
import logo from '../../assets/Branding/PossiblePantryLogo3.svg'



export default class Logout extends React.Component {

  componentDidMount() {
    firebase.auth().signOut()
  }

  render() {
    return <>
    <div className="container-fluid" style={{fontFamily:"monospace"}}>
    <img src={logo} alt="logo"/>
    <h3>We Hope You Return Soon</h3>
    <br/>
    <h4>Mistake...?</h4>
    <h6><Link to="/login">Log Back In</Link></h6>
    </div>
    </>
  }
}