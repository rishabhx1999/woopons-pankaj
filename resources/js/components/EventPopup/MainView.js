import React, { Fragment,useState,useEffect } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert, Modal  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineEyeInvisible   } from 'react-icons/ai';


const mapStateToProps = (state) => ({
  	...state,
});

const mapDispatchToProps = (dispatch) => ({
});

const MainView = (props) => {
	

	const {showToggle, handleModalClose, inProgress,submitAction, modalMessage,notesMessage } = props;


	return (
		<Fragment>
			<Modal className="modal-custom logout-modal" show={showToggle} onHide={handleModalClose}>
	        <Modal.Header closeButton>
	        </Modal.Header>
	        <Modal.Body>
	        	<div className="popup-content">
	        		<h2 className="text-center skyblue-text">{modalMessage}</h2>
	        		{(notesMessage && notesMessage != "")?<small className="text-center skyblue-text justify-content-center d-flex">{notesMessage}</small>:''}
	        		
		            <div className="btn-grup d-flex justify-content-between mt-5">
		            <button
	                  	className="login-button btn btn-md btn-primary custom-button"
	                  	type="button"
	                  	onClick={submitAction}
	                >Yes</button>

	                <button
	                	className="logout-btn-no login-button btn btn-md custom-button"
	                  	type="button"
	                  	onClick={handleModalClose}
	                >No</button>
		            </div>
	        	</div>
	        </Modal.Body>
	        
	      </Modal>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);