import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

class ConfirmButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  callOkAction = () => {
    this.props.okAction && this.props.okAction();
    this.handleClose();
  };

  callCancelAction = () => {
    this.props.cancelAction && this.props.cancelAction();
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ modalVisible: false });
  };
  handleShow = () => {
    this.setState({ modalVisible: true });
  };

  render() {
    return (
      <>
        <Button
          variant="outline-danger"
          size="sm"
          className="px-3"
          onClick={this.handleShow}
        >
          {this.props.buttonLabel}
        </Button>

        <Modal show={this.state.modalVisible} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.confirmTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.confirmText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.callCancelAction}>
              {this.props.cancelButtonText}
            </Button>
            <Button variant="primary" onClick={this.callOkAction}>
              {this.props.confirmButtonText}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

ConfirmButton.defaultProps = {
  buttonLabel: 'Default Button Label',
  confirmTitle: 'Warning',
  confirmText: 'Are you sure?',
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
};

ConfirmButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  okAction: PropTypes.func,
  cancelAction: PropTypes.func,
  confirmTitle: PropTypes.string,
  confirmText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
};
export default ConfirmButton;
