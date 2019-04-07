import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	ButtonToolbar,
	Button
} from "react-bootstrap";
import axios from "axios";

import VerticalModal from "../common/VerticalModal";

class ActiveChallengeItem extends Component {

	constructor(...args){
		super(...args);
		this.state = {
			modalShow:false,
			modalBody:"",
			modaltitle:""
		}
	}

	stopChallenge = () => {
		let inpData = {
			cID:this.props.ID
		}
        axios({
			method: 'post',
			url: 'http://localhost:8000/api/stopchallenge',
			headers: {
				"Authorization":"Bearer "+localStorage.getItem("accessToken")
			},
			data: inpData
		}).then((resp)=>{
			console.log(resp);
			this.setState({
				modalShow:true,
				modalBody:"Stopped successfully",
				modaltitle:"Stop Challenge"
			});
		}).catch((resp)=>{
			console.log(resp);
			this.setState({
				modalShow:true,
				modalBody:"Server error",
				modaltitle:"Stop Challenge"
			});
		})
	}

	handleClose = () => {
		this.setState({
			modalShow:false
		})
	}

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
					<Col xl={3} lg={3} md={3} sm={3} xs={3}>
						<ButtonToolbar>
							<Button 
								variant="danger"
								id={this.props.ID}
								style={{paddingLeft:"8px"}} 
								onClick={this.stopChallenge} 
								block
							>
								Stop Challenge
							</Button>
						</ButtonToolbar>
					</Col>
					<VerticalModal
						show={this.state.modalShow}
						onHide={this.handleClose}
						modaltitle={this.state.modaltitle}
						modalbody={this.state.modalBody}
					/>
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

export default ActiveChallengeItem; 