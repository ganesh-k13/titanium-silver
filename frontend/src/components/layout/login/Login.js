import React,{ Component } from "react";
import { Container,Col,Row,Dropdown,Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component{

    constructor(...args){
        super(...args);
        this.state = {
            "acctType":"Student",
            "username":"",
            "password":"",
            "alertVariant":"",
            "alertMessage":"",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value || e.target.id
        });
    }

    formSubmit = (e) => {
        e.preventDefault();
        // Submit to backend and put into database.
        let inpData = {
            "acctType":this.state.acctType,
            "username":this.state.username,
            "password":this.state.password            
        }

        let loginThis = this;

        axios.post('http://localhost:5000/api/login',inpData)
        .then(function (resp) {
            if(resp["data"].hasOwnProperty("success")){
                localStorage.setItem("accessToken",resp["data"]["accessToken"]);
                localStorage.setItem("refreshToken",resp["data"]["refreshToken"]);
                loginThis.setState({
                    "alertVariant":"success",
                    "alertMessage":"Login successful, you'll be redirected soon",
                });
                loginThis.props.history.push("/");
            }
            else if(resp["data"].hasOwnProperty("error")){
                loginThis.setState({
                    "alertVariant":"danger",
                    "alertMessage":resp["data"]["error"],
                });
            }
            else{
                loginThis.setState({
                    "alertVariant":"warning",
                    "alertMessage":resp["data"]["message"] || "Server Error",
                });
            }
        })
        .catch(function (resp) {
            console.log(resp);
        })
    }

    render(){
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="4">
                        <Container 
                            fluid={true} 
                            style={{marginTop:"10px"}}
                        >
                            <form className="form-signin" onSubmit={this.formSubmit}>
                                <Row>
                                    <Col xl={12} lg={12} md={12}>
                                        <div style={marginTop}>
                                            <Alert variant={this.state.alertVariant}>
                                                {this.state.alertMessage}
                                            </Alert>
                                        </div>
                                    </Col>
                                </Row>

                                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                                <Row>
                                    <Col xl={12} lg={12} md={12}>
                                        <div style={marginTop}>
                                            <input type="email" className="form-control" name="username" placeholder="Email address" onChange={this.handleChange} required=""/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12} lg={12} md={12}>
                                        <div style={marginTop}>
                                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} required=""/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12} lg={12} md={12}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="signupAcctDropdown" style={fullWidth}>
                                                Account type {this.state.acctType}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu style={fullWidth}>
                                                <Dropdown.Item name="acctType" id="Student" onClick={this.handleChange}>Student</Dropdown.Item>
                                                <Dropdown.Item name="acctType" id="Teacher" onClick={this.handleChange}>Teacher</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xl={12} lg={12} md={12}>
                                        <div style={marginTop}>
                                            <button className="btn btn-success btn-block" type="submit">Sign in</button>
                                        </div>
                                    </Col>
                                </Row>

                            </form>

                            <Row>
                                <Col xl={12} lg={12} md={12}>
                                    <div style={marginTop}>
                                        <Link to={"/signup"}>
                                            <button className="btn btn-primary btn-block">Sign Up</button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
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

// <div className="checkbox mb-3">
//     <label>
//         <input type="checkbox" value="remember-me"/> Remember me
//     </label>
// </div>
// <Row>
//     <Col xl={6}>
//         <Link to={"/student"}>
//             <Button variant="secondary" size="lg">
//                 Student
//             </Button>
//         </Link>
//     </Col>
//     <Col xl={6}>
//         <Link to={"/teacher"}>
//             <Button variant="secondary" size="lg">
//                 Teacher
//             </Button>
//         </Link>
//     </Col>
// </Row>

export default Login;