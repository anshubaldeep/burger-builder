import {put} from 'redux-saga/effects';
import Axios from '../../axios.orders';
//import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';



export function* purchaseBurgerSaga(action){
    
        yield put(actions.purchaseBurgerStart());
        try{
            const response=yield Axios.post('/orders.json?auth='+action.token,action.orderData);
            yield put(actions.purchaseBurgerSuccess(response.data.name,action.orderData));
        }
        catch(error){
            yield put(actions.purchaseBurgerFailed(error));
        }
}


export function* onFetchOrderSaga(action){
    
        yield put(actions.fetchOrdersStart());
            const queryParams='?auth=' + action.token+'&orderBy="userId"&equalTo="'+action.userId+'"';
            try{
            const response= yield Axios.get('/orders.json'+queryParams)
                const fetchedOrders=[];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key
                    });
                }
                yield put(actions.fetchOrdersSucess(fetchedOrders));
            }
            catch(error){
                yield put(actions.fetchOrdersFailure());
            }
}