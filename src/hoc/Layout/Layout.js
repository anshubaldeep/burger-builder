import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from '../Layout/Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{
    state={
        showSideDrawer:false
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerOpenedHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!this.state.showSideDrawer}
        })
    }
   
    render(){
    return( 
    <Aux>
        <Toolbar menuClicked={this.sideDrawerOpenedHandler}
            isAuth={this.props.isAuthenticated}
        />
        <SideDrawer open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHandler} 
            isAuth={this.props.isAuthenticated}
            />
        <main className={classes.Content}>
            {this.props.children}
        </main>
        </Aux>
        );
  }
}
    
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}



export default connect(mapStateToProps)(Layout);
    
