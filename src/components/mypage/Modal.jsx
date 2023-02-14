import React from 'react';
import './Modal.css';

export default function Modal({ setModalOpen, id, title, content, writer }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="Modal">
      <button className="close" onClick={closeModal}>
        X
      </button>
      <p>모달창입니다.</p>
    </div>
  );
}
