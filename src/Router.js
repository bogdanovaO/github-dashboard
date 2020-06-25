import React, { Component } from 'react'
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import RepoDetails from './components/RepoDetails';
import Repositories from './components/Repositories';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ Repositories }/>
        <Route exact path='/:id' component={ Repositories }/>
        <Route exact path='/detail/:id' component={ RepoDetails }/>
      </Switch>
      </BrowserRouter>
    )
  }
}
