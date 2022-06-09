import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FormattedMessage } from 'react-intl';

import './Form.scss';

interface Props {
    label?: string;
    type?: string;
    placeholder?: string;
    formValues: string ;
    onChangeValue(value: string): void
    validate: string | undefined
}

const FormItem = (props : Props) => {
    const { 
        type = 'text', 
        label = '', 
        placeholder = '', 
        formValues, 
        onChangeValue , 
        validate,
    } = props;
    
    const [ hidePassword, setHidePassword ] = React.useState(true);


    return (
        <div className="form-item">
            <label className="form-label" htmlFor={"input" + label}>
                <FormattedMessage id={label} />
            </label>

            <div className={`form-control ${validate ? 'form-item-valid' : ''}`}>
                <input 
                className="form-input" 
                id={"input"+label} 
                type={hidePassword ? type : "text"}
                placeholder={placeholder}
                value={formValues}
                onChange={e => {
                    onChangeValue(e.target.value);
                }}
                />
                {   (type === 'password' && formValues) &&
                    <label 
                        htmlFor="inputPassword"
                        className="form-input-btn" 
                        onClick={() => {
                            setHidePassword(!hidePassword);
                        }}
                        >
                        {hidePassword ? 
                            <AiFillEye className="form-input-icon"/> :
                            <AiFillEyeInvisible className="form-input-icon"/>
                        }
                    </label>
                }
            </div>

            <span className="form-error-wrap">
                { !!validate && 
                <small className="form-error">
                    <FormattedMessage id={validate} />
                </small>
                }
            </span>
            </div>
    )
}

export default FormItem