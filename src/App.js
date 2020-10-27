import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter } from 'react-router-dom';
import { Route , Switch,Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';
import asyncComponent from './hoc/async/asyncComponent';


const asyncCheckout=asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
})

const asyncOrders=asyncComponent(()=>{
  return import('./containers/Orders/Orders');
})

const asyncAuth=asyncComponent(()=>{
  return import('./containers/Auth/Auth');
})

class App extends Component{
  componentDidMount(){
    this.props.onAuthCheck();
  }
  render(){
    let routes=(
      <Switch>
         <Route path='/auth' component={asyncAuth}/>
         <Route path='/' exact component={BurgerBuilder}/>
         <Redirect to='/'/>
      </Switch>
    );

    if(this.props.isAuth)
    {
      routes=(
        <Switch>
            <Route path='/checkout' component={asyncCheckout}/>
            <Route path='/orders' component={asyncOrders} />
            <Route path='/auth' component={asyncAuth}/>
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder}/>
            <Redirect to='/'/>
        </Switch>
      )
    }
    return (
      <BrowserRouter>
      <div>
        <Layout>
        {routes}
        </Layout>
      </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onAuthCheck:()=>dispatch(actionCreators.authCheckState()),
  }
}

const mapStateToProps=state=>{
  return{
    isAuth:state.auth.token!==null
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
