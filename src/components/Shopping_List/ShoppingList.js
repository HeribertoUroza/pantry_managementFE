import React from 'react';
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

    componentDidMount = async () => this.getUserInfo();

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
        if (id !== 0) {
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
                        <div className='container'>
                            <div className='col-4 my-5 py-5 text-center'>
                                <Spinner color="dark" />
                            </div>
                        </div>
                    </>
                        :
                    <ul class="collection row m-0" style={{overflowX:"scroll", display: "flex"}}>
                        {
                            list.map((e, i) => {
                                return(
                                    <li className="collection-item col-12 avatar">
                                    <div className="row">
                                    <div className="col-2">
                                        <img src={e.product_image} alt="" class="img-fluid img-thumbnail" />
                                    </div>
                                    <div className="col-8">
                                        <h1 className="text-left mb-1" style={{fontSize: 22}}>{e.ingredient_name}</h1>
                                        <p className=''><a className='font-weight-bold'>Preferred Product:</a><br/> {e.product_name}</p>
                                        <div className='col-12 text-left font-weight-bold'>
                                            <small className='text-muted'>Press cart to buy</small>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <a href={e.product_url} target='_blank' className="secondary-content"><i className="material-icons" style={{color:"black"}}>shopping_cart</i></a>
                                    </div>
                                    </div>
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