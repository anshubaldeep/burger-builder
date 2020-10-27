import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer', ()=>{
    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/'
        });
    })

    it('should return the initial state',()=>{
        expect(reducer({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/'
        },{
            type:actionTypes.authSuccess,
            token:'some-token',
            userId:'some-id'
        })).toEqual({
            token:'some-token',
            userId:'some-id',
            error:null,
            loading:false,
            authRedirectPath:'/'
        });
    })
})