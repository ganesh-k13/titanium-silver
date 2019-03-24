import React from "react";
import { Container,Col,Row,Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import StudentProfile from "../student/profile.js";
import TeacherProfile from "../teacher/profile.js";

function Login(argument) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="4" style={loginBoxStyle}>
                    The existing login/auth stuff will be added here
                    <Container fluid={true} style={{marginTop:
                    	"10px"}}>
                    	<Row>
                    		<Col xl={6}>
			                    <Button variant="secondary" size="lg">
			                        <Link to={"/student"}>Student </Link>
			                    </Button>
                    		</Col>
                    		<Col xl={6}>
			                    <Button variant="secondary" size="lg">
			                        <Link to={"/teacher"}>Teacher </Link>
			                    </Button>
                    		</Col>
                    	</Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

const loginBoxStyle = {

};

export default Login;