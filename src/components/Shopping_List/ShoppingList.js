import React from 'react';
import {Link,} from 'react-router-dom';
import {withRouter,} from 'react-router';
import {Spinner,} from 'reactstrap';

//SERVICES
import {getUpcomingMealsIngList,} from '../../services/main';

class ShoppingList extends React.Component {
    state = {
        list: null,
        user_id: null,
        token: '',
    };

    componentDidMount = async () => {
        this.getUserInfo();
    };

    componentDidUpdate = async () => {
        const {user_id,} = this.state;
        if (this.props.id === user_id) {
            return;
        } else {
            this.getUserInfo();
        };
    };

    getUserInfo = async _ => {
        const {id, token,} = this.props;
        if (id !== 0 && token.length > 0) {
            const shoppingListCall = await getUpcomingMealsIngList(id);
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

    render() {
        const {list,} = this.state;
        return (
            <>
                {
                    !list ? 
                    <>
                        <Spinner color="dark" />
                    </>
                        :
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
                }
            </>
        );
    };
};


export default withRouter(ShoppingList);

