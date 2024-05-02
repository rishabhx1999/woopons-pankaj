import React, { useState, Fragment, useEffect, createRef } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { BsBellFill } from 'react-icons/bs';
import { AiTwotoneBell } from 'react-icons/ai';

import agent from "../../agent";

import { TOP_HEADER, RIGHT_HEADER } from './../../constants/header.js';
import { LOGOUT } from "../../constants/actionTypes";
import logo from '../../assets/images/logo.svg';
import ProfileViewerAdmin from './includes/ProfileViewerAdmin';
import Notification from './Notification';

const mapStateToProps = (state) => {
	return {
		...state,
		currentUser: state.common.currentUser,
		pageheading: state.common.pageheading
	}
};

const mapDispatchToProps = (dispatch) => ({
	onSignOut: () => { dispatch({ type: LOGOUT }) },
});

const Header = (props) => {
	const { currentUser, onSignOut,pageheading} = props;

	const [showNoti,setShowNoti] = useState("");
	const [notiCount,setNotiCount] = useState(8);

	const setShowNotiFunc = (e) => {
        setShowNoti("notification-sec-show");
	}
	
	let valProps = {
		currentUser,
		onSignOut
	}
	return (
      	<div className="auth-header-main">
				<Container fluid>
					<Row className="align-items-center justify-content-between">
						<Col lg={6}>
							<div className="dashboard-title">
								<h4>{pageheading}</h4>
							</div>
						</Col>
						<Col lg={6}>
							<div className="dashboard-profile-view">
								{/* <div className="notification-outer ml-auto"> */}
								{/* 	<h3 onClick={(e)=>setShowNotiFunc(e)}><AiTwotoneBell /><span className="orange-back"> {notiCount}</span></h3> */}
								{/* </div> */}
								
							</div>
						</Col>
					</Row>
				</Container>
      		<Notification showNoti={showNoti} setShowNoti={setShowNoti}/>
      	</div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);