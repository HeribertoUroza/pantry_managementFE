import React from 'react';
import firebase from '../../firebase';
import { Link, } from 'react-router-dom';

//CSS
import './logout.css';

//ASSETS
import logo from '../../assets/Branding/PossiblePantryLogoWhite.png'



export default class Logout extends React.Component {

  componentDidMount() {
    firebase.auth().signOut()
  }

  render() {
    return <>
      <div className="container-fluid logoutContainer">
        <img src={logo} alt="logo" className="logoutLogo" />
        <div className="row">
          <div className="col"></div>
          <div className="col text-center">
            <div className="mt-5">
              <h3 className="boldText logoutH3">We Hope You Return Soon</h3>
              <br />
              <h4 className="mt-5 mb-2 logoutH4">Mistake...?</h4>
              <button className="btn waves-effect waves-light brown mt-5" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleSubmit}>LOGIN
                            <i className="material-icons right">send</i>
                              </button>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  }
}