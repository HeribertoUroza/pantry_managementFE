import React from 'react';
import { withRouter, } from 'react-router';
import { Spinner, } from 'reactstrap';
import moment from 'moment-timezone';



//SERVICES
import { getUpcomingMealsIngList, } from '../../services/main';


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
        const weekStartTime = moment.tz(date,'America/New_York').add(daysToAdd, 'days').format('MMMM DD, YYYY');
        const weekEndTime = moment.tz(date,'America/New_York').add(daysToEnd, 'days').format('MMMM DD, YYYY');
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



    

    renderShoppingList = _ => {
        const { list, } = this.state;
        console.log("list", list)
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
                                            <div className='col-12 text-left font-weight-bold'>
                                                <small className='text-muted'>Press cart to buy</small>
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