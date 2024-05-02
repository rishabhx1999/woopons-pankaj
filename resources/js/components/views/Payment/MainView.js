import React, { useEffect, useState, Fragment, useMemo } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, Form, Alert, Modal } from 'react-bootstrap';
// import Modal from '../../Popup';
import visa from "../../../assets/images/visa.png";
import { BiCalendar } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import {CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import GooglePlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-google-places-autocomplete';

import {
  	CLEAR_MESSAGES,
  	PLAN_DETAIL,
  	SUBSCRIBE_PLAN,
  	CLEAR_CODE_PROMO,
  	GET_CODE_PROMO
} from "../../../constants/actionTypes";
import Loader from "../../Loader";
import successRed from "../../../assets/images/success-red.png";
import './style.scss';

const mapStateToProps = (state) => ({
  	...state,
  	planDetail: state.plan.detail,
  	spError: state.plan.spError,
  	spSuccess: state.plan.spSuccess,
  	codeSuccess: state.plan.codeSuccess,
  	codeError: state.plan.codeError,
  	currentUser: state.common.currentUser,
  	spStatus: state.common.spStatus,
});

const useOptions = () => {
    const fontSize = "18px";
    const options = useMemo(
            () => ({
            	showIcon: true,
                style: {
                    base: {
                    	iconColor: '#F0810F',
                        fontSize,
                        color: "#000",
                        width: 360,
						height: 40,
                        letterSpacing: "0.025em",
                        fontFamily: "Gadugi",
                        borderRadius: "3px",
                        backgroundColor: "#F5F5F7",
                        "::placeholder": {
                            color: "#6c757d"
                        }
                    },
                    invalid: {
                        color: "#dc3545",
                        iconColor: '#dc3545',
                    }
                }
            }),
        [fontSize]
    );
    return options;
};

const mapDispatchToProps = (dispatch) => ({
	subscribePlan: (formData) => {
    	dispatch({ type: SUBSCRIBE_PLAN, payload: agent.Plan.subscribe(formData) });
  	},clearMessages: () => {
        dispatch({ type: CLEAR_MESSAGES });
    },
    fetchPlanDetail: (plan_slug) => {
  		dispatch({ type: PLAN_DETAIL, payload: agent.Plan.detail(plan_slug) });
  	},
  	getPromoCode: (formData) => {
  		dispatch({ type: GET_CODE_PROMO, payload: agent.customer.getPromoCode(formData) });
  	},
  	clearPromoMessages: () => {
        dispatch({ type: CLEAR_CODE_PROMO });
    }
});


const MainView = (props) => {
	const { subscribePlan, clearMessages, spSuccess, spError, planDetail, fetchPlanDetail, currentUser, getPromoCode, codeError, codeSuccess, clearPromoMessages, spStatus } = props;

	const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

	const [isLoading, setIsLoading] = useState(false);
	const [club_name, setClub] = useState('');
	const [email, setEmail] = useState('');
	const [cardNumber, setCardNo] = useState('');
	const [cardExpiry, setCardExpiry] = useState('');
	const [cardCvv, setCvv] = useState('');
	const [cardName, setCname] = useState('');
	const [errMsg, setErr] = useState('');
	const [successMsg, setSuccess] = useState('');
	const [disableSubmit, setSubmit] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [planPrice, setPlanPrice] = useState('');
	const [planType, setPlanType] = useState(false);
	const [nextUrl, setNextUrl] = useState('/customer/detail');
	const [successPopMsg, setSuccessPopMsg] = useState('Get your login details');

	const [codeName, setCodeName] = useState('');
	const [codeErr, setCodeErr] = useState('');
	const [codeSucc, setCodeSucc] = useState('');

	const [upgradePlan, setUpgradePlan] = useState(false);

	let navigate = useNavigate();

	useEffect(()=>{
		if (codeError) { 
			setCodeSucc('')
			setCodeErr(codeError) 
		}
		if (codeSuccess) { 
			setCodeErr('') 
			setCodeSucc(codeSuccess) 
		}
	},[codeSuccess,codeError])

	useEffect(() => {
  		
  		if(spSuccess) {
  				setIsLoading(false);
	  			// setSuccess("Plan subscribed successfully, please check your email.");
	  			setModalShow(true);
  			
  		}
  		if(spError) {
  			setSubmit(false);
  			setIsLoading(false);
  			setErr(spError);
  			setTimeout(function(){
                clearMessages();
            },6000);
  		}
  		// if (planDetail) {
  		// 	setIsLoading(false);
  		// 	console.log(planDetail)
  		// } else {
  		// 	setIsLoading(true);
  		// }
  		// console.log(`planDetail: ${planDetail}`)
  	}, [spError,spSuccess]);



	const handleSubmit = async (e) => {
		clearMessages();
		e.preventDefault();
		setErr("");
		const validationsuccess = checkValidation();
		if(validationsuccess){
			setIsLoading(true);
			setSubmit(true);
		    let cplan_id = document.getElementsByName("plan_id")[0].value;

		    if (!stripe || !elements) {
	          // Stripe.js has not loaded yet. Make sure to disable
	          // form submission until Stripe.js has loaded.
	          return;
	        }

	        var paymentMethod = {
			  payment_method: {
			    card: elements.getElement(CardNumberElement),
			    billing_details: {
			      name: cardName
			    }
			  }
			};
			let clientSecret = planDetail.intent.client_secret;
			// const token = await stripe.confirmCardSetup(setupIntentSecret, paymentMethod)
			//       .then(function(result) { ... });
			console.log(clientSecret)
			console.log(clientSecret)
			// console.log(`Id : ${cplan_id}`)
			if (clientSecret && cplan_id != '') {
				const token =  await stripe.confirmCardSetup(clientSecret,paymentMethod)
	        		.then(function(result) {
	        			// console.log(result)
	        			// debugger
			        	if(result.error !== undefined){
			        		setErr(result.error.message);
			        		setSubmit(false);
			        		setIsLoading(false);
			        	}
			        	if(result.setupIntent && result.setupIntent
							.payment_method !== undefined && cplan_id != ''){
			        		const stripe_token = result.setupIntent
									.payment_method;
			        		
		        			const formData = {
			        			plan: cplan_id,
			        			stripe_token: stripe_token,
			        			code_text: codeName
			        		};
			        		subscribePlan(formData);	
			        		
			        	}
				});
			} else {
				setSubmit(false);
  				setIsLoading(false);
			} 
	        	
	        
		}else{
			setSubmit(false);
			const element =  document.getElementsByClassName('errors')[0];
			element.scrollIntoView();
		}
	};

	const checkValidation = () => {
		let errors = false;
		
		if(cardName == ''){
			document.getElementsByName("cardholder_name")[0].classList.add("errors");
			errors = true;
		}
		if(errors){
			return false;
		}else{
			return true;
		}
	}

    const handleClose = () => {
    	setModalShow(false);
    }

    const handleNextNav = () => {
    	clearMessages()
    	setModalShow(false);
    	navigate(nextUrl)
    }

    const removeErrors = (e) => {
    	e.target.classList.remove('errors');
    }

    const checkPromoCode = () => {
    	if (codeName) {
    		let formdata = new FormData;
    		formdata.append('code_text',codeName)
    		getPromoCode(formdata);
    	}
    	
    }
    const params = useParams();
    useEffect(() => {
    	if (currentUser) {
    		if(params.plan !== undefined){
				fetchPlanDetail(params.plan);
			}
	  		console.log('planDetail',planDetail)
	  		console.log('currentUser',currentUser)
	  		clearMessages()
	  		setErr('')
	  		if (currentUser.roleId == 2) {

	  			setNextUrl("/")
	  			setSuccessPopMsg('Go back to home')
	  		}
	  		if (currentUser.roleId == 3 && spStatus != "Inactive") {
	  			console.log('currentUser roleID',currentUser.roleId)
	  			setNextUrl("/")
	  			setSuccessPopMsg('Go back to home')
	  			setUpgradePlan(true)
	  		}
    	}
		

  		// setModalShow(true)
	}, []);

	// useEffect(() => {
	// 	if (spStatus != "Inactive") {
	// 		console.log(spStatus)
	// 		setUpgradePlan(true)
	// 	}

	// },[spStatus])

	useEffect(() => {
  		if(planDetail && planDetail.plan) {
  			setPlanPrice(`$${planDetail.plan.price.toFixed(2)}`)
  			if (planDetail.plan && planDetail.plan.type == 'business') {
  				setPlanType(true)
  			}
  			// setModalShow(true)
  			
  		}
	}, [planDetail]);

	return (
		<Fragment>
			{isLoading && <Loader /> }
			<section className="profile-main-sec p-50">
				<Container fluid>
			      <Row className="justify-content-center">
			      	{/* Modal box code*/}
					<Modal show={modalShow} onHide={handleClose} onClose={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
						<div className="content payment-modal">
                			<h4 className="modal-title text-center">
                				<Image src={successRed} rounded></Image>
                			</h4>
		                    <div className="form-modal mt-4 mb-4">		                        
		                        <h4 className="text-center">
		                        	{upgradePlan ?
		                        		'Updated Successfully!'
		                        		: 'Welcome to WOO-PONS!'
		                        	}
		                        </h4>
		                        <div className="right-profile-btn text-center mt-4">
			        				<Button onClick={handleNextNav} className="orange-btn custom-btn w-100">{successPopMsg}
			        				</Button>
			        				{upgradePlan ?
		                        		null
		                        		: 
		                        		<>
		                        			<span className="total-txt modal-business-alert">
					                    		<IoMdInformationCircleOutline />
					                    		We’re excited that you are a part of the WOO-PON family! <br></br>You will receive an email with your login information. 
											</span>
		                        		</>
		                        	}
			                    	
			        			</div>
		                    </div>
		                </div>
				    </Modal>
					{/* Modal code end*/}
			      	<Col lg={12}>
						<h3 className="inner-pages-title text-center">Payment</h3>
					</Col>
			        <Col lg={6}>
			        	{errMsg ? <Alert variant="danger">{errMsg}</Alert> : <Fragment /> }
			        	<div className="darkblue-sec">
			        		<div className="outer-form-plan">
			        			<Form> 
								    <Form.Group className="mb-3">
								        	<input 
									    		type="hidden" 
									    		name="plan_id" 
									    		defaultValue={planDetail && planDetail.plan && planDetail.plan.id ? planDetail.plan.id : ''} 
									    	/>									    	
						    				<Row>
						    					<Col lg={12} className="mt-4">
									        		<div className="outer-form">
									        			<Form.Label>Name on card</Form.Label>
									        			<Form.Control type="text" name="cardholder_name" id="cardholder_name" onKeyUp={removeErrors} defaultValue={cardName} onChange={(e) => setCname(e.target.value)} />
									        		</div>
									        	</Col>
									            <Col lg={12} className="mt-4">
									                <div className="outer-form">
									                    <Form.Label>Card number</Form.Label>
									                    <div className="master-card-input">
									                        <CardNumberElement
									                          options={options}
									                        />
									                    </div>
									                </div>
									            </Col>
									            <Col lg={12} className="mt-4">
									                <div className="outer-form">
									                    <Form.Label>Expiration</Form.Label>
									                    <div className="master-card-input">
									                        <CardExpiryElement
									                          options={options}
									                        />
									                    </div>                    
									                </div>
									            </Col>
									            <Col lg={12} className="mt-4">
									                <div className="outer-form">
									                    <Form.Label>Security code/CVV</Form.Label>
									                    <div className="master-card-input">
									                    	<CardCvcElement
									                        	options={options}
									                    	/>
									                    </div>
									                </div>
									            </Col>
									            <Col lg={12} className="mt-4">
									        		<div className="outer-form code-outer">
									        			<Form.Label>Promo Code</Form.Label>
									        			<Form.Control type="text" name="cardholder_name" id="cardholder_name" onKeyUp={removeErrors} defaultValue={codeName}onChange={(e) => setCodeName(e.target.value)} />
									        			<span
									        				className="chk_bnft"
									        			 onClick={checkPromoCode}>apply</span>
									        			{codeErr ? 
									                    	<span className="text-danger">{codeErr}</span>
								                    	: '' }
								                    	{codeSucc ? 
								                    		<span className="text-success">{codeSucc}</span>
								                    	: '' }
									        		</div>
									        	</Col>
									            <Col lg={12} className="mt-4">
									                <div className="outer-form">
									                    <div className="price-span">
									                    	<span className="total-pr">{`Total: $0`}</span>
									                    	{planType ? 
									                    		<span className="total-txt">Your trail is absolutely free and your card will not be charged until 90 days</span>
									                    	: '' }
									                    	<span>Your monthly trial will start after your free trial has expired <br /> You may cancel at anytime.</span>
									                    </div>									                    
									                </div>
									            </Col>
									            <Col lg={12} className="mt-4">
									        		<div className="right-profile-btn text-right">
								        				<Button className="orange-btn custom-btn w-100" onClick={handleSubmit}>SUBSCRIBE NOW</Button>
								        			</div>
									        	</Col>
									        </Row>
								    </Form.Group>
								</Form>
			        		</div>
			        	</div>
					</Col>
			    </Row>
			</Container>
		</section>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);