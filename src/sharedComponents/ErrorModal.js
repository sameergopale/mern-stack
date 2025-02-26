import { Modal } from "react-bootstrap";

const ErrorModal = ({ error, clearError }) => {
  return (
    <Modal show={error} onHide={clearError}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error?.message}</Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
