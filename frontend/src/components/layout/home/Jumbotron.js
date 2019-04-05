import React from "react";
import {Jumbotron,Container,ButtonToolbar,Button} from "react-bootstrap";
import { Link } from "react-router-dom";

// import Background from "../../images/jumbotron.jpg";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";

function JumbotronContainer() {
    return (
        <Jumbotron fluid style={jumbotronStyle}>
            <Container>
                <span style={jumbotronTitleStyle}>Ease your coding lab automation</span>
                <ButtonToolbar>
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

const jumbotronStyle = {
    height: "500px",
}

const jumbotronTitleStyle = {
    fontSize:"30px",
    fontWeight:"medium",
    marginTop:"10px"
}

export default JumbotronContainer;
