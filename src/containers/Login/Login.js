import React from 'react';
import firebase from '../../firebase';
import { Redirect, Link, withRouter } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './login.css'

//ASSETS
import logo from '../../assets/Branding/PossiblePantryLogoWhite.png'


class Login extends React.Component {

  state = {
    email: '',
    password: '',
    error: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
      })
  }

  render() {
    const { email, password, error } = this.state;
    const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>

    return (
      <AuthContext.Consumer>
        {
          (user) => {
            if (!user) {
              return (
                <>
                <div className="container-fluid loginContainer">
                <div className="row">
                <div className="col"></div>
                <div className="col">
                <img src={logo} alt="logo" className="loginLogo"/>
                </div>
                <div className="col">
                <div className="text-center" style={{marginTop: "200px"}}>
                  {displayError}
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="whiteText boldText">EMAIL</label>
                      <input type="email" className="form-control whiteForm" id="signupinputemail" aria-describedby="emailHelp" name="email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="whiteText boldText">PASSWORD</label>
                      <input type="password" className="form-control" id="signupinputpassword" value={password} name="password" onChange={this.handleChange} />
                    </div>
                    <button className="btn waves-effect waves-light navy mt-5" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleSubmit}>LOGIN
                            <i className="material-icons right">send</i>
                    </button>
                    <p className="whiteText mt-3">Don't have an account? <Link to='/signup' className="landingLinkLogin">Sign Up</Link></p>
                  </form>
                  </div>
                  </div>
                  <div className="col"></div>
                  </div>
                  </div>
                </>
              )
            }
            else {
              return (<Redirect to='/dashboard' />)
            }
          }
        }
      </AuthContext.Consumer>

    );
  }
}

export default withRouter(Login)