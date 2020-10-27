import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {logoutSaga,checkAuthTimeoutSaga,authUserSaga, authCheckStateSaga} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga , onFetchOrderSaga} from './order';

export function* watchAuth(){
    yield takeEvery(actionTypes.authInitiateLogout,logoutSaga);
    yield takeEvery(actionTypes.authCheckTimeout,checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.authUser,authUserSaga);
    yield takeEvery(actionTypes.authStateCheck,authCheckStateSaga);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.initIngredient,initIngredientsSaga);
}

export function* watchOrder(){
    yield takeEvery(actionTypes.purchaseBurger,purchaseBurgerSaga);
    yield takeEvery(actionTypes.onFetchOrder,onFetchOrderSaga)
}