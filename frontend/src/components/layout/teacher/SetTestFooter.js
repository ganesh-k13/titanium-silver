import React, { Component } from "react";
import { Button } from "react-bootstrap";

class SetTestFooter extends Component{

	render(){
		return(
	        <Button onClick={this.props.addTest} variant="success">Save</Button>
		);
	}
}

export default SetTestFooter;