import React from "react";
import {Navbar} from "react-bootstrap";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";

function NavbarComponent() {
    return (
        <Navbar bg="dark" variant="dark" style={navBarStyle}>
            <Navbar.Brand><i className="fa fa-align-justify"></i>&nbsp;&nbsp;&nbsp;Titanium Silver</Navbar.Brand>
        </Navbar>
    );
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
