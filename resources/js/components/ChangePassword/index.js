import React, { useEffect, useState, Fragment } from "react";
import { Badge } from 'react-bootstrap';
import { Container, Row, Col, Image, Button, Modal, Alert } from 'react-bootstrap';
import agent from "../../agent";
import { AiOutlineEye, AiOutlineEyeInvisible   } from 'react-icons/ai';
import ListErrors from "../ListErrors";
import { connect } from "react-redux";
import './changepassword.scss';
import logo from "../../assets/images/logo.png";
import nestle from "../../assets/images/nestle.png";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

import {
  	UPDATE_FIELD_AUTH,
  	RESETPASSWORD,
  	LOGIN_PAGE_UNLOADED,
  	EMPTY_CHANGE_PASS_VALUE,
} from "../../constants/actionTypes";

// import {ReactComponent as Logo} from "../../assets/logo.svg";

const mapStateToProps = (state) => ({
  	...state.auth,
  	currentUser: state.common.currentUser,
  	ResetError: state.common.ResetError,
  	ResetSuccess: state.common.ResetSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  	onSubmit: (values) => dispatch({ 
    		type: RESETPASSWORD, 
    		payload: agent.Auth.resetPassword(values) 
    	}),
  	onEmpty: () => dispatch({ type: EMPTY_CHANGE_PASS_VALUE })
});

const Login = (props) => {
	
	const { currentUser,errors, ResetSuccess, ResetError, onSubmit, inProgress, onEmpty } = props;

	const [searchParams, setSearchParams] = useSearchParams();


	const [password, setPassword] = useState('');
	const [showPassowrd, setShowPassword] = useState(false);
	const [showConfirmPassowrd, setShowConfirmPassword] = useState(false);
	const [confirmpassword, setConfirmPassword] = useState('');
	const [resetSucc, setResetSucc] = useState('');
	const [resetErr, setResetErr] = useState('');
	const [noErrorExist, setNoErrorExist] = useState(false);

	const [passwordError, setPasswordErr] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const params = useParams();
	let token = params.token
	// let userId = params.get("id")
	// console.log(token)
	// console.log(userId)
	let navigate = useNavigate();

	const handleValidation = (evnt)=>{
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
	    // for confirm password
	    if(passwordInputFieldName=== "confirmPassword" || (passwordInputFieldName==="password" && confirmpassword.length>0) ){
	            
	        if(confirmpassword!==password)
	        {
	        	setConfirmPasswordError("Password does not match");
	        }else{
	        	setConfirmPasswordError("");
	        	_rturn = true;
	        }
	        
	    }
	    setNoErrorExist(_rturn)
	}

  	const submitForm = (e) => {
  		e.preventDefault();
  		if (noErrorExist) {
  			
	    	onSubmit({ token, password });
  		}
	    
  	};  	

  	useEffect(() => {
  		if(ResetError) {
  			setResetErr(ResetError);
  		}
  		if(ResetSuccess) {
  			setResetSucc(ResetSuccess);
  			setConfirmPassword('')
		    setPassword('')
  			const timeId = setTimeout(() => {
		      // After 3 seconds set the show value to false
		      setResetSucc('')
		      onEmpty()
		      navigate('/');
		    }, 5000)

  			return () => {
		      clearTimeout(timeId)
		    }
  		}
  	}, [ResetError,ResetSuccess])


	return (
		<>
		<section className="login-page">
			<div className="container-fluid p-0">
				
				<div className="row m-0 align-items-center justify-content-center">
					<div className="col-sm-6">
						<div className="login-form">
							<h3 className="inner-pages-title text-center">Reset Password</h3>
							<ListErrors errors={errors} />
							{resetErr ? <Alert variant="danger">{resetErr}</Alert> : <Fragment /> }
							{resetSucc ? <Alert variant="success">{resetSucc}</Alert>
			    			: <Fragment /> }
							<form onSubmit={submitForm}>
				              	<fieldset>
					              
					                <fieldset className="form-group position-relative mb-4">
					                	
					                		<div className="password-eye">
						                  	<input
							                    className="form-control form-control-md"
							                    type={showPassowrd ? "text" : "password"}
							                    value={password}
							                    onChange={(e) => setPassword(e.target.value)}
							                    required
							                    onKeyUp={handleValidation} 
							                    name="password"
							                    placeholder="New Password"
						                  	/>
						                  	<span onClick={(e) => setShowPassword(!showPassowrd)}>{(showPassowrd)?<AiOutlineEye className="hide-pass" />: <AiOutlineEyeInvisible className="show-pass" />}</span>
					                	</div>
					                	<p className="text-danger">{passwordError}</p>
					                  	<span
					                    	className={`password-icon ${showPassowrd}`}
					                    	
					                  	></span>
					                </fieldset>
					                <fieldset className="form-group position-relative mb-4">
					                	
					                		<div className="password-eye">
						                  	<input
							                    className="form-control form-control-md"
							                    type={showConfirmPassowrd ? "text" : "password"}
							                    value={confirmpassword}
							                    onChange={(e) => setConfirmPassword(e.target.value)}
							                    required
							                    onKeyUp={handleValidation} 
							                    name="confirmPassword"
							                    placeholder="Confirm Password"
						                  	/>
						                  	<span onClick={(e) => setShowConfirmPassword(!showConfirmPassowrd)}>{(showConfirmPassowrd)?<AiOutlineEye className="hide-pass" />: <AiOutlineEyeInvisible className="show-pass" />}</span>
					                	</div>
					                	<p className="text-danger">{confirmPasswordError}</p>
					                  	<span
					                    	className={`password-icon ${showPassowrd}`}
					                    	
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
					</div>
				</div>
			</div>
		</section>
		

		</>

	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);