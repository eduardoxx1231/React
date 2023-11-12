import React, { PropsWithChildren, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
type Props = {
  status?: Variant;
};

const ToastComponent: React.FC<PropsWithChildren<Props>> = ({
  children,
  status = 'dark',
}) => {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer
      className="p-3 pt-5"
      position="top-end"
      style={{ zIndex: 1 }}
    >
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        bg={status}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Wordstorm</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
