import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
// import BaseRouter from '@/route/base';
// import UserRouter from '@/route/user';
import BaseRouter from '@/layout/BasicLayout';
import UserRouter from '@/layout/UserLayout';
// import ErrorPage from '@/components/layout/ErrorPage';

const RouterPage = memo(() => {
  return (
    <Switch>
      <Route path="/user" component={UserRouter}></Route>
      <Route path="/" component={BaseRouter}></Route>
      {/* <ErrorPage>
        <Route path="/" component={BaseRouter}></Route>
      </ErrorPage> */}
    </Switch>
  )
})
RouterPage.displayName = 'RouterPage';

export default RouterPage;