import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageLoading from '@/components/layout/PageLoading';

const DashBoard = lazy(() => import(/* webpackChunkName: "DashBoard" */'@/views/dashboard/index'))
const Test = lazy(() => import(/* webpackChunkName: "Test" */'@/views/test/index'))
const ErrorPage = lazy(() => import(/* webpackChunkName: "ErrorPage" */'@/components/layout/ErrorPage'))

const BaseRouter = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {/* <Route path="/" component={DashBoard} /> */}
        <Route exact path="/home" component={DashBoard} />
        <Route exact path="/test" component={Test} />
        {/* <Redirect from='/' to='/home'/> */}
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Suspense>
  )
}

export default BaseRouter;
