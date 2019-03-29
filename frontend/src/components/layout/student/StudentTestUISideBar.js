import React from "react";
import { Container,Col,Row } from "react-bootstrap";

function StudentTestUISideBar() {
	return (

		<Col xl={2} style={sideBarStyle}>
			<Container>
				<Row style={questionStyle}>
					<Col xl={12}>
						<a> Question 1 </a>
					</Col>
				</Row>
				<Row style={questionStyle}>
					<Col xl={12}>
						<a> Question 2 </a>
					</Col>
				</Row>
				<Row style={questionStyle}>
					<Col xl={12}>
						<a> Question 3 </a>
					</Col>
				</Row>
			</Container>
		</Col>
	);
}

const questionStyle = {
	paddingTop:"5px",
	paddingBottom:"5px"
}

const sideBarStyle = {
	backgroundColor:"#C9C9C9",
	height:document.documentElement.scrollHeight	
}

export default StudentTestUISideBar;