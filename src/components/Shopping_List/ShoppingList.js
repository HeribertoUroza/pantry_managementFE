import React from 'react';
import {withRouter,} from 'react-router';
import {Spinner,} from 'reactstrap';
import moment from 'moment-timezone';

//SERVICES
import {getUpcomingMealsIngList,} from '../../services/main';

class ShoppingList extends React.Component {
    state = {
        list: null,
        user_id: 0,
        token: '',
    };

    componentDidMount = async () => this.getUserInfo();

    componentDidUpdate = async () => {
        const {user_id,} = this.state;
        if (this.props.id === user_id) {
            return;
        } else {
            this.getUserInfo();
        };
    };

    getWeekDateRange = _ => {
        const weekStartTime = moment().day('monday');
        const weekEndTime = moment().day('monday').add(4, 'days');

        const weekStart = moment.tz(weekStartTime, 'America/New_York').format('MMMM DD, YYYY');
        const weekEnd = moment.tz(weekEndTime, 'America/New_York').format('MMMM DD, YYYY');
        return [weekStart, weekEnd];
    }

    getUserInfo = async _ => {
        const {id, token,} = this.props;
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
        const {list,} = this.state;
        if (!list) {
            return(
                <>
                    <div className='container'>
                        <div className='col-4 my-5 py-5 text-center'>
                            <Spinner color="dark" />
                        </div>
                    </div>
                </>
            );
        } else if (list.length === 0) {
            return(
                <>
                    <div className='container px-0 mx-0'>
                        <div className='col-4 my-5 py-5 text-center px-0 mx-0'>
                            <p style={{fontSize: 36}} className='font-weight-bold'>No items</p>
                        </div>
                    </div>
                </>
            );
        } else {
            return(
                <ul class="collection m-0">
                    {
                        list.map((e, i) => {
                            return(
                                <li className="collection-item avatar">
                                    <img src={e.product_image} alt="" class="circle border" />
                                    <h1 className="text-center mb-1" style={{fontSize: 22}}>{e.ingredient_name}</h1>
                                    <p className=''><a className='font-weight-bold'>Preferred Product:</a> {e.product_name}</p>
                                    <div className='col-12 text-center font-weight-bold'>
                                        <small className='text-muted'>Press star to buy</small>
                                    </div>
                                    <a href={e.product_url} target='_blank' className="secondary-content"><i className="material-icons">grade</i></a>
                                </li>
                            )
                        })
                    }
                </ul>
            );
        };
    }

    render() {
        const {list,} = this.state;
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