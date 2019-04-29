import React from "react";
import {Jumbotron,Container,ButtonToolbar,Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Jumbotron.css";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";

function JumbotronContainer() {
    return (
        <Jumbotron fluid className="jumbotronStyle">
            <Container>
                <span style={jumbotronTitleStyle}>Ease your coding lab automation</span>
                <ButtonToolbar style={jumbotronButton}>
                    <Link to={"/login"}>
                        <Button variant="secondary" size="lg">
                            Get Started
                        </Button>
                    </Link>
                </ButtonToolbar>
            </Container>
        </Jumbotron>
    );
}

const jumbotronTitleStyle = {
    fontSize:"30px",
    fontWeight:"medium",
    marginTop:"10px",
    color:"white"
}

const jumbotronButton = {
    marginTop:"40px"
}

export default JumbotronContainer;
