import React,{ Component } from "react";
import {
    Navbar,
    Nav,
    Button,
    ButtonToolbar
} from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify';

import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";

class NavbarComponent extends Component {
    constructor(...args){
        super(...args);
        this.state = {

        }
    }

    logOut = () => {
        axios({
            method: 'post',
            url: "http://"+SERVER_IP+":"+SERVER_PORT+"/api/logout/access",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("accessToken")
            },
            data: {}
        }).then((resp)=>{
            console.log(resp);
            axios({
                method: 'post',
                url: "http://"+SERVER_IP+":"+SERVER_PORT+"/api/logout/refresh",
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("refreshToken")
                },
                data: {}
            }).then((resp)=>{
                console.log(resp);
                toast.success('Logout Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }).catch((resp)=>{
                console.log(resp);
                toast.error("You're not logged in yet.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            })
        }).catch((resp)=>{
            console.log(resp);
            toast.error("You're not logged in yet.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        })

    }

    render(){
        return (
            <Navbar bg="dark" variant="dark" style={navBarStyle}>
                <Nav className="mr-auto">
                    <a href="/">
                        <Navbar.Brand>&nbsp;&nbsp;&nbsp;
                            Titanium Silver
                        </Navbar.Brand>
                    </a>
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
