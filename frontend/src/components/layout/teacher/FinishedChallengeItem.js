import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	ButtonToolbar,
	Button
} from "react-bootstrap";

class FinishedChallengeItem extends Component {
	render() {
		return (
			<Container style={questionWrapperStyle}>
				<Row style={questionStyle}>
					<Col xl={9} lg={9} md={9} sm={9} xs={9}>
						<span style={questionNameStyle}>ID: {this.props.ID}</span><br/>
						<span style={questionDetsStyle}>Time Limit: </span>
						<span style={questionDetsStyle}>{this.props.timeLimitHrs} hrs</span>
						<span style={questionDetsStyle}> {this.props.timeLimitMins} mins</span>
					</Col>
				</Row>
			</Container>
		);
	}
}


const questionWrapperStyle = {
	paddingLeft:"10px",
	paddingRight:"10px"
}

const questionStyle = {
	marginTop:"10px",
	paddingLeft:"10px",
	paddingRight:"10px",
	borderBottom:"1px solid black"
}

const questionNameStyle = {
	fontSize:"20px"	
}

const questionDetsStyle = {
	fontSize:"15px"	
}

export default FinishedChallengeItem;