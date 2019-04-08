import React,{ Component } from "react";
import { 
    Container,
    Col,
    Row,
    Alert,
    Button,
	Form
} from "react-bootstrap";
import { Link } from "react-router-dom";

class QuestionKey extends Component{
	constructor(...args){
		super(...args);
		this.state = {
			alertVariant:"",
			alertMessage:"",
			challengeID:""
		}
	}

	changeKey = (e) => {
		this.setState({
			challengeID:e.target.value
		})
	}
	
	submitValues = (e) => {
		console.log("clicked");
		window.history.push("/")
	}

	render(){
		return(
			<div>
				<Form.Group controlId="formBasicEmail">
					<Container>
						<Row>
							<Col md={12}  lg={12}  xl={12}>
								<Alert variant={this.state.alertVariant}>
									{this.state.alertMessage}
								</Alert>
							</Col>
						</Row>
					</Container>
					<Form.Label>Challenge Key</Form.Label>
					<Form.Control type="number" name="challengeID" onChange={this.changeKey} placeholder="Enter key" />
					<Form.Text className="text-muted">
						This key will be in your email.
					</Form.Text>
				</Form.Group>
				<Container>
					<Row>
						<Col md={{ span: 2, offset: 8 }}  lg={{ span: 2, offset: 8 }}  xl={{ span: 2, offset: 8 }}>
				        	<Button type="submit" onClick={this.submitValues} variant="success" block>
				        		OK
				        	</Button>
						</Col>
						<Col md={{ span: 2 }}  lg={{ span: 2 }}  xl={{ span: 2 }}>
                    		<Button variant="danger" onClick={this.props.onHide} block>Cancel</Button>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}

}

export default QuestionKey;