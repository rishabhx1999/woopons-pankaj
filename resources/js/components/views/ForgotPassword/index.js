import React, { useEffect, useState, Fragment } from "react";
import { Badge } from 'react-bootstrap';
import { Container, Row, Col, Image, Button, Modal, Alert,Form } from 'react-bootstrap';
import agent from "../../../agent";
import { AiOutlineEye, AiOutlineEyeInvisible   } from 'react-icons/ai';
// import ListErrors from "../ListErrors";
import { connect } from "react-redux";
import './forgotpass.scss';
import { useNavigate } from "react-router-dom";

import {
  	RESETLINK,
  	EMPTY_RESET_VALUE
} from "../../../constants/actionTypes";

// import {ReactComponent as Logo} from "../../assets/logo.svg";

const mapStateToProps = (state) => ({
  	...state.auth,
  	currentUser: state.common.currentUser,
  	ResetLinkError: state.common.ResetLinkError,
  	ResetLinkSuccess: state.common.ResetLinkSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  	onForgotPaaswordSubmit: (values) => 
    	dispatch({ type: RESETLINK, payload: agent.Auth.resetLink(values) }),
    onEmpty: () => dispatch({ type: EMPTY_RESET_VALUE })
});

const ForgotPassword = (props) => {
	
	const { inProgress, ResetLinkError, ResetLinkSuccess, onForgotPaaswordSubmit, onEmpty } = props;

	const [resetErr, setResetErr] = useState('');
	const [resetSucc, setResetSucc] = useState('');

	const [forgotEmail, setForgotEmail] = useState('');

  	const submitForgotForm = (e) => {
	    e.preventDefault();
	    onForgotPaaswordSubmit({ email:forgotEmail });
  	};  


  	 useEffect(() => {

  	 	if(ResetLinkSuccess) {
  			setResetSucc(ResetLinkSuccess);
  			const timeId = setTimeout(() => {
		      // After 3 seconds set the show value to false
		      setResetSucc('')
		      setForgotEmail('')
		      onEmpty()
		    }, 10000)

  			return () => {
		      clearTimeout(timeId)
		    }
		    
  		} 
  		if(ResetLinkError) {
  			setResetErr(ResetLinkError);
  		}
	    
	 }, [ResetLinkSuccess,ResetLinkError]);


	return (
		<>
			<div className="dashboard-page inner-page p-50">
				<section className="profile-main-sec">
					<Container fluid>
						<Row className="justify-content-center">
							<Col lg={12}>
								<h3 className="inner-pages-title text-center">Reset Password</h3>
							</Col>
							
				        	<Col lg={6}>
				        	    {resetSucc ? <Alert variant="success">{resetSucc}</Alert>
			    				: <Fragment /> }
				        		<div className="darkblue-sec">
					        		<div className="outer-form-plan">
					        			<Form>
									      <Form.Group className="mb-3">
									      	
									        <Row>
									        	<Col lg={12} className="mt-4">
									        		<div className="outer-form">
									        			{/* <Form.Label>Full Name</Form.Label> */}
									        			<Form.Control 
									        			    type="email"
										                    value={forgotEmail}
										                    onChange={(e) => setForgotEmail(e.target.value)}
										                    onKeyPress={(e) => setResetErr('')}
										                    required
										                    placeholder="Enter Email"
									        			/>
									        		</div>
									        		<span className="text-danger">{resetErr}</span>
									        	</Col>
									        	<Col lg={12} className="mt-4">
									        		<div className="right-profile-btn text-right">
								        				<Button className="orange-btn custom-btn w-100" 
								        					disabled={inProgress}
								        					onClick={submitForgotForm}>Submit</Button>
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
			</div>

		</>

	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);