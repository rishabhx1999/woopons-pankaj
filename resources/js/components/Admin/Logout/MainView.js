import React, { Fragment,useState,useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert, Modal  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible   } from 'react-icons/ai';

import {
  	ADMIN_CHANGE_PASS,
  	ADMIN_CLEAR_CHANGE_PASS_MESSAGES
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
});

const mapDispatchToProps = (dispatch) => ({
});

const MainView = (props) => {
	

	const {showLogout, handleLogoutClose, inProgress, changePassError,submitLogout } = props;


	return (
		<Fragment>
			<Modal className="modal-custom logout-modal" show={showLogout} onHide={handleLogoutClose}>
	        <Modal.Header closeButton>
	        </Modal.Header>
	        <Modal.Body>
	        	<div className="popup-content">
	        		<h2 className="text-center skyblue-text">Are you sure you want to log out?</h2>
	        		
		            <div className="btn-grup d-flex justify-content-between mt-5">
		            <button
	                  	className="login-button btn btn-md btn-primary custom-button"
	                  	type="button"
	                  	onClick={submitLogout}
	                >Log Out</button>

	                <button
	                	className="logout-btn-no login-button btn btn-md custom-button"
	                  	type="button"
	                  	onClick={handleLogoutClose}
	                >No</button>
		            </div>
	        	</div>
	        </Modal.Body>
	        
	      </Modal>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);