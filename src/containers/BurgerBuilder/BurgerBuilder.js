import React , {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios.orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';

// const INGREDIENT_PRICES={
//     salad:0.5,
//     cheese:0.4,
//     meat:1.3,
//     bacon:0.7,
// }


class BurgerBuilder extends Component{
    
    state={
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredient();
    }


    // addIngredientHandler = (type) =>{
    //     const oldCount=this.props.ingredients[type];
    //     const updatedCount=oldCount+1;
    //     const updatedIngredients={...this.props.ingredients}
    //     updatedIngredients[type]=updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.totalPrice;
    //     const updatedPrice = oldPrice + priceAddition; 
    //     this.setState({ingredients:{...updatedIngredients},totalPrice:updatedPrice});
    //     this.updatePurchasable(updatedIngredients);
    // }

    // removeIngredientHandler = (type) =>{
    //     const oldCount=this.props.ingredients[type];
    //     if(oldCount<=0)
    //     {
    //         return;

    //     }
    //         const updatedCount=oldCount-1;
    //         const updatedIngredients={...this.props.ingredients}
    //         updatedIngredients[type]=updatedCount;
    //         const priceDeduction = INGREDIENT_PRICES[type];
    //         const oldPrice = this.props.totalPrice;
    //         const updatedPrice = oldPrice - priceDeduction; 
    //         this.setState({ingredients:{...updatedIngredients},totalPrice:updatedPrice});
    //         this.updatePurchasable(updatedIngredients);
    // }

    updatePurchasable = (ingredients) =>{
        const sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
        
    }

    purchaseHandler=()=>
    {
        if(this.props.isAuthenticated)
        {
            this.setState({purchasing:true});
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=()=>{
        // //alert('You Continue!');
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    render()
    {
        const disabledInfo={
            ...this.props.ingredients
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]= disabledInfo[key]<=0;
        }

        let orderSummary= null;
        if(this.props.ingredients)
        {
        orderSummary = <OrderSummary ingredients={this.props.ingredients} 
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice}
         />
        }

        let BurgerComponent = this.props.error?<p>Ingredients can't be loaded!</p>:<Spinner/>
        if(this.props.ingredients)
        {
            BurgerComponent=(
                <Aux>
                <Burger 
                ingredients={this.props.ingredients} 
                />

            <BuildControls 
                addIngredient={this.props.addIngredientHandler}
                removeIngredient={this.props.removeIngredientHandler}
                price={this.props.totalPrice}
                disabled={disabledInfo}
                purchasable={this.updatePurchasable(this.props.ingredients)}
                ordered={this.purchaseHandler}
                isAuthenticated={this.props.isAuthenticated}
            />
            </Aux>
            )
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {BurgerComponent}
            </Aux>
        );
    }
}


const mapStateToProps=state=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null,
    }
}

const mapDispatchToProps=dispatch=>({
    addIngredientHandler:(ingName)=>dispatch(actionCreators.addIngredient(ingName)),
    removeIngredientHandler:(ingName)=>dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngredient:()=>dispatch(actionCreators.initIngredient()),
    onInitPurchase:()=>dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath:(path)=>dispatch(actionCreators.authRedirectPath(path))
})

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,Axios));