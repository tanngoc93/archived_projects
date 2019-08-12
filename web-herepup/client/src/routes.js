import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { SignUp } from './scenes/Users/scenes/SignUp';
import { SignIn } from './scenes/Users/scenes/SignIn';
import { Profile } from './scenes/Users/scenes/Profile';
import { NewProduct } from './scenes/Products/scenes/NewProduct';
import { Home } from './scenes/Home';

export const RoutesWithoutHeader = (location) => {
  return (
    <Switch location={location}>
      <Route path='/' exact component={Home} /> 
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/profile' component={Profile} />
      <Route path='/newProduct' component={NewProduct} />
    </Switch>
  )
}

export const RoutesWithHeader = (location) => {
  return (
    <div>
      <Header>
        { RoutesWithoutHeader(location) }
      </Header> 
    </div>
  )
}