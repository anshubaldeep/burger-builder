import React from 'react';
import classes from './Input.module.css';


const Input=(props)=>{
        let inputElement =null;
        const inputClassses=[classes.InputElement];

        if(props.invalid && props.shouldValidate && props.touched)
        {
            inputClassses.push(classes.Invalid);
        }


        switch(props.elementType){
            case('input'):inputElement=
            <input 
                className={inputClassses.join(' ')} 
                {...props.elementConfig} value={props.value}
                    onChange={props.changed}
                />
            break;
            case('textarea'):inputElement=
            <textarea  
                className={inputClassses.join(' ')} 
                {...props.elementConfig} value={props.value}
                    onChange={props.changed}
                />
            break;
            case('select'):inputElement=(
            <select  
                className={classes.InputElement} 
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option=>(
                    <option value={option.value} key={option.value}>{option.displayName}</option>
                ))}
            </select>    
            )
            break;
            default:
                inputElement=<input 
                    className={inputClassses.join(' ')}  
                    {...props.elementConfig} value={props.value}
                        onChange={props.changed}
                    />
        }
        return(
            <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            </div>
        );
}

export default Input;