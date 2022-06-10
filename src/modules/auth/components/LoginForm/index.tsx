import React from 'react';
import { FormattedMessage } from 'react-intl';

import FormItem from '../Form/FormItem'
import { ILoginParams, ILoginValidation } from '../../../../models/auth';
import { validateLogin, validLogin } from '../../utils';
import ToastMessage from '../../components/Toast/ToastMessage';
import FormSubmit from '../Form/FormSubmit';


interface Props {
  onLogin(value: ILoginParams): void, 
  loading: boolean, 
  errMessages: string 
}

const LoginForm = (props: Props) => {
  const {onLogin, loading, errMessages} = props;
  const LoginToast = {
    fail : 'Invalid username / password',
    success : 'Login Success',
  }
  
  const [ formValues, setFormValues ] = React.useState<ILoginParams>({email: '', password: '', rememberMe: true});
  const [ validate,setValidate ] = React.useState<ILoginValidation>()
  

  const onChangeEmail = (value : string) => {
    setFormValues({...formValues, email: value})
  }
  const onChangePassword = (value : string) => {
    setFormValues({...formValues, password: value})
  }

  const onSubmit = React.useCallback(() => {
    // check validate
    const validate = validateLogin(formValues);

    setValidate(validate);
    
    // if validate check true call api check acc
    // else return
    if(!validLogin(validate)){
      
      return;
    }

    onLogin(formValues);
  },[formValues, onLogin])

  return (
    <>
      {
        (errMessages === LoginToast.fail) &&
        <ToastMessage type="fail" text={errMessages}/>
      }
      {
        (errMessages === LoginToast.success) &&
        <ToastMessage type="success" text={errMessages}/>
      }
  
      <form className="form-register">
        <FormItem 
          type={'email'}
          label={'email'}
          formValues={formValues.email} 
          onChangeValue={onChangeEmail}
          validate={validate?.email}
          />
        <FormItem 
          type={'password'}
          label={'password'}
          formValues={formValues.password} 
          onChangeValue={onChangePassword}
          validate={validate?.password}
        />

        <div className="form-item check-box">
          <input 
            className="form-input" 
            id="inputRememberMe" 
            type='checkbox' 
            checked={formValues.rememberMe}
            onChange={() => {
              setFormValues(prev => ({
                ...prev,
                rememberMe: !prev.rememberMe
              }));
            }}
          />
          <label className="form-label" htmlFor="inputRememberMe">
            <FormattedMessage id="rememberMe" />
          </label>
        </div>
  
        <FormSubmit 
          label="login"
          onSubmit={onSubmit}
          loading={loading}
        />
      </form>
    </>
  )
}

export default LoginForm