import React from "react";
import { Container,Col,Row,Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function SignUp(props) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="4">
                    <Container 
                        fluid={true} 
                        style={{marginTop:"10px"}}
                    >
                        SignUp
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

const marginTop = {
    marginTop:"10px"
};

const marginBottom = {
    marginBottom:"10px"
};

export default SignUp;