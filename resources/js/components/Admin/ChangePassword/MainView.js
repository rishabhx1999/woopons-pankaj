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
  	currentUser: state.common.currentUser,
  	changePassSuccess: state.admin.changePassSuccess,
  	changePassError: state.admin.changePassError,
});

const mapDispatchToProps = (dispatch) => ({
	onSubmitChangePass: (formData) => {
    	dispatch({ type: ADMIN_CHANGE_PASS, payload: agent.admin.changePassword(formData) });
  	},
    clearAdminMessages: () => {
        dispatch({ type: ADMIN_CLEAR_CHANGE_PASS_MESSAGES });
    }
});

const MainView = (props) => {
	

	const {currentUser,onSubmitChangePass , show, handleClose, inProgress, changePassError, changePassSuccess, clearAdminMessages } = props;

	const [resetErr, setResetErr] = useState('');
	const [resetSucc, setResetSucc] = useState('');

	const [forgotEmail, setForgotEmail] = useState('');

	const [oldpassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');

	const [showPassowrd, setShowPassword] = useState(false);
	const [showOldPassowrd, setShowOldPassword] = useState(false);
	const [showConfPassowrd, setShowConfPassword] = useState(false);
	
	const [noErrorExist, setNoErrorExist] = useState(false);

	const [oldPasswordError, setOldPasswordError] = useState("");
	const [passwordError, setPasswordErr] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const submitForgotForm = (e) => {
	    e.preventDefault();
	    const formData = new FormData();

		formData.append("current_password", oldpassword);
		formData.append("new_password", password);

		onSubmitChangePass(formData)
  	}; 

  	const handleValidation = (evnt) =>{
	    const passwordInputValue = evnt.target.value.trim();
	    const passwordInputFieldName = evnt.target.name;
	        //for password 
	    let _rturn =false;
		if(passwordInputFieldName==='password'){
		    const uppercaseRegExp   = /(?=.*?[A-Z])/;
		    const lowercaseRegExp   = /(?=.*?[a-z])/;
		    const digitsRegExp      = /(?=.*?[0-9])/;
		    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
		    const minLengthRegExp   = /.{8,}/;
		    const passwordLength =      passwordInputValue.length;
		    const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
		    const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
		    const digitsPassword =      digitsRegExp.test(passwordInputValue);
		    const specialCharPassword = specialCharRegExp.test(passwordInputValue);
		    const minLengthPassword =   minLengthRegExp.test(passwordInputValue);
		    let errMsg ="";
		    
		    if(passwordLength===0){
		            errMsg="Password is empty";
		    }else if(!uppercasePassword){
		            errMsg="At least one Uppercase";
		    }else if(!lowercasePassword){
		            errMsg="At least one Lowercase";
		    }else if(!digitsPassword){
		            errMsg="At least one digit";
		    }else if(!specialCharPassword){
		            errMsg="At least one Special Characters";
		    }else if(!minLengthPassword){
		            errMsg="At least minumum 8 characters";
		    }else{
		        errMsg="";
		        _rturn = true;
		    }
		    setPasswordErr(errMsg);
	    }

	    if(passwordInputFieldName==='oldpassword'){
		    const uppercaseRegExp   = /(?=.*?[A-Z])/;
		    const lowercaseRegExp   = /(?=.*?[a-z])/;
		    const digitsRegExp      = /(?=.*?[0-9])/;
		    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
		    const minLengthRegExp   = /.{8,}/;
		    const passwordLength =      passwordInputValue.length;
		    const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
		    const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
		    const digitsPassword =      digitsRegExp.test(passwordInputValue);
		    const specialCharPassword = specialCharRegExp.test(passwordInputValue);
		    const minLengthPassword =   minLengthRegExp.test(passwordInputValue);
		    let errMsg ="";
		    
		    if(passwordLength===0){
		            errMsg="Password is empty";
		    }else if(!uppercasePassword){
		            errMsg="At least one Uppercase";
		    }else if(!lowercasePassword){
		            errMsg="At least one Lowercase";
		    }else if(!digitsPassword){
		            errMsg="At least one digit";
		    }else if(!specialCharPassword){
		            errMsg="At least one Special Characters";
		    }else if(!minLengthPassword){
		            errMsg="At least minumum 8 characters";
		    }else{
		        errMsg="";
		        _rturn = true;
		    }
		    setOldPasswordError(errMsg);
	    }
	    // for confirm password
	    if(passwordInputFieldName=== "confirmPassword" || (passwordInputFieldName==="password" && confirmpassword.length>0) ){
	            
	        if(confirmpassword!==password)
	        {
	        	setConfirmPasswordError("Confirm password is not matched");
	        }else{
	        	setConfirmPasswordError("");
	        	_rturn = true;
	        }
	        
	    }
	    setNoErrorExist(_rturn)
	}
	useEffect(() => {
  		if(changePassSuccess) {
  			
  			setResetSucc(changePassSuccess)
  			setTimeout(function(){
                clearAdminMessages();
                handleClose()
            },6000);

  			
  		}else{
  			setResetSucc('')
  			setOldPassword('')
  			setPassword('') 
  			setConfirmPassword('')
  		}

  	}, [changePassSuccess])

  	useEffect(() => {
  		if(changePassError) {
  			if ("old" in changePassError) {
  				setOldPasswordError(changePassError.old);
  			} else {
  				setResetErr(changePassError)
  			}
  			setTimeout(function(){
                clearAdminMessages();
            },6000);
  			
  		}else{
  			setResetErr('')
  		}

  	}, [changePassError])

	return (
		<Fragment>
			<Modal className="modal-custom" show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	        </Modal.Header>
	        <Modal.Body>
	        	<div className="popup-content">
	        		<h2 className="text-center skyblue-text">Change Password</h2>
	        		
	        		{resetSucc ? <Alert variant="success">{resetSucc}</Alert>
				    : <Fragment /> }
					{resetErr ? <Alert variant="danger">{resetErr}</Alert>
				    : <Fragment /> }
	        		<form onSubmit={submitForgotForm}>
		              	<fieldset> 
		              		<fieldset className="form-group position-relative mb-3">
			                	
			                		<label>Old Password</label>
			                		<div className="password-eye">
				                  	<input
					                    className="form-control form-control-md"
					                    type={showOldPassowrd ? "text" : "password"}
					                    value={oldpassword}
					                    onChange={(e) => setOldPassword(e.target.value)}
					                    required
					                    onKeyUp={handleValidation} 
					                    name="oldpassword"
				                  	/>
				                  	<span onClick={(e) => setShowOldPassword(!showOldPassowrd)}>{(showOldPassowrd)?<AiOutlineEye className="hide-pass" />: <AiOutlineEyeInvisible className="show-pass" />}</span>
			                	</div>
			                	<p className="text-danger">{oldPasswordError}</p>
			                  	<span
			                    	className={`password-icon ${showOldPassowrd}`}
			                    	
			                  	></span>
			                </fieldset>
			                <fieldset className="form-group position-relative mb-3">
			                	
			                		<label>New Password</label>
			                		<div className="password-eye">
				                  	<input
					                    className="form-control form-control-md"
					                    type={showPassowrd ? "text" : "password"}
					                    value={password}
					                    onChange={(e) => setPassword(e.target.value)}
					                    required
					                    onKeyUp={handleValidation} 
					                    name="password"
				                  	/>
				                  	<span onClick={(e) => setShowPassword(!showPassowrd)}>{(showPassowrd)?<AiOutlineEye className="hide-pass" />: <AiOutlineEyeInvisible className="show-pass" />}</span>
			                	</div>
			                	<p className="text-danger">{passwordError}</p>
			                  	<span
			                    	className={`password-icon ${showPassowrd}`}
			                    	
			                  	></span>
			                </fieldset>

			                <fieldset className="form-group position-relative mb-3">
			                	
			                		<label>Confirm New Password</label>
			                		<div className="password-eye">
				                  	<input
					                    className="form-control form-control-md"
					                    type={showConfPassowrd ? "text" : "password"}
					                    value={confirmpassword}
					                    onChange={(e) => setConfirmPassword(e.target.value)}
					                    required
					                    onKeyUp={handleValidation} 
					                    name="confirmPassword"
				                  	/>
				                  	<span onClick={(e) => setShowConfPassword(!showConfPassowrd)}>{(showConfPassowrd)?<AiOutlineEye className="hide-pass" />: <AiOutlineEyeInvisible className="show-pass" />}</span>
			                	</div>
			                	<p className="text-danger">{confirmPasswordError}</p>
			                  	<span
			                    	className={`password-icon ${showConfPassowrd}`}
			                    	
			                  	></span>
			                </fieldset>


			                <button
			                  	className="login-button btn btn-md btn-primary custom-button w-100"
			                  	type="submit"
			                  	disabled={inProgress}
			                >
			                  	Submit
			                </button>
		              	</fieldset>
		            </form>
	        	</div>
	        </Modal.Body>
	        
	      </Modal>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);