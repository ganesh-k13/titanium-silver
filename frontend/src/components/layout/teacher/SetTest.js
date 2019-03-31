import React, { Component } from 'react';
import { Container,Col,Row,ButtonToolbar,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

import VerticalModal from '../common/VerticalModal';
import SetTestBody from "./SetTestBody";
// import SetTestFooter from "./SetTestFooter";
import Question from "./Question";

class SetTest extends Component {
	constructor(...args) {
		super(...args);

		this.state = { 
			modalShow: false ,
			questions:[]
		};
	}

	componentDidMount(){
		
	}
	
	addTest = (question) => {
		console.log("addTest");
		console.log(question);
		this.setState({ questions: [...this.state.questions, question] })
	}

	addChallenge = (question) => {
		console.log("addChallenge");
		let questions = this.state.questions;
		let props = this.props;

		axios.post('https://jsonplaceholder.typicode.com/posts', {
			questions
		})
		.then(response => {
			console.log("done:",response);
			props.history.push("/teacher");
		});
	}
    
    render() {
    	console.log("SetTest prop:",this.props);
		let modalClose = () => this.setState({ modalShow: false });

		return (
			<div>
				<Container>
					<Row>
						<Col xl={12} lg={12} md={12} style={titleStyle}>
							Set a Test
						</Col>
					</Row>

					<Row>
						<Col xl={12} lg={12} md={12} >
							Questions
							<div id="questionBox" style={questionsBoxStyle}>
								<Question questions={this.state.questions}/>
							</div>
						</Col>
					</Row>

					<Row>
						<Col xl={12} lg={12} md={12}>
							<ButtonToolbar>
								<Button
									variant="primary"
									onClick={() => this.setState({ modalShow: true })}
									block
								>
									Add a question
								</Button>

								<VerticalModal
									show={this.state.modalShow}
									modaltitle="Question"
									modalbody={<SetTestBody addTest={this.addTest} onHide={modalClose}/>}
								/>
							</ButtonToolbar>
						</Col>
					</Row>

					<Row style={{marginTop:"10px"}}>
						<Col xl={6} lg={6} md={6}>
							<Button
								variant="success"
								onClick={this.addChallenge}
								block
							>
								Done
							</Button>
						</Col>
						<Col xl={6} lg={6} md={6}>
							<Link to={"/teacher"}>
								<Button
									variant="danger"
									block
								>
									Cancel
								</Button>
							</Link>
						</Col>
					</Row>
				</Container>

			</div>
		);
    }
}

const titleStyle = {
	fontSize:"24px",
	marginBottom:"10px"
}

const questionsBoxStyle = {
	marginBottom:"10px",
	height:"300px",
	// border:"1px solid black",
	boxShadow: "0px 0px 5px -2px rgba(0,0,0,0.75)",
	overflowY:"scroll"
}

export default SetTest;