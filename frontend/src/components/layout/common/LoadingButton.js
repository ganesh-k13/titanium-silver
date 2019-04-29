import React, { Component } from "react";
import {
    Button
} from "react-bootstrap";

class LoadingButton extends Component {
    render() {
        return (
            <Button
                variant={this.props.variant}
                disabled={this.props.isLoading}
                onClick={!this.props.isLoading ? this.props.onClick : null}
                block={this.props.isBlock}
            >
                {this.props.isLoading ? this.props.loadingText : this.props.btnText}
            </Button>
        );
    }
}

export default LoadingButton;