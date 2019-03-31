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
                        <Row>
                            <Col xl={12} lg={12} md={12}>
                                <h2> Sign Up! </h2>
                            </Col>
                        </Row>
                        <Row style={marginTop}>
                            <Col xl={12} lg={12} md={12}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={fullWidth}>
                                        Select account type
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={fullWidth}>
                                        <Dropdown.Item >Student</Dropdown.Item>
                                        <Dropdown.Item >Teacher</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row style={marginTop}>
                            <Col xl={12} lg={12} md={12}>
                                <span>USN/ID</span>
                                <input type="text" className="form-control"/>
                            </Col>
                        </Row>
                        <Row style={marginTop}>
                            <Col xl={12} lg={12} md={12}>
                                <span>Name</span>
                                <input type="text" className="form-control"/>
                            </Col>
                        </Row>
                        <Row style={marginTop}>
                            <Col xl={12} lg={12} md={12}>
                                <span>Designation/Semester</span>
                                <input type="text" className="form-control"/>
                            </Col>
                        </Row>
                        <Row style={marginTop}>
                            <Col xl={12} lg={12} md={12}>
                                <span>EmailID</span>
                                <input type="email" className="form-control"/>
                            </Col>
                        </Row>
                        <Row style={marginTop}>
                            <Col xl={12} lg={12} md={12}>
                                <span>Password</span>
                                <input type="password" className="form-control"/>
                            </Col>
                        </Row>
                        <Row style={marginTop}>
                            <Col xl={12} lg={12} md={12}>
                                <button className="btn btn-success btn-block" type="submit">Sign Up!</button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

const fullWidth={
    width:"100%",
    marginTop:"10px"
}

const marginTop = {
    marginTop:"10px"
};

const marginBottom = {
    marginBottom:"10px"
};

export default SignUp;