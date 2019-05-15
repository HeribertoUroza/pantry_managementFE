import React from 'react';
import firebase from '../../firebase';
import { Redirect, Link, withRouter } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

//ASSETS
import logo from '../../assets/Branding/PossiblePantryLogo3.svg'


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
      .then((response) => {
        console.log('Returns: ', response);
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
                <div className="container-fluid">
                  <div className="row">
                    <img src={logo} alt="logo"/>
                    <div className="col-12">
                      {displayError}
                      <form>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1" className="signuplabel">EMAIL</label>
                          <input type="email" className="form-control" id="signupinput" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1" className="signuplabel">PASSWORD</label>
                          <input type="password" className="form-control" id="signupinput" placeholder="Password" value={password} name="password" onChange={this.handleChange} />
                        </div>
                        <button className="btn waves-effect white waves-light" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleSubmit}>LOGIN
                            <i className="material-icons right">send</i>
                        </button>
                      </form>
                      <br />
                      <Link to='/signup'><p className="login">Sign Up</p></Link>
                    </div>
                  </div>
                </div>
              )
            }
            else {
              return (<Redirect to='/' />)
            }
          }
        }
      </AuthContext.Consumer>

    );
  }
}

export default withRouter(Login)