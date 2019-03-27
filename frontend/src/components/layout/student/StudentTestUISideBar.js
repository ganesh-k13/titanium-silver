import React from "react";

function StudentTestUISideBar() {
	return (
		<nav className="col-md-2 d-none d-md-block bg-light sidebar" style={{height:window.innerHeight,borderRight:"1px solid black"}}>
		    <div className="sidebar-sticky">
		        <ul className="nav flex-column">
		            <li className="nav-item">
		                <a className="nav-link active" style={darkLink}>
		                    Question 1
		                </a>
		            </li>
		            <li className="nav-item">
		                <a className="nav-link" style={darkLink}>
		                    Question 2
		                </a>
		            </li>
		            <li className="nav-item">
		                <a className="nav-link" style={darkLink}>
		                    Question 3
		                </a>
		            </li>
		        </ul>
		    </div>
		</nav>		
	);
}

const darkLink = {
	color:"#000000"
};

export default StudentTestUISideBar;