import React,{Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../axios.orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index'; 
import {updateObject,checkValidity} from '../../shared/utility';

class ContactData extends Component{
    state={
        orderFrom:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipcode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Zipcode'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:6,
                        maxLength:6
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your E-Mail'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayName:'Fatest'},
                            {value:'cheapest',displayName:'Cheapest'}
                        ]
                    },
                    validation:{},
                    value:'fastest',
                    valid:true
                },
        },
        formIsValid:false,
        loading:false
    }


   

    orderHandler=(event)=>{
        event.preventDefault();
         this.setState({loading:true})
         const formData={};
         for(let formElementIdentifier in this.state.orderFrom)
         {
             formData[formElementIdentifier]=this.state.orderFrom[formElementIdentifier].value;
         }
        const order = {
            ingredients:this.props.ingredients,
            orderData:formData,
            price:this.props.totalprice,
            userId:this.props.userId
        }
        this.props.onSubmitForm(order,this.props.token);     
    }


    inputchangedHandler=(event,inputId)=>{
        const updatedFormElement=updateObject(this.state.orderFrom[inputId],{
            value:event.target.value,
            valid:checkValidity(event.target.value,this.state.orderFrom[inputId].validation),
            touched:true
        });
        const updatedOrderFrom =updateObject(this.state.orderFrom,{
            [inputId]: updatedFormElement
        })

        let formIsValid=true;
        for(let id in updatedOrderFrom)
        {
            formIsValid=updatedOrderFrom[id].valid && formIsValid;
        }

        this.setState({
            orderFrom:updatedOrderFrom,
            formIsValid:formIsValid
        })
    }
    
    render()
    {   
        const formElementsArray=[];
        for(let key in this.state.orderFrom){
            formElementsArray.push({
                id:key,
                config:this.state.orderFrom[key]
            });
        }
        let form=(
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement=>(
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
                    ))}
                    <Button btnType='Success' disabled={!this.state.formIsValid}>Submit</Button>
                </form>
        );
        if(this.props.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        totalprice:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onSubmitForm:(orderData,token)=>dispatch(actionCreators.purchaseBurger(orderData,token))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,Axios));