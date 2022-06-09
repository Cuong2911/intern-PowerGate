import React, { lazy, Suspense } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/Login/LoginPage'));
const SignupPage = lazy(() => import('./modules/auth/pages/Signup/Signup'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense 
      fallback={
        <div className="page-loading">
          <AiOutlineLoading3Quarters className='page-load-icon' />
        </div>
      }
    >
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path={ROUTES.signup} component={SignupPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />

        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
