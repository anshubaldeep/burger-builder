import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import Axios from '../../axios.orders';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    
    componentDidMount(){
       this.props.onFetchOrder(this.props.token,this.props.userId);
    }

    render()
    {
        let orders=<Spinner/>
        if(!this.props.loading)
        {
            orders=
            <div>
                {this.props.orders.map(order=>{
                    return <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}       
                    />
                })}
            </div>
        }
        return orders;
    }
}


const mapStateToProps=state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchOrder:(token,userId)=>dispatch(actionCreators.onFetchOrder(token,userId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,Axios));