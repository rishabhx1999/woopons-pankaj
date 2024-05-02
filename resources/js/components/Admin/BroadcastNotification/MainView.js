import React, { Fragment,useState,useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";
import { options as selectOptions } from "../../../constants/businessType";
import { validate as FormValidate, ListErrorMessages } from '../../../constants/Validations';
import { useNavigate } from "react-router-dom";
import {
  	CREATE_PROMO_CODE,
  	CLEAR_PROMO_CODE_MESSAGES,
  	PAGE_ATTR,
  	BROADCAST_NOTIFICATION,
  	CLEAR_BROADCAST_NOTIFICATION
} from "../../../constants/actionTypes";
// import GooglePlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-google-places-autocomplete';

const mapStateToProps = (state) => ({
  	...state,
  	successBroadcastNotification: state.admin.successBroadcastNotification,
  	errorBroadcastNotification: state.admin.errorBroadcastNotification,
});

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (formData) => {
    	dispatch({ type: BROADCAST_NOTIFICATION, payload: agent.admin.broadcastNotification(formData) });
  	},
    setPageHeading: (title) => {
        dispatch({ type: PAGE_ATTR, pageheading: title });
    },
    clearNotificaton: (title) => {
        dispatch({ type: CLEAR_BROADCAST_NOTIFICATION });
    }
});

const CreatePromoCode = (props) => {

	const { setPageHeading, pageheading, onSubmit, clearNotificaton, errorBroadcastNotification, successBroadcastNotification} = props;

	const [Errors, setErrors] = useState({});
	const [ErrorMessage, setErrorMessage] = useState("");
	const [SuccessMessage, setSuccessMessage] = useState("");

	const [notificationText, setNotificationText] = useState("");
	

    const submitBtn =  (e) => {
	    e.preventDefault();
	    setErrorMessage("");
	    let checkValidate = FormValidate({
             notificationText: { value: notificationText, required: true },
        });

	    if(!checkValidate.status) {
	        setErrors(null);
	        submitHandle()
	    } else {
	        let values = ListErrorMessages(checkValidate.errors);
	        setErrors(values);
	    }
	     
	}; 

	const submitHandle =  () => {
	     // debugger;
	     const formData = new FormData();

         formData.append("notificationText", notificationText);
	     onSubmit(formData);
	}; 
	const textCounter =  (e,maxlimitText) => {

		var lengthh = e.target.value.length;
		lengthh = maxlimitText - lengthh;

		if(lengthh > 0){
            setRemText(lengthh)
		}else{
			setRemText(0)
		}
	    
	}; 

	useEffect(() =>{

		if(errorBroadcastNotification){
           setErrorMessage(errorBroadcastNotification);
           clearNotificaton();
		}

	},[errorBroadcastNotification])

	useEffect(() =>{

		if(successBroadcastNotification){
			setNotificationText("");
            setSuccessMessage(successBroadcastNotification);
            clearNotificaton();
		}

	},[successBroadcastNotification])

	let maxlimitText = 100;
	const [remText, setRemText] = useState(maxlimitText);

	return (
		<Fragment>
			<section className="profile-main-sec">
				<Container fluid>
					<Row className="justify-content-center">
						
			        	<Col lg={6}>
                              {ErrorMessage ? <Alert variant="danger">{ErrorMessage}</Alert> : <Fragment /> }
                              {SuccessMessage ? <Alert variant="success">{SuccessMessage}</Alert> : <Fragment /> }
			        		
			        		<div className="darkblue-sec mt-5 mb-5">
			        			
				        		<div className="outer-form-plan">
				        			<Form>
								      <Form.Group className="mb-3" controlId="formBasicEmail">
								        <Row>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    as="textarea" 
								        			    rows={3}
								        			    maxLength={maxlimitText}
								        			    placeholder="Notification Text"
								        			    onChange={(e) => setNotificationText(e.target.value)}
								        			    onKeyUp={(e) => textCounter(e,maxlimitText)}
								        			/>
								        			<p className="text-right chr_text">{remText} characters left.</p>
								        			{(Errors && Errors.notificationText ) ? <span className="text-danger">{Errors.notificationText} </span>: '' }
								        		</div>
								        	</Col>

								        	
								        	<Col lg={12} className="mt-4">
								        		<div className="right-profile-btn text-right">
							        				<Button className="orange-btn custom-btn w-100" onClick={submitBtn}>Send</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePromoCode);