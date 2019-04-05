import React from "react";
import { Container,Col,Row } from "react-bootstrap";

import StudentTestUISideBar from "./StudentTestUISideBar";

function StudentTestUI() {
	return (
		<React.Fragment>
			<Container fluid={true}>
				<Row>
					<StudentTestUISideBar />
					<Col xl={10}>
						<Container>

							{/* This row has all tests that are live */}
		                    <Row style={{marginTop:"20px"}}>
		                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
		                            <Container style={paddLeftZero}>
		                                <Row>
		                                    <Col xl={12} lg={12} md={12} style={paddLeftZero}>
		                                        <div>Questions:</div>
		                                    </Col>
		                                </Row>
		                                <Row style={outlineBorder}>
		                                    <Col xl={12} lg={12} md={12}>
		                                        <div>Questions appear here</div>
		                                    </Col>
		                                </Row>
		                            </Container>
		                        </Col>
		                    </Row>

		                    {/* This row has all tests set but not started */}
		                    <Row style={{marginTop:"20px"}}>
		                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
		                            <Container style={paddLeftZero}>
		                                <Row>
		                                    <Col xl={12} lg={12} md={12} style={paddLeftZero}>
		                                        <div>Solve question:</div>
		                                    </Col>
		                                </Row>
		                                <Row style={outlineBorder}>
		                                    <Col xl={12} lg={12} md={12}>
		                                        <div>File upload tab here</div>
		                                    </Col>
		                                </Row>
		                            </Container>
		                        </Col>
		                    </Row>

		                    {/* This row has all completed tests */}
		                    <Row style={{marginTop:"20px"}}>
		                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
		                            <Container style={paddLeftZero}>
		                                <Row>
		                                    <Col xl={12} lg={12} md={12} style={paddLeftZero}>
		                                        <div>Results:</div>
		                                    </Col>
		                                </Row>
		                                <Row style={outlineBorder}>
		                                    <Col xl={12} lg={12} md={12}>
		                                        <div>Results appear here</div>
		                                    </Col>
		                                </Row>
		                            </Container>
		                        </Col>
		                    </Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}



const outlineBorder = {
    border : "1px solid #000000"
};

const paddLeftZero = {
    paddingLeft:"0px"
};

const paddRightZero = {
    paddingRight:"0px"
};

export default StudentTestUI;