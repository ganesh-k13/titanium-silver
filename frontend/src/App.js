import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/pages/home/Home.js";
import Login from "./components/pages/login/Login.js";
import StudentProfile from "./components/pages/student/profile.js";
import TeacherProfile from "./components/pages/teacher/profile.js";


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/student" component={StudentProfile} />
                    <Route path="/teacher" component={TeacherProfile} />
                </div>
            </Router>
        );
    }
}

export default App;
