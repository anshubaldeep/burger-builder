import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'

const initialState={
    orders:[],
    loading:false,
    purchased:false
}


const purchaseBurgerSucess=(state,action)=>{
    const newOrder=updateObject(action.orderData,{id:action.orderId})
    return updateObject(state,{
        loading:false,
        purchased:true,
        orders:state.orders.concat(newOrder)});
}

const purchaseBurgerFailure=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error}); 
}

const purchaseBurgerStart=(state,action)=>{
    return updateObject(state,{loading:true});
}

const purchaseInit=(state,action)=>{
    return updateObject(state,{purchased:false});
}

const fetchOrdersStart=(state,action)=>{
    return updateObject(state,{loading:true});
}

const fetchOrdersFailure=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false});
    }


const fetchOrdersSucess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        orders:action.orders});
}


export const reducer=(state=initialState,action)=>{
    switch(action.type){
            case actionTypes.purchaseBurgerSucess:return purchaseBurgerSucess(state,action);
            
            case actionTypes.purchaseBurgerFailure:return purchaseBurgerFailure(state,action);
                
            case actionTypes.purchaseBurgerStart:return purchaseBurgerStart(state,action);
               
            case actionTypes.purchaseInit:return purchaseInit(state,action);
            
            case actionTypes.fetchOrdersStart:return fetchOrdersStart(state,action);
               
            case actionTypes.fetchOrdersFailure:return fetchOrdersFailure(state,action);
                
            case actionTypes.fetchOrdersSucess:return fetchOrdersSucess(state,action);
               
        default:
            return{
                ...state
            }
    }
}


export default reducer;