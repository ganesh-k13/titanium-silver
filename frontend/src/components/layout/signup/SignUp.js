import React,{ Component } from "react";
import { Container,Col,Row,Dropdown,Alert } from "react-bootstrap";
import axios from "axios";

import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";

class SignUp extends Component{
    
    constructor(...args){
        super(...args);
        this.state = {
            "acctType":"Student",
            "ID":"",
            "name":"",
            "detailType":"semester",
            "detailValue":"",
            "username":"",
            "password":"",
            "alertVariant":"",
            "alertMessage":""
        }
    }
    
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    formSubmit = (e) => {
        e.preventDefault();
        // Submit to backend and put into database.
        let inpData = {
            "acctType":this.state.acctType,
            "ID":this.state.ID,
            "name":this.state.name,
            "detailType":this.state.detailType,
            "detailValue":this.state.detailValue,
            "username":this.state.username,
            "password":this.state.password           
        }

        let registrationThis = this;

        axios.post("http://"+SERVER_IP+":"+SERVER_PORT+"/api/registration",inpData)
        .then(function (resp) {
            if(resp["data"].hasOwnProperty("success")){
                localStorage.setItem("accessToken",resp["data"]["accessToken"]);
                localStorage.setItem("refreshToken",resp["data"]["refreshToken"]);
                registrationThis.setState({
                    "alertVariant":"success",
                    "alertMessage":"Registration successful, you'll be redirected soon",
                });
                if(inpData.acctType === "Student"){
                    setTimeout(()=>{registrationThis.props.history.push("/student")},2000);
                }
                else{
                    setTimeout(()=>{registrationThis.props.history.push("/teacher")},2000);
                }
            }
            else if(resp["data"].hasOwnProperty("error")){
                registrationThis.setState({
                    "alertVariant":"danger",
                    "alertMessage":resp["data"]["error"],
                });
            }
            else{
                registrationThis.setState({
                    "alertVariant":"warning",
                    "alertMessage":resp["data"]["message"] || "Server Error",
                });
            }
        })
        .catch(function (resp) {
            console.log(resp);
            registrationThis.setState({
                "alertVariant":"danger",
                "alertMessage":"Username/Password Error",
            });
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    changeAcctType = (e) => {
        let acctName = e.target.id;
        let detailType = "";

        if(acctName === "Student"){
            detailType="semester";
        }
        else{
            detailType="designation";
        }

        this.setState({
            "acctType":e.target.id,
            "detailType":detailType
        })
    }

    render(){
        return (
            <Container>
                <Row className="justify-content-md-center" style={{marginBottom:"20px"}}>
                    <Col xs lg="4">
                        <Container 
                            fluid={true} 
                            style={{marginTop:"10px"}}
                        >
                            <Row>
                                <Col xl={12} lg={12} md={12}>
                                    <div style={marginTop}>
                                        <Alert variant={this.state.alertVariant}>
                                            {this.state.alertMessage}
                                        </Alert>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12} lg={12} md={12}>
                                    <h2> Sign Up! </h2>
                                </Col>
                            </Row>
                            <form onSubmit={this.formSubmit}>

                                <Row style={marginTop}>
                                    <Col xl={12} lg={12} md={12}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="signupAcctDropdown" style={fullWidth}>
                                                Account type: {this.state.acctType}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu style={fullWidth}>
                                                <Dropdown.Item id="Student" onClick={this.changeAcctType}>Student</Dropdown.Item>
                                                <Dropdown.Item id="Teacher" onClick={this.changeAcctType}>Teacher</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                <Row style={marginTop}>
                                    <Col xl={12} lg={12} md={12}>
                                        <span>USN/ID</span>
                                        <input type="text" name="ID" className="form-control" onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row style={marginTop}>
                                    <Col xl={12} lg={12} md={12}>
                                        <span>Name</span>
                                        <input type="text" name="name" className="form-control" onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row style={marginTop}>
                                    <Col xl={12} lg={12} md={12}>
                                        <span>{this.capitalizeFirstLetter(this.state.detailType)}</span>
                                        <input type="text" name="detailValue" className="form-control" onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row style={marginTop}>
                                    <Col xl={12} lg={12} md={12}>
                                        <span>EmailID</span>
                                        <input type="email" name="username" className="form-control" onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row style={marginTop}>
                                    <Col xl={12} lg={12} md={12}>
                                        <span>Password</span>
                                        <input type="password" name="password" className="form-control" onChange={this.handleChange}/>
                                    </Col>
                                </Row>
                                <Row style={marginTop}>
                                    <Col xl={12} lg={12} md={12}>
                                        <span>Repeat Password</span>
                                        <input type="password" name="password" className="form-control"/>
                                    </Col>
                                </Row>
                                <Row style={marginTop}>
                                    <Col xl={12} lg={12} md={12}>
                                        <button className="btn btn-success btn-block" type="submit">Sign Up!</button>
                                    </Col>
                                </Row>
                            </form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const fullWidth={
    width:"100%",
    marginTop:"10px"
}

const marginTop = {
    marginTop:"10px"
};

// const marginBottom = {
//     marginBottom:"10px"
// };

export default SignUp;