import React, {useContext,useRef, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.css'

const ModalContext = React.createContext();

export function ModalProvider({children}){
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
        <ModalContext.Provider value= {value}>{children}</ModalContext.Provider>
        <div ref={modalRef}/>
        </>
    )
}

export function ParentModal({onClose, children}){
    const modalNode = useContext(ModalContext);
    if(!modalNode) return null;

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='background' onClick={onClose}/>
            <div id='content'>{children}</div>
        </div>,
        modalNode
    );
}
