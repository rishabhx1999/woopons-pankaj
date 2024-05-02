import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form, Modal } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";


import { Link } from "react-router-dom";
import {getBackgroundColor,createImageFromInitials} from '../../Utils'

import {
  	ADMIN_DASHBOARD_DATA,
  	UPDATE_BUSINESS_DASH_ADMIN,
  	CLEAR_ADMIN_DASH_MESSAGE
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	dashboarddata: state.admin.dashboarddata,
  	errorMsg: state.admin.errorMsg,
  	dashboardBusdata: state.admin.dashboardBusdata,

});

const mapDispatchToProps = (dispatch) => ({
	onLoadPage: () => dispatch({ 
    		type: ADMIN_DASHBOARD_DATA, 
    		payload: agent.admin.getdashboardata() 
    	}),
	updateBusiness: (formData) => {
    	dispatch({ type: UPDATE_BUSINESS_DASH_ADMIN, payload: agent.admin.updateBusiness(formData) });
  	},
});

const MainView = (props) => {

	const { currentUser, dashboarddata, onLoadPage, errorMsg, updateBusiness, dashboardBusdata } = props;

	const [coupons, setCoupons] = useState([])

	const [evntName , setEvntName] = useState('')
	const [businessStatus, setBusinessStatus] = useState(0)
	const [businessId, setBusinessId] = useState('')

	const [reason , setReason] = useState('')
	const [reasonErr , setReasonErr] = useState('')

	const [showModal, setShowModal] = useState(false);

  	const handleModalClose = () => setShowModal(false);

	const handleStatus =  (bId,bStatus) => {
		setBusinessId(bId)
		if (bStatus) {
			setBusinessStatus(1)
			handleSubmit()
			// setEvntName('accept')
			// setShowModal(true)
		} else {
			setBusinessStatus(0)
			setEvntName('reject')
			setShowModal(true)
		}
		
	};

	const handleSubmit=  () => {
		const formData = new FormData();

		formData.append("id", businessId);
		formData.append("status", businessStatus);

		if (!businessStatus) {
			if (reason) {
				setReasonErr('')
				formData.append("reject_reason", reason);
				updateBusiness(formData)

			} else {
				setReasonErr('Please give reason to reject this business.')
			}
		} else {
			updateBusiness(formData)
		}

		
	};

	useEffect(()=> {
		if (dashboardBusdata) {
			setShowModal(false)
			setReason('')
			onLoadPage()
		}
	},[dashboardBusdata])

	useEffect(()=> {
		if (dashboarddata) {
			console.log(dashboarddata)
			setCoupons(dashboarddata)
		}
	},[dashboarddata])

	useEffect(()=> {
		onLoadPage()
	},[])

	return (
		<Fragment>
			<section className="dashboard-section">
				<Container fluid>  
			      	<div className="shadow-box">
			      		<Row className="mb-5">
				           <Col md={12}>
				           		<p className="user-title"> Requests</p>
				           	</Col>
				        </Row>

				        {
				        	(coupons && coupons.length > 0)
				        	?
				        		coupons.map((coupon,index)=>(

				        			<>
					        		<Row key={index} className="align-items-center">
							           <Col md={1}>
							           		<Image style={{borderRadius: '50px'}} src={ coupon.avatar ? coupon.avatar : createImageFromInitials(200, coupon.name, getBackgroundColor())} />
							           	</Col>
							           <Col key={index} md={8}>
							           		<div className="chat-details">
							           			<Link key={index} to={`/admin/business/view/${coupon.id}`}>{coupon.name}</Link>
							           		</div>				           	
							           </Col>
							           <Col md={3}>
							           		<div className="accept-reject-btns d-flex justify-content-end">
							           			<Button onClick={()=> handleStatus(coupon.id,1)} className="custom-button btn btn-md yellow-btn">Accept</Button>
							           			<Button onClick={() => handleStatus(coupon.id,0)} className="custom-button btn btn-md grey-btn">Reject</Button>
							           		</div>
							           	</Col>
							        </Row>

							        <hr />
							       </>
						    	))
				        	:
				        	<>
				        		<Row className="">
						           <Col md={12}>
						           		<p className="text-center">No Data</p>
						           	</Col>
						        </Row>

						        <hr />
						    </>
				        }
				        

			      	</div>
			      	<Modal className="modal-custom logout-modal" show={showModal} onHide={handleModalClose}>
				        <Modal.Header closeButton>
				        </Modal.Header>
				        <Modal.Body>
				        	<div className="popup-content">
				        		<h2 className="text-center skyblue-text">Are you sure you want to {evntName} request?</h2>
				        		<Form.Control 
			        				as="textarea" 
			        				rows={8} 
			        				value={reason}
			        			    placeholder="Why Reject"
			        			    onChange={(e) => setReason(e.target.value)}
			        			/>
				        		<span className="text-danger">{reasonErr}</span>
					            <div className="btn-grup d-flex justify-content-between mt-5">
					            <button
				                  	className="login-button btn btn-md btn-primary custom-button"
				                  	type="button"
				                  	onClick={handleSubmit}
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

			  </Container> 
			</section>
		</Fragment>
	);
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);