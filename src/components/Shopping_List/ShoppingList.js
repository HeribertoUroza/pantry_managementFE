import React from 'react';
import { withRouter, } from 'react-router';
import { Spinner, } from 'reactstrap';
import moment from 'moment-timezone';



//SERVICES
import { getUpcomingMealsIngList, getProduct, updateProductWeightLeft, readPantryByProductID, addToPantry } from '../../services/main';


class ShoppingList extends React.Component {
    state = {
        list: null,
        user_id: 0,
        token: '',
        individualItems: []
    };

    componentDidMount = async () => this.getUserInfo()

    componentDidUpdate = async () => {
        const { user_id, } = this.state;
        if (this.props.id === user_id) {
            return;
        } else {
            this.getUserInfo();
        };
    };

    getWeekDateRange = _ => {
        const date = new Date();
        const day = date.getDay();
        let daysToAdd = 0;
        let daysToEnd = 4;
        if (day === 0) {
            daysToAdd = 1;
            daysToEnd = 5;
        }
        if (day === 1) {
            daysToAdd = 7;
            daysToEnd = 11;
        }
        if (day === 2) {
            daysToAdd = 6;
            daysToEnd = 10;
        }
        if (day === 3) {
            daysToAdd = 5;
            daysToEnd = 9;
        }
        if (day === 4) {
            daysToAdd = 4;
            daysToEnd = 8;
        }
        if (day === 5) {
            daysToAdd = 3;
            daysToEnd = 7;
        }
        if (day === 6) {
            daysToAdd = 2;
            daysToEnd = 6;
        }
        const weekStartTime = moment.tz(date, 'America/New_York').add(daysToAdd, 'days').format('MMMM DD, YYYY');
        const weekEndTime = moment.tz(date, 'America/New_York').add(daysToEnd, 'days').format('MMMM DD, YYYY');
        return [weekStartTime, weekEndTime];
    }

    getUserInfo = async _ => {
        const { id, token, } = this.props;
        const weekDateRange = this.getWeekDateRange();
        if (id !== 0) {
            const shoppingListCall = await getUpcomingMealsIngList(id, weekDateRange[0], weekDateRange[1]);
            const shoppingListObj = shoppingListCall.data.data
            const shoppingListArr = Object.keys(shoppingListObj);
            const shoppingList = [];
            for (let item of shoppingListArr) {
                console.log(shoppingListArr)
                shoppingListObj[item].ingredient_name = item;
                shoppingList.push(shoppingListObj[item]);
            };
            this.setState(() => ({
                list: shoppingList,
                user_id: id,
                token,
            }));
        };
    };

    updateProductWeight = (index) => {
        const list = this.state.list;
        const product = list[index];
        const product_id = product.product_id;
        let productOrgGramWeight = null;
        getProduct(product_id)
            .then((data) => {
                const productInfo = data.data.data;
                productOrgGramWeight = productInfo[0].product_gram_weight;
                return readPantryByProductID(product_id)
            })
            .then((data) => {
                const productInPantry = data.data.data;
                if (productInPantry.length === 0) {
                    const newWeight = productOrgGramWeight;
                    return addToPantry(this.state.token, product_id, this.state.user_id, newWeight)
                } else {
                    const currentWeight = productInPantry[0].weight_left;
                    const newWeight = currentWeight + productOrgGramWeight;
                    return updateProductWeightLeft(product_id, newWeight, this.state.token)
                }
            })
            .then(() => {
                const list = this.state.list;
                const remove = list.splice(index, 1);
                this.setState({ list: list });
            })
            .then(() => {
                const add = 1;
                this.props.update(add);
            })
            .catch((e) => {
                console.log(e)
            })
    }



    renderShoppingList = _ => {
        const { list, } = this.state;
        if (!list) {
            return (
                <>
                    <div className='container'>
                        <div className='col-4 my-5 py-5 text-center'>
                            <Spinner color="dark" />
                        </div>
                    </div>
                </>
            );
        } else if (list.length === 0) {
            return (
                <>
                    <div className='container px-0 mx-0'>
                        <div className='col-4 my-5 py-5 text-center px-0 mx-0'>
                            <p style={{ fontSize: 36 }} className='font-weight-bold'>No items</p>
                        </div>
                    </div>
                </>
            );
        } else {
            return (<>
                <ul class="collection m-0">
                    {
                        list.map((e, i) => {
                            return (
                                <li className="collection-item col-12 avatar">
                                    <div className="row">
                                        <div className="col-2">
                                            <img src={e.product_image} alt="" class="img-fluid img-thumbnail" />
                                        </div>
                                        <div className="col-8">
                                            <h1 className="text-left mb-1" style={{ fontSize: 22 }}>{e.ingredient_name}</h1>
                                            <p className=''><a className='font-weight-bold'>Preferred Product:</a><br /> {e.product_name}</p>
                                            <p className='text-left' style={{ color: "#2e6e51" }}><a className='font-weight-bold'>Need: </a>{e.needed_weight} grams</p>
                                            <div className="row">
                                                <div className='col-12 text-left font-weight-bold'>
                                                    <small className='text-muted'>Press cart to buy</small>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <button type="button" className="btn sm btn-outline-success" onClick={e => { this.updateProductWeight(i) }}>Purchased ?</button>

                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <a href={e.product_url} target='_blank' className="secondary-content"><i className="material-icons" style={{ color: "black" }}>shopping_cart</i></a>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </>
            );
        };
    }

    render() {
        const { list, } = this.state;
        return (
            <>
                {
                    this.renderShoppingList()
                }
            </>
        );
    };
};

export default withRouter(ShoppingList);