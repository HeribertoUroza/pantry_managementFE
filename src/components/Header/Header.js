import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';


//CSS
import './header.css'

//ASSETS
import logoDot from '../../assets/Branding/PossiblePantryLogoGreenDott.png';
import logoName from '../../assets/Branding/PossiblePantryLogoGreenName.png';






class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "Jane Doe",
            date: new Date()
        }
    }
    handleClickLogo = (e) => {
        this.props.history.push('/dashboard')
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    handleSubmit = (e) => {
        const search = this.state.search
        this.props.history.push('/search/' + search)
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            const search = this.state.search
            this.props.history.push('/search/' + search)
        }
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            /*readUser(user.email)
                .then((response) => {
                    const rootObj = response.data.data
                    this.setState({
                        name: rootObj.nameofuser,
                        username: rootObj.username,
                    })
                })*/
        })
    }

    render() {
            const date = new Date ()
        return (<>
            <div className='row mx-auto py-3 headerContainer' style={{borderBottom: "solid 1px lightgray"}}>
                <span className="col-1" onClick={this.handleClickLogo}><img src={logoDot} alt="logo" /></span>
                <span className="col-1 align-middle" onClick={this.handleClickLogo}><img src={logoName} alt="logo" style={{marginTop: "25px"}} /></span>
                <div className="col-9 my-auto text-center">
                    
                </div>
                <div className="col-1 mx-auto my-auto">
                    <div className="row">
                        <Link to='/logout'><i className="material-icons right green-text">input</i></Link>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default withRouter(Header)