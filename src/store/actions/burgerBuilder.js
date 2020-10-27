import * as actionTypes from './actionTypes';
//import Axios from '../../axios.orders';

export const addIngredient=(ing)=>{
    return{
        type:actionTypes.addIngredient,
        ingredientName:ing
    }
};


export const removeIngredient=(ing)=>{
    return{
        type:actionTypes.removeIngredient,
        ingredientName:ing
    }
}

export const setIngredients=(ingredients)=>{
    return{
        type:actionTypes.setIngredient,
        ingredients:ingredients
    };
}


export const fetchFailed=(error)=>{
    return{
        type:actionTypes.fetchFailed,
    }
}


export const initIngredient=()=>{
    // return dispatch=>{
    //     Axios.get('/ingredients.json')
    //     .then(response=>{
    //         dispatch(setIngredients(response.data));
    //     })
    //     .catch(err=>{
    //         dispatch(fetchFailed(err));
    //     });
    // }
    return {
        type:actionTypes.initIngredient
    }
}