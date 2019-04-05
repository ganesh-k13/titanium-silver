import React,{ Component } from "react";
import { 
    Container,
    Col,
    Row,
    Alert,
    Button,
	Form
} from "react-bootstrap";

class QuestionKey extends Component{
	constructor(...args){
		super(...args);
		this.state = {

		}
	}

	render(){
		return(
			<Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Challenge Key</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						This key will be in your email.
					</Form.Text>
				</Form.Group>
				<Container>
					<Row>
						<Col md={{ span: 2, offset: 8 }}  lg={{ span: 2, offset: 8 }}  xl={{ span: 2, offset: 8 }}>
					        <Button type="submit" onClick={this.submitValues} variant="success" block>Save</Button>
						</Col>
						<Col md={{ span: 2 }}  lg={{ span: 2 }}  xl={{ span: 2 }}>
                    		<Button variant="danger" onClick={this.props.onHide} block>Cancel</Button>
						</Col>
					</Row>
				</Container>
			</Form>
		);
	}

}

export default QuestionKey;