import React,{ Component } from "react";
import {
    Navbar,
    Nav,
    Button,
    ButtonToolbar
} from "react-bootstrap";
import axios from "axios";
import { withRouter } from 'react-router-dom';

import "../../../../node_modules/font-awesome/css/font-awesome.min.css";

class NavbarComponent extends Component {
    constructor(...args){
        super(...args);
        this.state = {

        }
    }

    logOut = () => {
        axios.get(
            "http://localhost:8000/api/logout/access",
            {
                headers: {
                    "Authorization" : "Bearer "+localStorage.getItem("accessToken")
                }
            }
        )
        .then((resp) => {
            console.log("Done:",resp)
        })
        .catch((resp) => {
            console.log("Done:",resp)
        })

        axios.get(
            "http://localhost:8000/api/logout/refresh",
            {
                headers: {
                    "Authorization" : "Bearer "+localStorage.getItem("refeshToken")
                }
            }
        )
        .then((resp) => {
            console.log("Done:",resp)
        })
        .catch((resp) => {
            console.log("Done:",resp)
        })
    }

    render(){
        return (
            <Navbar bg="dark" variant="dark" style={navBarStyle}>
                <Nav className="mr-auto">
                    <Navbar.Brand>&nbsp;&nbsp;&nbsp;Titanium Silver</Navbar.Brand>
                </Nav>
                <Nav>
                    <ButtonToolbar>
                        <Button variant="outline-light" style={buttonStyle} onClick={this.logOut}><i className="fa fa-sign-out"></i></Button>
                    </ButtonToolbar>
                </Nav>
            </Navbar>
        );

    }
}

const buttonStyle = {
    border:"None",
    fontSize:"20px"
}

const navBarStyle = {
    position: "fixed",
    top: "0px",
    left: "0px",
    zIndex: "998",
    width: "100%",
    backgroundColor: "#FFFFFF",
    color: "#000000"
}

export default NavbarComponent;
