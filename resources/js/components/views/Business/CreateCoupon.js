import React, { useEffect, useState, Fragment, useMemo } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, Form, Alert } from 'react-bootstrap';
import Popup from '../../Popup';
import visa from "../../../assets/images/visa.png";
import { BiCalendar } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate, useParams, Link } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaAngleLeft } from 'react-icons/fa';

import { validate as FormValidate, ListErrorMessages } from '../../../constants/Validations';

import {
  	CLEAR_COUPON_MESSAGES,
  	CREATE_COUPON
} from "../../../constants/actionTypes";
import './style.scss';

const mapStateToProps = (state) => ({
  	...state,
  	coupondata: state.user.coupondata,
  	couponErr: state.user.couponErr,
  	couponSucc: state.user.couponSucc,
  	currentUser: state.common.currentUser,
  	subDetail: state.user.subDetail,
});

const mapDispatchToProps = (dispatch) => ({
	generateCoupon: (formData) => {
    	dispatch({ type: CREATE_COUPON, payload: agent.business.createCoupon(formData) });
  	},
  	clearMessages: () => {
        dispatch({ type: CLEAR_COUPON_MESSAGES });
    },
});


const CreateCoupon = (props) => {
	const { generateCoupon, clearMessages, couponSucc, couponErr, currentUser, coupondata, subDetail } = props;

	var voucher_codes = require('voucher-code-generator');	

	const [name, setName] = useState("");
	const [offer, setOffer] = useState("");
	const [about, setAbout] = useState("");
	const [couponCode, setCouponCode] = useState("");

	const [oneTime, setOneTime] = useState(0);
	const [unlimited, setUnlimited] = useState(0);

	const [max_limit, setMaxLimit] = useState("");

	const [checked, setChecked] = useState('');

	const [errors, setErrors] = useState({});

	const [errMsg, setErrorText] = useState("");
	const [succeMsg, setSucceMsg] = useState("");

	const [messagetext, setMessagetext] = useState("");
	const [notestext, setNotestext] = useState("");
	const [popupshow, setPopupShow] = useState(false)
	const [upgradePlan, setUpgradePlan] = useState(false)

	let navigate = useNavigate();

	const submitBtn =  (e) => {
	    e.preventDefault();
	    let checkValidate = FormValidate({
    		offer: { value: offer, required: true },
            about: { value: about, required: true },
            name: { value: name, required: true },
           	checked: { value: checked, required: true },
        });
	    

	    if(!checkValidate.status) {
	        setErrors(null);
	        submitHandle()
	    } else {
	        let values = ListErrorMessages(checkValidate.errors);
			console.log(values)
	        setErrors(values);
	    }
	     
	} 
	

	const submitHandle =  () => {
		const formData = new FormData();

		formData.append("name", name);
		formData.append("offer", offer);
		formData.append("about", about);
		formData.append("one_time", oneTime);
		formData.append("unlimited", unlimited);
		formData.append("max_limit", max_limit);
		formData.append("coupon_code", couponCode);

		generateCoupon(formData)
	};

	const handleChange = e => {
	    e.persist();
	    let _val = e.target.value;
	    setChecked(_val)
	    if (_val == 'unlimited') {
	    	setUnlimited(1)
	    } else {
	    	setOneTime(1)
	    }

	};

	useEffect(() => {       
        if(couponErr){
        	if (typeof couponErr == 'string') {
        		// if () {
        		// 	setUpgradePlan(true)
        		// }
        		setErrorText(true)
        		let _msg = '';

        		if (subDetail && subDetail.stripe_plan == 'price_1MJwegLqeRJ82vvRXHKFLzZu') {
        			console.log('subDetail')
        			setUpgradePlan(true)
        			_msg = `${couponErr} Please update your subscription plan`
        		} else if (upgradePlan) {
        			console.log('not subDetail')
        			_msg = `${couponErr} Please update your subscription plan`
        		} else {
        			// setUpgradePlan(false)
        			_msg = couponErr
        		}
        		setMessagetext(_msg)
        		setPopupShow(true)
        	} else {
        		setErrors(couponErr)
        	}

            // setTimeout(function(){
            //     clearMessages();
            //     
            // },6000);
            
            
        }else{
        	setErrorText('')
        }
        if (coupondata) {
        	setErrorText(false)
        	setMessagetext('WOO-PON SUBMITTED!')
        	setNotestext('(Please Note: It may take up to 48 hours for your WOO-PON to be approved and become active on the app - we will reach out to you if we have any questions)')
        	setPopupShow(true)
        	// setTimeout(function(){
         //        clearMessages();
         //        navigate('/business/coupons')
         //    },6000);
        }

    }, [couponSucc, couponErr, coupondata]) 

    // useEffect(()=>{
    // 	if (subDetail && subDetail.stripe_plan == 'price_1MJwegLqeRJ82vvRXHKFLzZu') {
    // 		setUpgradePlan(true)
    // 	} else {
    // 		setUpgradePlan(false)
    // 	}
    // },[subDetail,])

    useEffect(() => {

    	if (currentUser && currentUser.name) {
    		let _bsName = currentUser.name.replaceAll(/\s/g,'').toUpperCase()
    		let _cupon = voucher_codes.generate({
			    prefix: _bsName
			});

			setCouponCode(_cupon)

			if (!subDetail && currentUser.active_plan && currentUser.active_plan == 'price_1MJwegLqeRJ82vvRXHKFLzZu') {
				setUpgradePlan(true)
			}


    	} else {
    		navigate('/')
    	}

	}, []);
    
    const onSubmit = () => {
    	setPopupShow(false)
    	clearMessages();
    	if (upgradePlan) {
    		navigate('/user/myaccount')
    	} else {
    		navigate('/business/coupons')
    	}
    	
    }
    const handleCloseModal = () => setPopupShow(false)
	let modalProps = {
		popupshow,
		handleCloseModal,
		msgerror: errMsg,
		messagetext,
		notestext,
		onSubmit
	}

	return (
		<Fragment>
			<section className="profile-main-sec genrate-coupon-sec p-50">
				<Container>
			      <Row className="justify-content-center">
			      <Col md={12} >
				   		<div className="back-btn">
				   			<Link to="/business/coupons" className="backbtn btn btn-primary custom-button"><FaAngleLeft /> Back</Link>
				   		</div>
				   </Col>
			      	<Col lg={12}>
						<h3 className="inner-pages-title text-center">Create your WOO-PONS!</h3>
					</Col>
			        <Col lg={6}>
			        	{errMsg ? <Alert variant="danger">{errMsg}</Alert> : <Fragment /> }
			        	<div className="darkblue-sec">
			        		<div className="outer-form-plan">
			        			<Form> 
								    <Form.Group className="mb-3">								    	
						    				<Row>
						    					<Col lg={12} className="mt-4">
									        		<div className="outer-form">
									        			<Form.Label>Woo-pon name</Form.Label>
									        			<Form.Control 
									        			    type="text"
									        			    value={name}
									        			    onChange={(e) => setName(e.target.value)}
									        			/>
									        		</div>
									        		<span className="text-danger">{errors && errors.name ? errors.name : ''}</span>
									        	</Col>

									        	<Col lg={12} className="mt-4">
									        		<div className="outer-form">
									        			<Form.Label>Your offer</Form.Label>
									        			<Form.Control 
									        				as="textarea" 
									        				rows={3} 
									        				value={offer}
									        				placeholder="BOGO, FREE ITEM, 10-80% OFF?"
									        			    onChange={(e) => setOffer(e.target.value)}
									        			/>
									        		</div>
									        		<span className="text-danger">{errors && errors.offer ? errors.offer : ''}</span>
									        	</Col>

									        	<Col lg={12} className="mt-4">
									        		<div className="outer-form">
									        			<Form.Label>About deal</Form.Label>
									        			<Form.Control 
									        				as="textarea" 
									        				rows={3} 
									        				value={about}
									        			    onChange={(e) => setAbout(e.target.value)}
									        			/>
									        		</div>
									        		<span className="text-danger">{errors && errors.about ? errors.about : ''}</span>
									        	</Col>
									        	{(currentUser && currentUser.email.toLowerCase() == 'hello@woo-pons.com')?
										        	<Col lg={12} className="mt-4">
										        		<div className="outer-form">
										        			<Form.Label>Limit</Form.Label>
										        			<Form.Control 
										        			    type="number"
										        			    value={max_limit}
										        			    onChange={(e) => setMaxLimit(e.target.value)}
										        			/>
										        		</div>
										        		<span className="text-danger">{errors && errors.max_limit ? errors.max_limit : ''}</span>
										        	</Col>
										        :''}	

									        	<Col lg={12} className="mt-4">
									        		<div className="outer-form radio-with-text">
									        			<Form.Check 
												            type="radio"
												            label="One Time"
												            value="one_time"
													        type="radio"
													        aria-label="radio 1"
													        onChange={handleChange}
													        checked={checked === "one_time"}
												          />
												          <p>Your customers will only be allowed to use once. Once used, Woo-pon expires.</p>
									        		</div>
									        	</Col>
									        	{(max_limit == "")?
										        	<Col lg={12} className="mt-4">
										        		<div className="outer-form radio-with-text">
										        			<Form.Check 
													            type="radio"
													            label="Unlimited"
													            value="unlimited"
														        type="radio"
														        aria-label="radio 1"
														        onChange={handleChange}
														        checked={checked === "unlimited"}
													          />
													          <p>Your customer will be allowed to use this over & over, but only 1x per day.</p>
										        		</div>
										        		<span className="text-danger">{errors && errors.checked ? "The field coupon valid for is required" : ''}</span>
										        	</Col>
										        :''}	

									        	<Col lg={12} className="mt-4">
									        		<div className="outer-form coupon-border">
									        			<span>{couponCode}</span>
									        		</div>
									        	</Col>

									            <Col lg={12} className="mt-4">
									        		<div className="right-profile-btn text-right">
								        				<Button 
								        					onClick={submitBtn}
								        					className="orange-btn custom-btn w-100"
								        					>
								        					Submit
								        				</Button>
								        			</div>
								        			<p className="review-txt mt-3">Your Woo-Pon may be in review for up to 48 hours. We’ll notify on your registered email Id.</p>
									        	</Col>
									        </Row>
								    </Form.Group>
								</Form>
			        		</div>
			        	</div>
					</Col>
					
			    </Row>
			    <Popup {...modalProps}/>
			</Container>
		</section>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCoupon);