import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";

import {
  	CUSTOMER_OTP_VERIFY,
  	CREATE_CUSTOMER_CLEAR_MESSAGES,
  	CUSTOMER_OTP_RESEND,
  	FRONTEND_LOGIN
} from "../../../constants/actionTypes";

import style from "./style.scss";

import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate, useParams } from "react-router-dom";

const mapStateToProps = (state) => ({
  	...state,
  	customerUser: state.common.customerUser,
  	currentUser: state.common.currentUser,
  	successMsg: state.common.successMsg,
  	errorMsg: state.common.errorMsg,
});

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (formData) => {
    	dispatch({ type: CUSTOMER_OTP_VERIFY, payload: agent.common.verifyOTP(formData) });
  	},
  	onSubmitResend: (formData) => {
    	dispatch({ type: CUSTOMER_OTP_RESEND, payload: agent.common.resendOTP(formData) });
  	},
  	loggedUser: (userData) => {
    	dispatch({ type: FRONTEND_LOGIN, payload: userData });
  	},
    clearCustomerMessages: () => {
        dispatch({ type: CREATE_CUSTOMER_CLEAR_MESSAGES });
    }
});

const EnterOtp = (props) => {
	

	const { currentUser,customerUser,onSubmit,onSubmitResend,successMsg,errorMsg,clearCustomerMessages, loggedUser } = props;

	const [OTP, setOTP] = useState("");

	const [err, setErr] = useState(null);

	let navigate = useNavigate();
	let params = useParams();

	const submitBtn =  (e) => {
		e.preventDefault();
		if (!OTP) {
			setErr("Please Enter All digits.")
		}
		// debugger;
		const formData = new FormData();
		const cId = localStorage.getItem('customerUser');
		formData.append("user_id", parseInt(cId));
		formData.append("otp", OTP);
		onSubmit(formData);
	}; 
	const submitResendBtn =  () => {
		// e.preventDefault();
		// debugger;
		const formData = new FormData();
		const cId = localStorage.getItem('customerUser');
		formData.append("user_id", parseInt(cId));
		// formData.append("user_id", 2);
		onSubmitResend(formData);
	}; 

	

    useEffect(() => {       
        if(successMsg){
        	// debugger

            setTimeout(function(){
                clearCustomerMessages();

            },2000);
            
        }
        if (currentUser && currentUser.token && currentUser.email_verified) {
        	loggedUser({'data':currentUser})
        	navigate('/payment/'+params.plan);
        }
    }, [successMsg,currentUser]) 

    useEffect(() => {       
        if(errorMsg){
        	setErr(errorMsg)
            setTimeout(function(){
                clearCustomerMessages();
            },2000);
            
        }
    }, [errorMsg]) 

    useEffect(()=>{
    	clearCustomerMessages()
    },[])

    const renderTime = () => React.Fragment;

	return (
		<Fragment>
			<div className="dashboard-page inner-page p-50">
				<section className="profile-main-sec">
					<Container fluid>
						<Row className="justify-content-center">
							<Col lg={12}>
								<h3 className="inner-pages-title text-center">Enter OTP</h3>
								<p className="inner-pages-para text-center">we have sent you a four digit code on your registered email id.</p>
							</Col>
							
				        	<Col lg={6}>
				        	      {successMsg ? <Alert variant="success">{successMsg}</Alert> : <Fragment /> }
	                              {err ? <Alert variant="danger">{err}</Alert> : <Fragment /> }
				        		
				        		<div className="outer-form-plan">
				        			<Form>
								      <Form.Group className="mb-3">
								      	
								        <Row>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<div className="otp-input d-flex justify-content-center">
								        				<OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} />
								        			</div>
								        		</div>
								        		<div className="otp-resend-div d-flex justify-content-center">
								        			<ResendOTP maxTime={1} renderTime={renderTime} onResendClick={submitResendBtn} />
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="right-profile-btn text-right">
							        				<Button className="orange-btn custom-btn w-100" onClick={submitBtn}>Next</Button>
							        			</div>
								        	</Col>
								        	
								        </Row>
								      </Form.Group>
								    </Form>
				        		</div>
				        	</Col>
				      	</Row>
				    </Container>
				</section>
			</div>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterOtp);