import React from "react";
import { Container,Col,Row,Form } from "react-bootstrap";

function SetTestBody(args){
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
						<Form.Control as="textarea" rows="3" />
					</Col>
				</Row>
			</Container>
			
			<Container>
				<Row>
					<Col xl={6} lg={6} md={6}>
						<Form.Label>CPU:</Form.Label>
						<Form.Control type="text" placeholder="CPU Usage" defaultValue="2GHz"/>
						<Form.Text className="text-muted">
							Example: 3GHz, 1.2GHz
						</Form.Text>
					</Col>
					<Col xl={6} lg={6} md={6}>
						<Form.Label>Memory:</Form.Label>
						<Form.Control type="text" placeholder="CPU Usage" defaultValue="100MB"/>
						<Form.Text className="text-muted">
							Example: 100MB, 1GB
						</Form.Text>
					</Col>
				</Row>
			</Container>			
			<Container>
				<Row>
					<Col xl={12} lg={12} md={12}>
						<Form.Label>Test Cases:</Form.Label>
					</Col>
				</Row>			
				<Row>
					<Col xl={12} lg={12} md={12}>
						<Form.Control as="textarea" rows="3" />
						<Form.Text className="text-muted">
							End each test case with the text in a new line"---testcase---".
						</Form.Text>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default SetTestBody;