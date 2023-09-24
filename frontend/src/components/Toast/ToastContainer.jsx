import React, { useContext } from 'react'
import { ToastContext } from '../../context/Toast/ToastContext'
import Toast from './Toast'

const ToastContainer = () => {
    const { state } = useContext(ToastContext)
    return (
        <div className="absolute top-16 w-full z-[99999]">
            <div className="max-w-[20rem] mx-auto flex flex-col justify-center">
                {state.toasts && state.toasts.map((toast) => (<Toast key={toast.id} toast={toast} />))}
            </div>
        </div>
    )
}

export default ToastContainer