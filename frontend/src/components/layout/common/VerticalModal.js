import React, { Component } from 'react';
import { Modal } from "react-bootstrap";

class VerticalModal extends Component {
    componentDidMount(){
        console.log("VerticAl mounted");
    }

    render() {
        console.log("Modal props:",this.props);
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
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

                    // {this.props.modalfooter}
                    // <Button variant="danger" onClick={this.props.onHide}>Cancel</Button>
export default VerticalModal;