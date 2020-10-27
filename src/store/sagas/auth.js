import {put,delay} from 'redux-saga/effects';
import Axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('localId');
    yield localStorage.removeItem('expirationDate');
    yield put({
        type:actionTypes.authLogout
    })
}


export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationDate*1000);
    yield put({
        type:actionTypes.authInitiateLogout
    })
}


export function* authUserSaga(action){
        yield put({
            type:actionTypes.authStart
        });
        const authData={
            email:action.email,
            password:action.password,
            returnSecureToken:true
        }
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADwxAuPphJq-Vun8H1U1WjRlWY0wn2T8Q";
        if(!action.isSignup){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADwxAuPphJq-Vun8H1U1WjRlWY0wn2T8Q"
        }
        try{
            const response = yield Axios.post(url,authData)
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000)
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('localId',response.data.localId);
            localStorage.setItem('expirationDate',expirationDate);
            yield put(actions.authSuccess(response.data.idToken,response.data.localId));
            yield put(actions.checkAuthTimeout(response.data.expiresIn));
        }
        catch(error){    
            put(actions.authFailure(error.response.data.error));
        }
}


export function* authCheckStateSaga(){
        const token=yield localStorage.getItem('token');
        if(!token){
            yield put(actions.authLogout());
        }
        else
        {
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate<=new Date())
            {
                yield put(actions.authLogout());
            }
            else
            {
                const localId= yield localStorage.getItem('localId');
                yield put(actions.authSuccess(token,localId));
                yield put(actions.checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
}