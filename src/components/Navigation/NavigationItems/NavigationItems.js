import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';


const NavigationItems =(props)=>{
    let auth=<NavigationItem link="/auth">Authenticate</NavigationItem>;
    if(props.isAuth)
    {
        auth=<NavigationItem link="/logout">Logout</NavigationItem>
    }
    return(
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Burger Builder</NavigationItem>
        {props.isAuth?<NavigationItem link="/orders">Orders</NavigationItem>:null}
        {auth}
    </ul>
)}

export default NavigationItems;