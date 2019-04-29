import React from "react";
import {Container,Row,Col,Button} from "react-bootstrap";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";

function FooterComponent() {
    return (
        <Container className="footer">
            <Row>
                <Col
                    xl={5}
                    lg={5}
                    md={5}
                >
                    <i class="fa fa-copyright"></i> Copyright 2019, Titanium Silver.
                </Col>
                <Col
                    xl={{span:6,offset:1}}
                    lg={{span:6,offset:1}}
                    md={{span:6,offset:1}}
                >
                    Guide: Channa Bankapur; Authors: Ganesh, Rahul, Gurunandan.
                </Col>
            </Row>
        </Container>
    );
}

export default FooterComponent;
