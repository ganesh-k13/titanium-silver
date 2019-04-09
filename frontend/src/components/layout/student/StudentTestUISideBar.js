import React from "react";
import { Container,Col,Row,Button } from "react-bootstrap";

function StudentTestUISideBar() {
	return (

		<Col xl={2} style={sideBarStyle}>
			<Container>
				<Row style={questionStyle}>
					<Col xl={12}>
						<Button> Question 1 </Button>
					</Col>
				</Row>
				<Row style={questionStyle}>
					<Col xl={12}>
						<Button> Question 2 </Button>
					</Col>
				</Row>
				<Row style={questionStyle}>
					<Col xl={12}>
						<Button> Question 3 </Button>
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
	height:"1000px"	
}

export default StudentTestUISideBar;