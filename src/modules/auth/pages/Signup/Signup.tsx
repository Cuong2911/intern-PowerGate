import React from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { FormattedMessage } from 'react-intl';

import SignupForm from '../../components/SignupForm'
import '../register.scss'
import logo1 from '../../../../assets/logo-1.png'
import logo2 from '../../../../assets/logo-2.png'
import { AppState } from '../../../../redux/reducer'
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode';

const Signup = () => {  

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [ loading, setLoading ] = React.useState(false);
  const [ errMessages, setErrMessages ] = React.useState('');
  const [ regions, setRegions ] = React.useState([]);
  const [ states, setStates ] = React.useState([]);

  const getRegions = React.useCallback(
   async () => {
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));
    
    setLoading(false);

    if(json?.code === RESPONSE_STATUS_SUCCESS) {
      setRegions(json.data);
      return;
    }
   },
   []
  );

  React.useEffect(() => {
    getRegions();
  }, [getRegions]);

  const getStates = React.useCallback(
    async (id: number | string) => {
     if(id) {
      setLoading(true);
 
      const json = await dispatch(fetchThunk(API_PATHS.getState+id, 'get'));
      
      setLoading(false);
  
      if(json?.code === RESPONSE_STATUS_SUCCESS) {       
        setStates(json.data);
        return;
      }
     } else {
       setStates([])
     }
    },
    []
   );

  const onSignup = React.useCallback(
    () => {
      console.log('dang ky');      
    },
    []
  );

  return (
    <div className="register-page">

      <div className="logo">
        <img className="logo-1" src={logo1} alt="logo-1" />
        <img className="logo-2" src={logo2} alt="logo-2" />
      </div>

      <SignupForm 
        onSignup={onSignup} 
        loading={loading} 
        errMessages={errMessages}
        regions={regions}
        states={states}
        getStates={getStates}
      />

      <a href="/login">
        <FormattedMessage id="login" />
      </a>
    </div>
  )
}

export default Signup