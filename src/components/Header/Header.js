/*import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';


//CSS
import './header.css'



//ASSETS
import logoDot from '../../assets/Branding/PossiblePantryLogoDotWhite.png';
import logoName from '../../assets/Branding/PossiblePantryLogoNameWhite.png';

import SideNav from '../SideNav/SideNav'
import { readUser } from '../../services/main';





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

    // componentDidMount() {
    //     this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
    //         firebase.auth().currentUser.getIdToken(false)
    //             .then( (token) => {
    //                 this.setState({ token: token})
    //             })
    //             .then( () => {
    //                 readUser(this.state.token, 'joserodriguez@pursuit.org')
    //                     .then(res => {
    //                         console.log('ressss',res)
    //                         const rootObj = res.data.data
    //                         this.setState({
    //                             name: rootObj.nameofuser,
    //                             username: rootObj.username,
    //                         })
    //                     })
    //             })
    //             .catch(err => {
    //                 console.log(err.toString())
    //             })
    //     })
    // }

    render() {
        const date = new Date()
        return (<>
            <div className='row mx-auto py-3 mb-0 headerContainer' style={{ borderBottom: "solid 1px lightgray" }}>
               <span className="col-1"></span>
                <span className="col-1 mx-auto" onClick={this.handleClickLogo}><img src={logoDot} alt="logo" /></span>
                <span className="col-1" onClick={this.handleClickLogo}><img src={logoName} alt="logo" style={{ marginTop: "25px" }} /></span>
                <div className="col-7 my-auto text-center">

                </div>
                <div className="col-1 mx-auto my-auto">
                    <div className="row">
                        <SideNav options={{ edge: 'right', closeOnClick: true }} recipeDB={this.props.recipes} userName={this.props.userName} email={this.props.email} id={this.props.id} recipeDB={this.props.click} addRecipe={this.props.clickAddR} back={this.props.clickDash} token={this.props.token} />
                    </div>
                </div>
                <div className="col-1"></div>
        
            </div>
        </>
        )
    }
}

export default withRouter(Header)*/