import React from "react";
import { Container,Col,Row,Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
			                    <Link to={"/student"}>
                                    <Button variant="secondary" size="lg">
			                            Student
			                        </Button>
                                </Link>
                    		</Col>
                    		<Col xl={6}>
			                    <Link to={"/teacher"}>
                                    <Button variant="secondary" size="lg">
			                            Teacher
			                        </Button>
                                </Link>
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