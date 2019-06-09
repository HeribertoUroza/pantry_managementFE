import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import M from 'materialize-css';
import firebase from '../../firebase';


import headImage from '../../assets/Photos/bread-close-up-colors-1667427.jpg';
import Pantry from '../Pantry/Pantry'
import { readPantry } from '../../services/main';


const productPercentage = (product)=>{
    product.percentage = product.weight_left/product.product_gram_weight
}


class SideNavBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pantry: [],



        }
    }

    componentDidMount() {
        M.AutoInit();
        /*setTimeout(() => {
            readPantry(this.props.token, this.props.id)
                .then((response) => {
                console.log("pantry", response)
                this.setState({ pantry: response.data.data })
            })
            .catch(err => {
                console.log("Error",err.toString())
            })
        }, 1000)*/
    }


    render() {
        return (<>

            <ul id="slide-out" class="sidenav collapsible">
                <li>
                    <div class="user-view">
                        <div class="background">
                            <img src={headImage} />
                        </div>
                        <button class="circle"><span style={{fontSize: "1.5rem"}}>{this.props.userName.charAt(0)}</span></button>
                        <span class="white-text name">{this.props.userName}</span>
                        <span class="white-text email">{this.props.email}</span>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header" onClick={this.props.back}>
                        <span><i class="material-icons">home</i>Dashboard</span>
                    </div>
                    <div class="collapsible-body">
                    </div>
                </li>
                {
              /*  <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">calendar_today</i>Plan Your Meals</span>
                    </div>
                    <div class="collapsible-body">
                    </div>
                </li>*/
                <li><div class="divider"></div></li>
                
               /* <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">storage</i>Your Pantry</span>
                    </div>
                    <div class="collapsible-body">
                    <Pantry pantry={this.state.pantry} token={this.state.token} />
                    </div>
                </li>*
                
                <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">add_shopping_cart</i>Your Weekly Shopping List</span>
                    </div>
                    <div class="collapsible-body">
                    </div>*
                
                </li>*/
                }
                <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">bar_chart</i>Your Weekly Nutrients</span>
                    </div>
                    <div class="collapsible-body">
                    </div>
                </li>
                <li>
                    <div class="collapsible-header" onClick={this.props.recipeDB}>
                        <span><i class="material-icons">fastfood</i>Plan Your Meals</span>
                    </div>
                    <div class="collapsible-body">
                    </div>
                </li>
                <li><div class="divider"></div></li>
                <li>
                    <div class="collapsible-header" onClick={this.props.addRecipe}>
                        <span><i class="material-icons">note_add</i>Add A Recipe</span>
                    </div>
                </li>
                {
               /* <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">search</i>Search For Recipes</span>
                    </div>
                    <div class="collapsible-body">
                    </div>
                </li>*/
                }
                <li><div class="divider"></div></li>
                <li><Link to='/preferences'><i class="material-icons">settings</i>Preferences</Link></li>
                <li><Link to='/logout'><i class="material-icons">exit_to_app</i>Logout</Link></li>
            </ul>
            <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </>
        )
    }
}

export default withRouter(SideNavBar)