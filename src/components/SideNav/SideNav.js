import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import M from 'materialize-css';

//ASSETS
import logoName from '../../assets/Branding/LogoRedesign.png';


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
    }


    render() {
        return (<>
            <ul id="slide-out" class="sidenav sidenav-fixed" 
                               style={{backgroundColor: "black", 
                                       color: "white",
                                       width: "auto",
                                       }}>
                <li>
                    <div class="user-view text-center mb-5" style={{backgroundColor: "black"}}>
                        <img src={logoName} style={{width: "200px"}}/>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header" onClick={this.props.clickDash}>
                        <span><i class="material-icons">home</i>Dashboard</span>
                    </div>
                    <div class="collapsible-body">
                    </div>
                </li>
               
                <li><div class="divider"></div></li>
                <li>
                    <div class="collapsible-header" onClick={this.props.clickRDB}>
                        <span><i class="material-icons">fastfood</i>Plan Your Meals</span>
                    </div>
                    <div class="collapsible-body">
                    </div>
                </li>
                <li><div class="divider"></div></li>
                <li>
                    <div class="collapsible-header" onClick={this.props.clickAddR}>
                        <span><i class="material-icons">note_add</i>Add A Recipe</span>
                    </div>
                </li>
                <li><div class="divider"></div></li>
                <li>
                    <div class="collapsible-header" >
                       <Link to='/preferences' style={{color: "white"}}><span><i class="material-icons">settings</i>Preferences</span></Link>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header" >
                       <Link to='/logout' style={{color: "white"}}><span><i class="material-icons">exit_to_app</i>Logout</span></Link>
                    </div>
                </li>
            </ul>
            <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            
                    
        </>
        )
    }
}

export default withRouter(SideNavBar)