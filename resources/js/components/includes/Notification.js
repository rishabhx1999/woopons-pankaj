import React, { useState, Fragment, useEffect, createRef } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { BsBellFill } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import agent from "../../agent";

import { TOP_HEADER, RIGHT_HEADER } from './../../constants/header.js';
import { READ_NOTIFICATION } from "../../constants/actionTypes";
import logo from '../../assets/images/logo.svg';
import ProfileViewerAdmin from './includes/ProfileViewerAdmin';

import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
	return {
		...state,
		currentUser: state.common.currentUser,
		pageheading: state.common.pageheading,
	}
};

const mapDispatchToProps = (dispatch) => ({
});

const Notification = (props) => {
	const { currentUser, showNoti,setShowNoti} = props;

	const setHideNotiFunc = (notification_id) => {
        setShowNoti("");
	}

	return (
		<Fragment>
	      	<div className={"notification-sec "+showNoti}>
				<div className="title-with-cross d-flex justify-content-between align-items-center">
					<h3 className="">Notifications</h3>
					<AiOutlineCloseCircle onClick={(e)=>setHideNotiFunc(e)} />
				</div>
					<div className="notification-inner">
				        <Link className="light-blue-active" >
				        	<div className="notification-popup">
					        	<div className="notification-popup-inner">
					        		<BsBellFill />
					        	</div>
					        	<div className="notification-popup-content">
					        		<p>Lorem Ipsum dolor sit amet</p>
					        		<p>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</p>
					        	</div>
				        	</div>
						</Link>  
						<Link className="light-blue-active" >
				        	<div className="notification-popup">
					        	<div className="notification-popup-inner">
					        		<BsBellFill />
					        	</div>
					        	<div className="notification-popup-content">
					        		<p>Lorem Ipsum dolor sit amet</p>
					        		<p>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</p>
					        	</div>
				        	</div>
						</Link> 
						<Link className="light-blue-active" >
				        	<div className="notification-popup">
					        	<div className="notification-popup-inner">
					        		<BsBellFill />
					        	</div>
					        	<div className="notification-popup-content">
					        		<p>Lorem Ipsum dolor sit amet</p>
					        		<p>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</p>
					        	</div>
				        	</div>
						</Link> 
						<Link className="light-blue-inactive" >
				        	<div className="notification-popup">
					        	<div className="notification-popup-inner">
					        		<BsBellFill />
					        	</div>
					        	<div className="notification-popup-content">
					        		<p>Lorem Ipsum dolor sit amet</p>
					        		<p>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</p>
					        	</div>
				        	</div>
						</Link>  
						<Link className="light-blue-inactive" >
				        	<div className="notification-popup">
					        	<div className="notification-popup-inner">
					        		<BsBellFill />
					        	</div>
					        	<div className="notification-popup-content">
					        		<p>Lorem Ipsum dolor sit amet</p>
					        		<p>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</p>
					        	</div>
				        	</div>
						</Link> 
						<Link className="light-blue-inactive" >
				        	<div className="notification-popup">
					        	<div className="notification-popup-inner">
					        		<BsBellFill />
					        	</div>
					        	<div className="notification-popup-content">
					        		<p>Lorem Ipsum dolor sit amet</p>
					        		<p>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</p>
					        	</div>
				        	</div>
						</Link> 
						<Link className="light-blue-inactive" >
				        	<div className="notification-popup">
					        	<div className="notification-popup-inner">
					        		<BsBellFill />
					        	</div>
					        	<div className="notification-popup-content">
					        		<p>Lorem Ipsum dolor sit amet</p>
					        		<p>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</p>
					        	</div>
				        	</div>
						</Link> 
						<Link className="light-blue-inactive" >
				        	<div className="notification-popup">
					        	<div className="notification-popup-inner">
					        		<BsBellFill />
					        	</div>
					        	<div className="notification-popup-content">
					        		<p>Lorem Ipsum dolor sit amet</p>
					        		<p>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</p>
					        	</div>
				        	</div>
						</Link>        
					</div>	
				
			</div>
		</Fragment>	
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);