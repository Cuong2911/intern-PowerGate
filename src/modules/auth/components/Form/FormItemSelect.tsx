import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FormattedMessage } from 'react-intl';

import './Form.scss';

interface Props {
    label?: string;
    formValues: string ;
    onChangeValue(value: string): void;
    validate: string | undefined;
}

const FormItemSelect: React.FC<Props> = ({
    children,
    ...props
}) => {
    const { 
        label = '', 
        formValues, 
        onChangeValue , 
        validate
    } = props;
    
    return (
        <div className="form-item">
            <label className="form-label" htmlFor={"input" + label}>
                <FormattedMessage id={label} />
            </label>

            <select 
                className={`form-control`}
                value={formValues}
                onChange={e => onChangeValue(e.target.value)}
            >
                {children}
            </select>

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

export default FormItemSelect