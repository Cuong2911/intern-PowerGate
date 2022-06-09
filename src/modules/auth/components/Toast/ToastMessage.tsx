import React from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { AiFillCheckCircle } from 'react-icons/ai'

import './ToastMessage.scss';

interface Props { 
  type: string,
  text: string
}

const ToastMessage = ( props: Props ) => {

  const { type, text } = props;

  return (
    <div className={'toast ' + type}>
      <div className="toast-icon">
        {type === 'fail' && <FaTimesCircle />}
        {type === 'success' && <AiFillCheckCircle />}
      </div>
      <span>
        {text}
      </span>
    </div>
  )
}

export default ToastMessage