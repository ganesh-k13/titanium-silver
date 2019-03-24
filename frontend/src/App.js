import React, { Component } from 'react';
import Navbar from "./components/layout/Navbar.js";
import Jumbotron from "./components/layout/Jumbotron.js";
import Footer from "./components/layout/Footer.js";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <Jumbotron />
                <Footer />
            </div>
        );
    }
}

export default App;
