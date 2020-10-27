import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import {connect} from 'react-redux';


class Checkout extends Component{

    purchaseContinuedHandler =()=>{
        this.props.history.replace('/checkout/contact-info');
    }


    purchaseCancelledHandler =()=>{
        this.props.history.goBack();
    }

    
    render()
    {
        console.log(this.props);
        let summary=<Redirect to='/'/>
        if(this.props.ingredients){
            const purchasedRedirect= this.props.purchased?<Redirect to='/'/>:null;
            summary=(
            <div>
            {purchasedRedirect}
            <CheckoutSummary ingredients={this.props.ingredients}
            purchaseCancelled={this.purchaseCancelledHandler}
            purchaseContinued={this.purchaseContinuedHandler}
        />
        <Route path={this.props.match.url+'/contact-info'} exact 
                component={ContactData}/>
            </div>
            );
        
        }
        return summary;
    }
}

const mapStateToProps=state=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);