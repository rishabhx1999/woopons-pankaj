import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form, Alert, Modal } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown, FaAngleLeft } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";
import eventimg1 from "../../../assets/images/eventimg1.png";
import './style.scss';
import { options as selectOptions } from "../../../constants/businessType";

import { Link, useParams, useNavigate } from "react-router-dom";
import {getBackgroundColor,createImageFromInitials} from '../../Utils'

import {
  	GET_BUSINESS_ADMIN,
  	UPDATE_BUSINESS_ADMIN,
  	CLEAR_ADMIN_MESSAGE
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	businessdata: state.admin.businessdata,
  	errorMsg: state.admin.errorMsg,
  	currentUser: state.common.currentUser,
  	businessASucc: state.admin.businessASucc,

});

const mapDispatchToProps = (dispatch) => ({
	onLoadBusiness: (busid) => {
    	dispatch({ type: GET_BUSINESS_ADMIN, payload: agent.admin.getBusiness(busid) });
  	},
  	updateBusiness: (formData) => {
    	dispatch({ type: UPDATE_BUSINESS_ADMIN, payload: agent.admin.updateBusiness(formData) });
  	},
  	clearMesages: () => {
  		dispatch({ type: CLEAR_ADMIN_MESSAGE })
  	}
});

const ViewBusiness = (props) => {

	const { currentUser, businessdata, onLoadBusiness, errorMsg, updateBusiness, businessASucc, clearMesages } = props;

	const [businessName , setBusinessName] = useState('')
	const [businessAdd , setBusinessAdd] = useState('')
	const [businessEmail , setBusinessEmail] = useState('')
	const [businessPhone , setBusinessPhone] = useState('')
	const [businessAbout , setBusinessAbout] = useState('')

	const [cellPhone , setCellPhone] = useState('')
	const [businessType , setBusinessType] = useState('')

	const [howLongInBusiness , setHowLongInBusiness] = useState('')
	const [potentialCustomersToKnow , setPotentialCustomersToKnow] = useState('')
	const [promoteImages , setpromoteImages] = useState('Yes')

	const [businessStatus, setBusinessStatus] = useState('')

	const [cmpnyImage , setCmpnyImage] = useState('/images/user-main.png')
	const [succeMsg , setSuccessMsg] = useState(false)
	const [evntName , setEvntName] = useState('')
	const [reason , setReason] = useState('')
	const [reasonErr , setReasonErr] = useState('')

	let params = useParams();
	let navigate = useNavigate();

	const [showModal, setShowModal] = useState(false);

  	const handleModalClose = () => setShowModal(false);

	const handlesubmit =  () => {
			const formData = new FormData();

			formData.append("id", businessdata.user_id);
			formData.append("status", businessStatus);

			if (!businessStatus) {
				if (reason) {
					setReasonErr('')
					formData.append("reject_reason", reason);
					submitUpdateBusiness(formData)
				} else {
					setReasonErr('Please give reason to reject this business.')
				}
			} else {
				submitUpdateBusiness(formData)
			}
		
	};

	const submitUpdateBusiness =  (data) => {
		updateBusiness(data)
		setTimeout(function() {
			setReason('')
			navigate('/admin/dashboard')
		}, 5000);

	};

	const submitAccept =  () => {
		setBusinessStatus(1)
		handlesubmit()
		// setEvntName('accept')
		// setShowModal(true)

	};

	const submitReject =  () => {
		setBusinessStatus(0)
		setEvntName('reject')
		setShowModal(true)
	};

	useEffect(() => {

		if (params) {
			onLoadBusiness(params.id)
		}

	}, []);

	useEffect(() => {

    	if (businessdata) {

			setBusinessName(businessdata.name)
			setBusinessAdd(businessdata.address)
			setBusinessEmail(businessdata.email)
			setBusinessPhone(businessdata.business_phone)
			setBusinessAbout(businessdata.description)

			setCellPhone(businessdata.phone)
			setBusinessType(businessdata.business_type)

			setHowLongInBusiness(businessdata.how_long_in_business)
			setPotentialCustomersToKnow(businessdata.potential_customers_to_know)
			setpromoteImages((businessdata.promote_images) ? 'Yes' : 'No')

			// setCouponRepetition(coupondata.repetition)
			if (businessdata.avatar) {
				setCmpnyImage(businessdata.avatar) 
			} else {
				setCmpnyImage(createImageFromInitials(500, businessdata.name, getBackgroundColor()))
			}
			   		
    	}

	}, [businessdata]);


	return (
		<Fragment>
			<section className="dashboard-section coupon-detail-sec">
				<Container fluid>  
			      	<div className="shadow-box">
			      		<Row className="mb-5">
				           <Col md={12}>
				           		<p className="user-title"> <Link to="/admin/dashboard" className="backbtn"><FaAngleLeft /> {businessName}</Link></p>
				           	</Col>
				        </Row>
				        {succeMsg ? <Alert variant="success">Business Updated Successfully</Alert> : <Fragment /> }
				        <Row className="">
				           <Col md={4}>
				           		<div className="left-img-coupon">
				           			<Image src={cmpnyImage} />
				           		</div>
				           	</Col>
				           	<Col md={6}>
				           		<div className="right-info-coupon">
				           			<div className="coupens-outer">
			           					<h4>Brand Name :</h4>
			           					<p className="right-tags">{businessName}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<h4>Address :</h4>
			           					<p className="right-tags">{businessAdd}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<h4>Email :</h4>
			           					<p className="right-tags">{businessEmail}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<h4>Business Type :</h4>
			           					{
				           					selectOptions.map((option,index)=>{
				           						if (option.value == businessType) {
				           							return (<p className="right-tags">{option.label}</p>)
				           						}
							         		})
						         		}
			           				</div>
			           				<div className="coupens-outer">
			           					<h4>Business Number :</h4>
			           					<p className="right-tags">{businessPhone}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<h4>Phone Number :</h4>
			           					<p className="right-tags">{cellPhone}</p>
			           				</div>
			           				<div className="coupens-outer">
					           			<h4>About Business :</h4>
					           			<p className="right-tags">{businessAbout}</p>
					           		</div>
					           		<div className="coupens-outer">
					           			<h4>How long have you been in business :</h4>
					           			<p className="right-tags">{howLongInBusiness}</p>
					           		</div>
					           		<div className="coupens-outer">
					           			<h4>What would you like your potential customers to know? :</h4>
					           			<p className="right-tags">{potentialCustomersToKnow}</p>
					           		</div>
					           		<div className="coupens-outer">
					           			<h4>Can we use some of your social media images to promote? :</h4>
					           			<p className="right-tags">{promoteImages}</p>
					           		</div>
				           		</div>
				           	</Col>
				        </Row>
				        <Row className="mt-5">
				           <Col md={12}>
				           		
				           		<div className="accept-reject-btns mt-5 d-flex justify-content-center">
				           			<Button onClick={submitAccept} className="custom-button btn btn-md yellow-btn">Accept</Button>
							        <Button onClick={submitReject} className="custom-button btn btn-md grey-btn">Reject</Button>
				           		</div>
				           	</Col>
				        </Row>
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
			                  	onClick={handlesubmit}
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewBusiness);