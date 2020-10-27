import React from 'react';
import burgerLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const Logo = () =>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="My Burger" />
    </div>
)

export default Logo;