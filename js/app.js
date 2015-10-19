import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHashHistory } from 'history';

import TopicsGrid from './components/TopicsGrid';
import Topic from './components/Topic';
import NoMatch from './components/NoMatch';

const history = createHashHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={TopicsGrid}/>
    <Route path="topic/:topic" component={Topic}/>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app'));
