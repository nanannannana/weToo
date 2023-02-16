import React from 'react';
const ModalOverlay = () => {
  return <div></div>;
};

const portalElement = document.getElementById('overlays');

export default function Modal(props) {
  return (
    <>
      {React.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}
