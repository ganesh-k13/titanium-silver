import React from "react";
import {Jumbotron,Container,ButtonToolbar,Button} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import Background from "../../images/jumbotron.jpg";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";

function Index() {
  return <h2>Home</h2>;
}

function JumbotronContainer() {
    return (
        <Jumbotron fluid style={jumbotronStyle}>
            <Container>
                <span style={jumbotronTitleStyle}>Ease your coding lab automation</span>
                <ButtonToolbar>
                    <Button variant="secondary" size="lg">
                        Get Started!
                    </Button>
                </ButtonToolbar>
            </Container>
        </Jumbotron>
    );
}

const jumbotronStyle = {
    height: "500px",
}

const jumbotronTitleStyle = {
    fontSize:"30px",
    fontWeight:"medium",
    marginTop:"10px"
}

export default JumbotronContainer;
