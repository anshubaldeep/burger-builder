import * as actionTypes from './actionTypes';
//import Axios from '../../axios.orders';


export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:actionTypes.purchaseBurgerSucess,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFailed=(error)=>{
    return{
        type:actionTypes.purchaseBurgerFailure,
        error:error
    }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.purchaseBurgerStart
    }
}

export const purchaseBurger=(orderData,token)=>{
    // return dispatch=>{
    //     dispatch(purchaseBurgerStart());
    //     Axios.post('/orders.json?auth='+token,orderData)
    //     .then(response=>{
    //         dispatch(purchaseBurgerSuccess(response.data.name,orderData));
    //     })
    //     .catch(error=>{
    //         dispatch(purchaseBurgerFailed(error));
    //     });    
    // } 
    return{
        type:actionTypes.purchaseBurger,
        orderData:orderData,
        token:token
    }
};

export const purchaseInit=()=>{
    return{
        type:actionTypes.purchaseInit,
    }
}


export const fetchOrdersStart=(orders)=>{
    return{
        type:actionTypes.fetchOrdersStart,
        orders:orders
    }
}

export const fetchOrdersFailure=(error)=>{
    return{
        type:actionTypes.fetchOrdersFailure,
        error:error
    }
}

export const fetchOrdersSucess=(fetchedOrders)=>{
    return{
        type:actionTypes.fetchOrdersSucess,
        orders:fetchedOrders
    }
}

export const onFetchOrder=(token,userId)=>{
    // return dispatch=>{
    // dispatch(fetchOrdersStart());
    // const queryParams='?auth=' + token+'&orderBy="userId"&equalTo="'+userId+'"';
    // Axios.get('/orders.json'+queryParams)
    //     .then(response=>{
    //         const fetchedOrders=[];
    //         for(let key in response.data){
    //             fetchedOrders.push({
    //                 ...response.data[key],
    //                 id:key
    //             });
    //         }
    //         dispatch(fetchOrdersSucess(fetchedOrders));
    //     })
    //     .catch(error=>{
    //         dispatch(fetchOrdersFailure())
    //     })
    // }
    return{
        type:actionTypes.onFetchOrder,
        token:token,
        userId:userId
    }
}