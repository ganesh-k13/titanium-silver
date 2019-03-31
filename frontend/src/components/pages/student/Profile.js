import React from "react";
import { Container,Col,Row } from "react-bootstrap";

// import StudentProfileDisplay from "../../layout/student/ProfileDisplay";

function Profile() {
	return (
		<div>
			<Container>
				{/* This row is just title only */}
				<Row style={profileTitle}>
					<Col xl={12} lg={12} md={12} style={paddLeftZero}>
						Student
					</Col>
				</Row>

				{/* This row handles profile information */}
				<Row style={outlineBorder}>
					<Col xl={12} lg={12} md={12}>
						<Container>
							<Row>
								<Col xl={3} lg={3} md={3} >
									<div style={picStyle}>Pic Here</div>
								</Col>
								<Col xl={9} lg={9} md={9}>
									Info Here
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>

				{/* This row handles live challenges information */}
				<Row style={{marginTop:"20px"}}>
					<Col xl={12} lg={12} md={12} style={paddRightZero}>
						<Container style={paddLeftZero}>
							<Row>
								<Col xl={12} lg={12} md={12} style={paddLeftZero}>
									<div>Live Challenges</div>
								</Col>
							</Row>
							<Row style={outlineBorder}>
								<Col xl={12} lg={12} md={12}>
									<div>Challenges appear here</div>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>

				{/* This row handles scheduled challenges information */}
				<Row style={{marginTop:"20px"}}>
					<Col xl={12} lg={12} md={12} style={paddRightZero}>
						<Container style={paddLeftZero}>
							<Row>
								<Col xl={12} lg={12} md={12} style={paddLeftZero}>
									<div>Scheduled Challenges</div>
								</Col>
							</Row>
							<Row style={outlineBorder}>
								<Col xl={12} lg={12} md={12}>
									<div>Challenges appear here</div>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>
				
				{/* This row handles completed challenges information */}
				<Row style={{marginTop:"20px"}}>
					<Col xl={12} lg={12} md={12} style={paddRightZero}>
						<Container style={paddLeftZero}>
							<Row>
								<Col xl={12} lg={12} md={12} style={paddLeftZero}>
									<div>Completed Challenges</div>
								</Col>
							</Row>
							<Row style={outlineBorder}>
								<Col xl={12} lg={12} md={12}>
									<div>Challenges appear here</div>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

const profileTitle = {
	
};

const picStyle = {
	height 			: "200px",
	width 			: "200px",
	border 			: "1px solid #000000",
	marginTop 		: "5px", 
	marginBottom 	: "5px" 
};

const outlineBorder = {
	border : "1px solid #000000"
};

const paddLeftZero = {
	paddingLeft:"0px"
};

const paddRightZero = {
	paddingRight:"0px"
};

export default Profile;