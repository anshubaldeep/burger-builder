import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'


const controls=[
    
    { label:'Salad', type:'salad' },
    { label:'Meat', type:'meat' },
    { label:'Bacon', type:'bacon' },
    { label:'Cheese', type:'cheese'}
];



const BuildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map(ctrl=>
        (
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                added={()=>props.addIngredient(ctrl.type)}
                removed={()=>props.removeIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                />
        ))}
        <button className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuthenticated?"ORDER NOW!":"SIGNUP TO ORDER"}</button>
        </div>
    );
}

export default BuildControls;