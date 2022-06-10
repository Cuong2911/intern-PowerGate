import React from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';

import LoginForm from '../../components/LoginForm'
import '../register.scss'
import logo1 from '../../../../assets/logo-1.png'
import logo2 from '../../../../assets/logo-2.png'
import { ILoginParams } from '../../../../models/auth'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PATHS } from '../../../../configs/api'
import { AppState } from '../../../../redux/reducer'
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode';
import { ROUTES } from '../../../../configs/routes';
import { getErrorMessageResponse } from '../../../../utils';
import { setUserInfo } from '../../redux/authReducer';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import { FormattedMessage } from 'react-intl';

const LoginPage = () => {  

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [ loading, setLoading ] = React.useState(false);
  const [ errMessages, setErrMessages ] = React.useState('');

  const onLogin = React.useCallback(
    async (value: ILoginParams) => {
      setErrMessages('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', {
          email: value.email,
          password: value.password,
        }),
      );

      setLoading(false);

      if(json?.code === RESPONSE_STATUS_SUCCESS) {
        setErrMessages('Login Success')
        // dispatch action set user data
        dispatch(setUserInfo(json.data));
        
        // set login token to cookie when user choose remember me
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, {
          expires: value.rememberMe ? 7 : undefined
        });          

        setTimeout(() => {
          dispatch(replace(ROUTES.home));
        },1500)
        return;
      } else {
        setErrMessages(getErrorMessageResponse(json));
        setTimeout(()=>{
          setErrMessages('');
        },1500);
      }
      
      
    },
    [dispatch]
  )

  return (
    <div className="register-page">

      <div className="logo">
        <img className="logo-1" src={logo1} alt="logo-1" />
        <img className="logo-2" src={logo2} alt="logo-2" />
      </div>

      <div className="register-form-container">
        <LoginForm onLogin={onLogin} loading={loading} errMessages={errMessages}/>
        
        <a href="/sign-up">
          <FormattedMessage id="register" />
        </a>
      </div>
    </div>
  )
}

export default LoginPage