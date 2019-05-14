import './App.css';
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import firebase from './firebase';

// ---- Pages
import HomeContainer from './containers/home';
import Signup from './containers/signup';
import Login from './containers/login';
import Logout from './containers/logout';
import Error404 from './components/error404';



// ---- Context
import AuthContext from './contexts/auth';


class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
      this.unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          this.setState({
            user: user,
      })
    }
    else{
      this.setState({user: null})
    }
  })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render() {
    return (
      <HashRouter>
        <AuthContext.Provider value={this.state.user}>
          <Switch>
              <Route path='/' exact component={ HomeContainer } />
              <Route path='/signup' exact component={ Signup } />
              <Route path='/login' exact component={ Login } />
              <Route path='/logout' exact component={ Logout } />
              <Route component={Error404}/>
            </Switch>
          </AuthContext.Provider>
      </HashRouter>
    );
  }
}

export default App;

