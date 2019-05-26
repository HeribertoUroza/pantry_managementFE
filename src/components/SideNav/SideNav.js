import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import M from 'materialize-css';



import headImage from '../../assets/Photos/bread-close-up-colors-1667427.jpg';
import Pantry from '../Pantry/Pantry'


const productTestRed = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "50",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};

const productTestOrange = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "100",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};

const productTestYellow = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "180",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};

const productTestBlue = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "250",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};

const productTestGreen = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "350",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};


class SideNavBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: [],
            pantry: false,
            nutrients: false,
            menuIsOpen: true,
            closeMenu: false,
            pantry: [productTestOrange(), productTestRed(), productTestYellow(), productTestBlue(), productTestGreen(), productTestGreen(), productTestGreen()],



        }
    }

    componentDidMount() {
        M.AutoInit();
    }

    render() {
        return (<>

            <ul id="slide-out" class="sidenav collapsible">
                <li>
                    <div class="user-view">
                        <div class="background">
                            <img src={headImage} />
                        </div>
                        <img class="circle" src="images/yuna.jpg" />
                        <span class="white-text name">John Doe</span>
                        <span class="white-text email">jdandturk@gmail.com</span>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">storage</i>Your Pantry</span>
                    </div>
                    <div class="collapsible-body">
                        <Pantry pantry={this.state.pantry} />
                    </div>
                </li>
                <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">add_shopping_cart</i>Your Weekly Shopping List</span>
                    </div>
                    <div class="collapsible-body">
                        <Pantry pantry={this.state.pantry} />
                    </div>
                </li>
                <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">bar_chart</i>Your Weekly Nutrients</span>
                    </div>
                    <div class="collapsible-body">
                        <Pantry pantry={this.state.pantry} />
                    </div>
                </li>
                <li><div class="divider"></div></li>
                <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">fastfood</i>Your Recipes</span>
                    </div>
                    <div class="collapsible-body">
                        <Pantry pantry={this.state.pantry} />
                    </div>
                </li>
                <li>
                    <div class="collapsible-header">
                        <a href='#'><i class="material-icons">note_add</i>Add A Recipes</a>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header">
                        <span><i class="material-icons">search</i>Search For Recipes</span>
                    </div>
                    <div class="collapsible-body">
                        <input />
                    </div>
                </li>
                <li><div class="divider"></div></li>
                <li><a href="#!"><i class="material-icons">settings</i>Preferences</a></li>
                <li><Link to='/logout'><i class="material-icons">exit_to_app</i>Logout</Link></li>
            </ul>
            <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </>
        )
    }
}

export default withRouter(SideNavBar)