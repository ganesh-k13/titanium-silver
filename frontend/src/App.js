import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/pages/home/Home";
import Login from "./components/layout/login/Login";
import SignUp from "./components/layout/signup/SignUp";
import StudentProfile from "./components/layout/student/Profile";
import Navbar from "./components/layout/common/Navbar";

import TeacherProfile from "./components/layout/teacher/Profile";
import TeacherSetTest from "./components/layout/teacher/SetTest";
import StudentTestUI from "./components/layout/student/StudentTestUI";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/student" component={StudentProfile} />
                    <Route path="/teacher" component={TeacherProfile} />
                    <Route path="/studentTest" component={StudentTestUI} />
                    <Route path="/setTest" component={TeacherSetTest} />
                </div>
            </Router>
        );
    }
}

export default App;
