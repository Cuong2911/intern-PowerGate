import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FormattedMessage } from 'react-intl';

import './Form.scss';

interface Props {
    label: string;
    onSubmit(): void;
    loading: boolean;
}

const FormSubmit = (props : Props) => {
    const { label, onSubmit,loading } = props;

    return (
        <div className="form-submit">
            <button 
            className={'btn form-btn ' + (loading && 'disable')}
            onClick={e => {
                onSubmit();
                e.preventDefault();      
            }}
            >
            {loading ? 
                <AiOutlineLoading3Quarters className="loading"/>:
                <FormattedMessage id={label}/>
            }
            </button>
        </div>
    )
}

export default FormSubmit