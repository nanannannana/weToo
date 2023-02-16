import React from 'react';
// import { ReactDOM } from 'react-dom';

const ModalOverlay = () => {
  return <div></div>;
};

const portalElement = document.getElementById('overlays');

export default function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}
