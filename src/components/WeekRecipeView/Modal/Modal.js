import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { readRecipeById, nutrition } from '../../../services/main'
import Nutrition from './NutritionalData';



class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            modal: false,
            ingredients: [],
            nutrients: []
        };
    }




    toggle = (e) => {
        if (this.state.modal === false) {
            this.setState({
                modal: !this.state.modal,
            })
        }
        else {
            this.setState({
                modal: false,
            })
        }
    }



    componentDidMount() {
        readRecipeById(this.props.token, this.props.id)
            .then((response) => {
                this.setState({ ingredients: response.data.data })
            })
            .then(() => {
                const name = `${this.props.name}`
                const list = this.state.ingredients.map((e,i)=>{
                    return `${e.ingredient_weight} ${e.ingredient_weight_type.toLowerCase()} ${e.ingredient_name.toLowerCase()}`
                })
                nutrition(name, list)
                .then((response)=>{
                    this.setState({nutrients: response.data})
                })
            })
    }



    render() {
        return (
            <>
                <a class="btn-floating halfway-fab waves-effect waves-light black" data-toggle="modal" data-target="#myModal" onClick={this.toggle} ><i class="material-icons">add</i></a>

                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} backdrop={false} fade={false} scrollable={true}>
                    <ModalHeader toggle={this.toggle} style={{ backgroundColor: "crimson" }}>
                        <h2 style={{ fontWeight: "bold", fontSize: "2rem", color: "white", textAlign: "center" }}>{this.props.name.toUpperCase()}</h2>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6">
                                <img class="mx-auto d-block" src={this.props.image} />
                            </div>
                            <div className="col-6">
                                <hr />
                                <h3 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Ingredients</h3>
                                <ul>
                                    {
                                        this.state.ingredients.map((e, i) => {
                                            return <li className="pl-4"> - {e.ingredient_weight} {e.ingredient_weight_type} {e.ingredient_name}</li>
                                        })
                                    }
                                </ul>
                                <hr />
                                {
                                    this.state.nutrients.totalNutrients ? 
                                    <Nutrition calories={this.state.nutrients.calories} 
                                                totalWeight={this.state.nutrients.totalWeight} 
                                                yield={this.state.nutrients.yield}
                                                />: "Nutrient Facts Cannot Be Rendered"
                                }
                                    
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}


export default ModalExample;