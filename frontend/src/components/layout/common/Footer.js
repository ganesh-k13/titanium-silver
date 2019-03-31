import React from "react";
import {Container,Row,Col,Button} from "react-bootstrap";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";

function FooterComponent() {
    return (
        <footer style={footerStyle}>
            <Container style={footerContainerStyle} fluid={true} >
                <Row>
                    <Col xl={4} large={4} md={4}>
                        <i className="fa fa-copyright"></i> Copyright Titanium Silver 2019.
                    </Col>
                    <Col xl={6} large={6} md={5}>
                    </Col>
                    <Col xl={2} large={2} md={3}>
                        <Button variant="outline-light" className="float-right" style={footerSocialIconsStyle} ><i className="fa fa-facebook"></i></Button>
                        <Button variant="outline-light" className="float-right" style={footerSocialIconsStyle} ><i className="fa fa-twitter"></i></Button>
                        <Button variant="outline-light" className="float-right" style={footerSocialIconsStyle} ><i className="fa fa-reddit"></i></Button>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

const footerStyle = {
    position: "absolute",
    right: "0px",
    bottom: "0px",
    left: "0px",
    width: "100%",
    backgroundColor: "#212121",
    color: "#FFFFFF"
}

const footerContainerStyle = {
    paddingTop: "10px",
    paddingBottom: "10px"
}

const footerSocialIconsStyle = {
    color:"inherit",
    marginLeft: "20px"
}

export default FooterComponent;
