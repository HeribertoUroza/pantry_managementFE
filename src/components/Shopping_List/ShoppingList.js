import React from 'react';
import { withRouter } from 'react-router';
import {Spinner} from 'reactstrap';



//CSS

//SERVICES
import { readShoppingList } from '../../services/main';


class ShoppingList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            readShoppingList(this.props.token, this.props.id)
                .then((response) => {
                this.setState({ list: response.data.data })
            })
    }, 1000)
} 

render() {
    return (
        <>
            <div className="container" style={{height: "470px", overflow: "scroll"}}>
                <section>
                   {
                       this.state.list.length > 0 ? this.state.list.map((e,i)=>{
                          return <p>{e}</p>
                       }) : <Spinner/>
                   }
                </section> 
               
            </div>

        </>
    )
}
}


export default withRouter(ShoppingList);

