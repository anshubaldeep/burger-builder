import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
}

const authStart=(state,action)=>{
    return {
        loading:true,
        error:null
    }
}


const authSuccess=(state,action)=>{
    return{
        token:action.idToken,
        userId:action.userId,
        loading:false,
        error:null
    }
}

const authFail=(state,action)=>{
    return{
        error:action.error,
        loading:false
    }
}

const authLogout=(state,action)=>{
    return{
        token:null,
        userId:null
    }
}


const authRedirectPath=(state,action)=>{
    return{
        authRedirectPath:action.path
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.authStart:
            return updateObject(state,authStart(state,action))
        
        case actionTypes.authSuccess:
            return updateObject(state,authSuccess(state,action))
        
        case actionTypes.authFailure:
            return updateObject(state,authFail(state,action))
            
        case actionTypes.authLogout:
                return updateObject(state,authLogout(state,action))
        
        case actionTypes.authRedirectPath:
                return updateObject(state,authRedirectPath(state,action))
                
        default:
            return{
                ...state
            }
    }
}

export  default reducer;