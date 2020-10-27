import * as actionTypes from './actionTypes';
//import Axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.authStart
    }
}

export const authSuccess=(token,localId)=>{
    return{
        type:actionTypes.authSuccess,
        idToken:token,
        userId:localId
    }
}

export const authFailure=(error)=>{
    return{
        type:actionTypes.authFailure,
        error:error
    }
}


export const authLogout=()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('localId');
    // localStorage.removeItem('expirationDate');
    return{
        type:actionTypes.authInitiateLogout
    }
}

export const checkAuthTimeout=(expirationDate)=>{
    return {
        type:actionTypes.authCheckTimeout,
        expirationDate:expirationDate
    }
}


export const auth=(email,password,isSignup)=>{
    // return dispatch=>{
    //     dispatch(authStart());
    //     const authData={
    //         email:email,
    //         password:password,
    //         returnSecureToken:true
    //     }
    //     let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADwxAuPphJq-Vun8H1U1WjRlWY0wn2T8Q";
    //     if(!isSignup){
    //         url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADwxAuPphJq-Vun8H1U1WjRlWY0wn2T8Q"
    //     }
    //     Axios.post(url,authData)
    //     .then(response=>{
    //         const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000)
    //         localStorage.setItem('token',response.data.idToken);
    //         localStorage.setItem('localId',response.data.localId);
    //         localStorage.setItem('expirationDate',expirationDate);
    //         dispatch(authSuccess(response.data.idToken,response.data.localId));
    //         dispatch(checkAuthTimeout(response.data.expiresIn));
    //     })
    //     .catch(error=>{
    //         dispatch(authFailure(error.response.data.error));
    //     })
    // }
    return{
        type:actionTypes.authUser,
        email:email,
        password:password,
        isSignup:isSignup
    }
}


export const authRedirectPath=(path)=>{
    return{
        type:actionTypes.authRedirectPath,
        path:path
    }
}


export const authCheckState=()=>{
    // return dispatch=>{
    //     const token=localStorage.getItem('token');
    //     if(!token){
    //         dispatch(authLogout());
    //     }
    //     else
    //     {
    //         const expirationDate=new Date(localStorage.getItem('expirationDate'));
    //         if(expirationDate<=new Date())
    //         {
    //             dispatch(authLogout());
    //         }
    //         else
    //         {
    //             const localId=localStorage.getItem('localId');
    //             dispatch(authSuccess(token,localId));
    //             dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
    //         }
    //     }
    // }
    return{
        type:actionTypes.authStateCheck
    }
}