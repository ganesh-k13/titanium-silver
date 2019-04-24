import React,{ Component } from "react";
import { Container,Col,Row,Form,Button } from "react-bootstrap";
import uuidv4 from "uuid/v4";

class SetTestBody extends Component{
	constructor(...args){
		super(...args);
		this.state={
			id:"",
			questionName:"",
			cpu:"",
			memory:"",
			testCases:"",
			expectedOutputs:""
		}
	}

	formValChange = (e) =>{
		this.setState({[e.target.id]:e.target.value});
	}

	submitValues = () => {
		this.setState({id:uuidv4()},()=>{
			this.props.addTest(this.state);
		});
	}

	render(){
		return(
			<div>
				<Container>
					<Row>
						<Col xl={12} lg={12} md={12}>
							<Form.Label>Enter your question here:</Form.Label>
						</Col>
					</Row>
					<Row>
						<Col xl={12} lg={12} md={12}>
							<Form.Control as="textarea" rows="3" id="questionName" onChange={this.formValChange}/>
						</Col>
					</Row>
				</Container>
				
				<Container>
					<Row>
						<Col xl={6} lg={6} md={6}>
							<Form.Label>CPU:</Form.Label>
							<Form.Control type="text" placeholder="CPU Usage" id="cpu" onChange={this.formValChange}/>
							<Form.Text className="text-muted">
								Example: 3GHz, 1.2GHz
							</Form.Text>
						</Col>
						<Col xl={6} lg={6} md={6}>
							<Form.Label>Memory:</Form.Label>
							<Form.Control type="text" placeholder="Memory Usage" id="memory" onChange={this.formValChange}/>
							<Form.Text className="text-muted">
								Example: 100MB, 1GB
							</Form.Text>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>	
						<Col xl={6} lg={6} md={6}>
							<Form.Label>Test Cases:</Form.Label>
						</Col>
						<Col xl={6} lg={6} md={6}>
							<Form.Label>Expected Outputs:</Form.Label>
						</Col>
					</Row>
					<Row>	
						<Col xl={6} lg={6} md={6}>
							<Form.Control as="textarea" rows="3" id="testCases" onChange={this.formValChange}/>
							<Form.Text className="text-muted">
								End each test case with the text in a new line"---testcase---".
							</Form.Text>
						</Col>
						<Col xl={6} lg={6} md={6}>
							<Form.Control as="textarea" rows="3" id="expectedOutputs" onChange={this.formValChange}/>
							<Form.Text className="text-muted">
								End each expected output with the text in a new line"---testcase---".
							</Form.Text>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col md={{ span: 2, offset: 8 }}  lg={{ span: 2, offset: 8 }}  xl={{ span: 2, offset: 8 }}>
					        <Button onClick={this.submitValues} variant="success" block>Save</Button>
						</Col>
						<Col md={{ span: 2 }}  lg={{ span: 2 }}  xl={{ span: 2 }}>
                    		<Button variant="danger" onClick={this.props.hideModal} block>Cancel</Button>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}


				// <Container>
				// 	<Row  style={{marginTop:"40px"}}>
				// 		<Col xl={12} lg={12} md={12}>
				// 			Choose the languages to allow:
				// 		</Col>
				// 	</Row>
				// </Container>
				// <Container>
				// 	<Row>
				// 		<Col xl={12} lg={12} md={12}>
				//             <Form.Check inline label="C" type="checkbox"/>
				//             <Form.Check inline label="C++" type="checkbox"/>
				//             <Form.Check inline label="Java" type="checkbox"/>
				//             <Form.Check inline label="Python3" type="checkbox"/>
				//             <Form.Check inline label="Python" type="checkbox"/>
				//             <Form.Check inline label="Ruby" type="checkbox"/>
				//             <Form.Check inline label="PHP5.x" type="checkbox"/>
				//             <Form.Check inline label="PHP7.x" type="checkbox"/>
				// 		</Col>
				// 	</Row>
				// </Container>
				// <Container>
				// 	<Row  style={{marginTop:"40px"}}>
				// 		<Col xl={6} lg={6} md={6}>
				// 			<Form.Label>Test Cases and Expected Outputs File:</Form.Label>
				// 			<Form.Text className="text-muted">
				// 				Name Test Case as "in***" and its Expected Output as "out***"<br/>
				// 				where *** are digits and the same number. Eg: in001 and out001<br/>
				// 				are mapped.
				// 			</Form.Text>
				// 		</Col>
				// 		<Col xl={6} lg={6} md={6}>
				// 			<input type="file"/>
				// 		</Col>
				// 	</Row>
				// </Container>
export default SetTestBody;