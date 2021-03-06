import React from 'react';

import { IGenderParams, ILocationParams, ISignupParams } from '../../../../models/auth';
import { validateSignup, validSignup } from '../../utils';
import FormItem from '../Form/FormItem';
import FormItemSelect from '../Form/FormItemSelect';
import FormSubmit from '../Form/FormSubmit';
import ToastMessage from '../Toast/ToastMessage';


interface Props {
  onSignup(value: ISignupParams): void; 
  loading: boolean; 
  errMessages: string;
  regions: Array<ILocationParams>;
  states: Array<ILocationParams>;
  getStates(id: number | string): Promise<void>
}

const SignupForm = (props: Props) => {
  const { 
    onSignup, 
    loading, 
    errMessages, 
    regions, 
    states ,
    getStates
  } = props;
  
  const [formValues, setFormValues] = 
    React.useState<ISignupParams>({
      email: '',
      password: '',
      repeatPassword: '',
      name: '',
      gender: '',
      region: '',
      state: '',
    });

  const onChangeFormValue = {
    email: (value : string) => {
      setFormValues({...formValues, email: value})
    },
    password: (value : string) => {
      setFormValues({...formValues, password: value})
    },
    repeatPassword: (value : string) => {
      setFormValues({...formValues, repeatPassword: value})
    },
    name: (value : string) => {
      setFormValues({...formValues, name: value})
    },
    gender: (value : string) => {
      setFormValues({...formValues, gender: value})
    },
    region: (value : string) => {
      setFormValues({...formValues, region: value})
    },
    state: (value : string) => {
      setFormValues({...formValues, state: value})
    }
  }

  React.useEffect(() => {
    getStates(formValues.region);
  },[formValues.region]);

  const [validate, setValidate] = 
    React.useState<ISignupParams>();

    const onSubmit = React.useCallback(() => {
      const validate = validateSignup(formValues);
      
      setValidate(validate);

      if (!validSignup(validate)) {
        return;
      }
  
      onSignup(formValues);
    },[formValues, onSignup])

  const GENDER: IGenderParams[] = [
    {
      label: 'Nam',
      value: 'Man',
    },
    {
      label: 'N???',
      value: 'Woman',
    },
  ]

  const renderGender = () => {
    const arrRender: JSX.Element[] = [
      <option disabled  value={''} key={''}>
        --select an option--
      </option>,
    ];
    GENDER.map((g: IGenderParams, index: number) =>{
      arrRender.push(
        <option value={g.value} key={index}>
          {g.label}
        </option>
      )
    })
    return arrRender
  };

  const renderRegion = () => {
    const arrRender: JSX.Element[] = [
      <option disabled  value={''} key={''}>
        --select an option--
      </option>,
    ];
    regions.map((loca: ILocationParams, index: number) =>{
      arrRender.push(
        <option value={loca.id} key={index}>
          {loca.name}
        </option>
      )
    })
    return arrRender
  };

  const renderState = () => {
    const arrRender: JSX.Element[] = [
      <option disabled  value={''} key={''}>
        --select an option--
      </option>,
    ];
    
    states.map((state: ILocationParams, index: number) =>{
      arrRender.push(
        <option value={state.id} key={index}>
          {state.name}
        </option>
      )
    })
    return arrRender
  };

  const LoginToast = {
    fail : 'Invalid username / password',
    success : 'Signup Success',
  }
  return (

    <>
      {
        (errMessages !== LoginToast.success) && 
        !!errMessages &&
        <ToastMessage type="fail" text={errMessages}/>
      }
      {
        (errMessages === LoginToast.success) &&
        <ToastMessage type="success" text={errMessages}/>
      }
      <form className="form-register">
        <div className="form-item-list">
          <FormItem
            label={'email'}
            placeholder='Nh???p email ...'
            formValues={formValues.email} 
            onChangeValue={onChangeFormValue.email}
            validate={validate?.email}
          />
          <FormItem 
            type={'password'}
            label={'password'}
            placeholder='Nh???p m???t kh???u ...'
            formValues={formValues.password} 
            onChangeValue={onChangeFormValue.password}
            validate={validate?.password}
          />
          <FormItem 
            type={'password'}
            label={'repeatPassword'}
            placeholder='Nh???p l???i m???t kh???u ...'
            formValues={formValues.repeatPassword} 
            onChangeValue={onChangeFormValue.repeatPassword}
            validate={validate?.repeatPassword}
          />
          <FormItem
            label={'name'}
            placeholder='Nh???p h??? v?? t??n ...'
            formValues={formValues.name} 
            onChangeValue={onChangeFormValue.name}
            validate={validate?.name}
          />
          <FormItemSelect
            label={'gender'}
            formValues={formValues.gender} 
            onChangeValue={onChangeFormValue.gender}
            validate={validate?.gender}
          >
            {renderGender()}
          </FormItemSelect>
          <FormItemSelect
            label={'region'}
            formValues={formValues.region} 
            onChangeValue={onChangeFormValue.region}
            validate={validate?.region}
          >
            {renderRegion()}
          </FormItemSelect>
          { states.length > 0 &&
            <FormItemSelect
              label={'state'}
              formValues={formValues.state} 
              onChangeValue={onChangeFormValue.state}
              validate={validate?.state}
            >
              {renderState()}
            </FormItemSelect>
          }
        </div>
  
  
        <FormSubmit 
          label="register"
          onSubmit={onSubmit}
          loading={loading}
        />
      </form>
    </>
  )
}

export default SignupForm