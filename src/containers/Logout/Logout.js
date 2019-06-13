import React from 'react';
import firebase from '../../firebase';
import { Link, } from 'react-router-dom';

//CSS
import './logout.css';

//ASSETS
import logo from '../../assets/Branding/LogoRedesignClearBackground.png'
import video from '../../assets/Videos/42ed5148acd91b1c8cb763db3e0d478a.mp4';



export default class Logout extends React.Component {

  state = {
    videoURL: video,
  }

  componentDidMount() {
    firebase.auth().signOut()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/login')
  }

  render() {
    return <>
      <video id="myVideo" loop muted autoPlay>
                    <source src={this.state.videoURL} type="video/mp4" />
                  </video>
        <div className="row">
          <div className="col"></div>
          <div className="col text-center">
            <div className="mt-5">
            <img src={logo} alt="logo" className="logoutLogo" />
              <h3 className="boldText logoutH3">We Hope You Return Soon</h3>
              <br />
              <h4 className="mt-5 mb-2 logoutH4" style={{color: "white"}}>Mistake...?</h4>
              <button className="btn waves-effect waves-light red mt-5" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px', color: "white" }} onClick={this.handleSubmit}>LOGIN
                              </button>
            </div>
          </div>
          <div className="col"></div>
        </div>
    </>
  }
}