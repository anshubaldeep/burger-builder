import React from 'react';
import classes from './Order.module.css';


const Order=(props)=>{
        const Ingredients= [];
        for(let ingredientName in props.ingredients)
        {
            Ingredients.push({
                name:ingredientName,
                amount:props.ingredients[ingredientName]
            });
        }

        const ingredientOutput= Ingredients.map(res=>{
            return <span 
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border:'1px solid #ccc',
                padding:'5px'
            }}
            key={res.name}>{res.name} - {res.amount}  </span>
        })

        return(
            <div className={classes.Order}>
                <p>Ingredients: {ingredientOutput}</p>
                <p>Price: <strong>{props.price.toFixed(2)}$</strong></p>
            </div>
        );
}

export default Order;