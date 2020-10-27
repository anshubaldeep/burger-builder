import {put} from 'redux-saga/effects';
import Axios from '../../axios.orders';
//import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';


export function* initIngredientsSaga(){
        
        try{
            const response=yield Axios.get('/ingredients.json')
            yield put(actions.setIngredients(response.data));
        }
        catch(err){
            yield put(actions.fetchFailed(err));
        }
}