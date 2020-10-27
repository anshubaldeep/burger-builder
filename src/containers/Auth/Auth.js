import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import {updateObject,checkValidity} from '../../shared/utility';




class Auth extends Component{
    state={
        controls:{
            email:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Mail Address'
            },
            value:'',
            validation:{
                required:true,
                isEmail:true
            },
            valid:false,
            touched:false
        },
        password:{
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder:'Password'
            },
            value:'',
            validation:{
                required:true,
                minLength:6
            },
            valid:false,
            touched:false
        },
    }
}



 inputchangedHandler=(event,controlName)=>{
    const updatedControls=updateObject(this.state.controls,{
        [controlName]:updateObject(this.state.controls[controlName],{
            value:event.target.value,
            valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
            touched:true
        })
    });
    this.setState({controls:updatedControls});
 }

 submitHandler=(event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
 }

 switchAuthHandler=()=>{
     this.setState(prevState=>{
         return{
             isSignup:!prevState.isSignup
         }
     })
 }


 componentDidMount(){
    if(!this.props.building && this.props.authRedirectPath!=='/')
    {
        this.props.onAuthRedirectPath();
    }
 }


    render()
    {
        const formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        let form=formElementsArray.map(formElement=>(
            <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.inputchangedHandler(event,formElement.id)}
                key={formElement.id}
                invalid={!formElement.config.valid} 
                shouldValidate={formElement.config.validation}   
                touched={formElement.config.touched}

            />
        ))
        if(this.props.loading)
            {
                form=<Spinner/>
            }
        let errorMessage=null;
        if(this.props.error)
        {
            errorMessage=(
            <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated)
        {
            authRedirect=<Redirect to={this.props.authRedirectPath}/>
        }

        return(
            <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType='Success'>Submit</Button>
            </form>
            <Button btnType='Danger'
                    clicked={this.switchAuthHandler}
            >Switch to {this.state.isSignup?'Sign-In':'Sign-up'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,method)=>dispatch(actionCreators.auth(email,password,method)),
        onAuthRedirectPath:(path)=>dispatch(actionCreators.authRedirectPath("/"))
    }
}

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        building:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth);