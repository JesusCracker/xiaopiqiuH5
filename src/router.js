import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import dynamic from 'dva/dynamic'


function RouterConfig({history, app}) {
  const LoginPage = dynamic({
    app,
    component: () => import('./routes/LoginPage')
  })
  const CounterPage = dynamic({
    app,
    component: () => import('./routes/CounterPage')
  })
  const RegisterPage = dynamic({
    app,
    component: () => import('./routes/RegisterPage')
  })
  const Protocol=dynamic({
    app,
    component:()=>import('./components/Protocol')
  })
  const Privacy=dynamic({
    app,
    component:()=>import('./components/Privacy')
  })
  const ForgotPage = dynamic({
    app,
    component: () => import('./routes/ForgotPage')
  })
  const MyScore = dynamic({
    app,
    component: () => import('./routes/MyScorePage')
  })

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/counter" exact component={CounterPage}/>
        <Route path="/register" exact component={RegisterPage}/>
        <Route path="/register/protocol" exact component={Protocol}/>
        <Route path="/register/privacy" exact component={Privacy}/>
        <Route path="/forgot" exact component={ForgotPage}/>
        <Route path="/myscore" exact component={MyScore}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
