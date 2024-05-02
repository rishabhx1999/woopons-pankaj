import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";


import { Link } from "react-router-dom";


import {
  	ADMIN_DASHBOARD_DATA,
  	RECENT_CLUB_REQUEST
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
});

const mapDispatchToProps = (dispatch) => ({
});



const MainView = (props) => {

	return (
		<Fragment>
			<section className="dashboard-section">
				<Container fluid>  
			      	<div className="shadow-box">
			      		<Row className="mb-5">
				           <Col md={12}>
				           		<p className="user-title"> Chats</p>
				           	</Col>
				        </Row>

				        <Row className="">
				           <Col md={1}>
				           		<Image src={user} />
				           	</Col>
				           <Col md={10}>
				           		<div className="chat-details">
				           			<p>User name</p>
				           			<div className="user-tags">
				           				<span>Abilify</span>
				           				<span>Haldol</span>
				           				<span>Effexor XR</span>
				           			</div>
				           		</div>				           	
				           </Col>
				           <Col md={1}>
				           		<div className="chat-day text-center">
				           			<p>Today</p>
				           			<span className="blue-round">3</span>
				           		</div>
				           	</Col>
				        </Row>

				        <hr />

				        <Row className="">
				           <Col md={1}>
				           		<Image src={user} />
				           	</Col>
				           <Col md={10}>
				           		<div className="chat-details">
				           			<p>User name</p>
				           			<div className="user-tags">
				           				<span>Abilify</span>
				           				<span>Haldol</span>
				           				<span>Effexor XR</span>
				           			</div>
				           		</div>				           	
				           </Col>
				           <Col md={1}>
				           		<div className="chat-day text-center">
				           			<p>Today</p>
				           			<span className="blue-round">3</span>
				           		</div>
				           	</Col>
				        </Row>
				        <hr />
			      	</div>

			  </Container> 
			</section>
		</Fragment>
	);
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);