import React from 'react';
import firebase from '../firebase';
import AuthContext from '../contexts/auth';
import { Link, withRouter } from 'react-router-dom';



class Signup extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: '',
      password: '',
      error: ''
      }
    }



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
   
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("Response", response)
      this.props.history.push('constituent')
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
                <div className="container-fluid">
                <img src={logo} alt="logo"/>
                <div className="row">
                <div className="col-12">
                  {displayError}
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="signuplabel">EMAIL</label>
                      <input type="email" className="form-control" id="signupinput" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="signuplabel">PASSWORD</label>
                      <input type="password" className="form-control" id="signupinput" placeholder="Password" value={password} name="password" onChange={this.handleChange} />
                    </div>
                    <button class="btn waves-effect white waves-light" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleSubmit}>SIGN UP
                            <i class="material-icons right">send</i>
                    </button>
                  </form>
                  <br/>
                  <Link to='/login'><p className="login">Login</p></Link>
                  </div>
                  </div>
                  </div>
                </>
              )
            }
          }
        }
      </AuthContext.Consumer>

    );
  }
}

export default withRouter(Signup)