import React,{ Component } from "react";
import { Container,Col,Row,Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class Login extends Component{

    constructor(...args){
        super(...args);
        this.state = {
            "acctType":"Student"
        }
    }

    changeAcctType = (e) => {
        this.setState({"acctType":e.target.id})
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
                            <form className="form-signin">
                                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                                <Row>
                                    <Col xl={12} lg={12} md={12}>
                                        <div style={marginTop}>
                                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12} lg={12} md={12}>
                                        <div style={marginTop}>
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
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
                                                <Dropdown.Item id="Student" onClick={this.changeAcctType}>Student</Dropdown.Item>
                                                <Dropdown.Item id="Teacher" onClick={this.changeAcctType}>Teacher</Dropdown.Item>
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