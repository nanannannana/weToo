import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { modal } from '../../store/modules/challenge';

export default function ChModal() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.challenge.modal);
  const ModalClose = () => dispatch(modal(false));

  return (
    <>
      <Modal show={show} onHide={ModalClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bolder' }}>
            참여하기 완료!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          기부 결제가 완료되었습니다! <br />
          기부에 참여해주셔서 대단히 감사합니다!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
