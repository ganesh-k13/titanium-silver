import React, { Component } from 'react';
import { Modal } from "react-bootstrap";

class VerticalModal extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={this.props.onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.modaltitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.modalbody}
                </Modal.Body>
            </Modal>
        );
    }
}

export default VerticalModal;