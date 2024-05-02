import React, { Fragment,useState,useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";

import {
  	ADMIN_PROFILE_UPDATE,
  	ADMIN_CLEAR_MESSAGES
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	currentUser: state.common.currentUser,
  	currentAdminUser: state.admin.currentAdminUser,
  	successMsg: state.admin.successMsg,
  	errorMsg: state.admin.errorMsg,
});

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (formData) => {
    	dispatch({ type: ADMIN_PROFILE_UPDATE, payload: agent.admin.updateProfile(formData) });
  	},
    clearAdminMessages: () => {
        dispatch({ type: ADMIN_CLEAR_MESSAGES });
    }
});

const MainView = (props) => {
	

	const {currentAdminUser,currentUser,onSubmit,successMsg,errorMsg,clearAdminMessages} = props;

	const [fName, setFName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [imageValidError, setImageValidError] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [show_image, setShowImage] = useState(profile);



	const submitBtn =  (e) => {
	     e.preventDefault();

	     // debugger;
	     const formData = new FormData();
	     if (profileImage) {
	     	formData.append("avatar", profileImage);
	     }
         formData.append("id", currentUser.id);
         formData.append("name", fName);
         formData.append("phone", phone);
	     onSubmit(formData);
	}; 

	const handleChangeProfile = (event) => {
    	const prflImage = event.target.files[0];
    	if (!prflImage.name.match(/\.(jpg|jpeg|png)$/)) {
    		setImageValidError("Only .png, .jpg and .jpeg format allowed!")
    		return false;
    	} else {
    		setProfileImage(prflImage);
      		setShowImage(URL.createObjectURL(prflImage));
    	}
    }
	
	
	useEffect(() => {
		if (currentAdminUser) {
			setShowImage(currentAdminUser.avatar) 
	    	setFName(currentAdminUser.name)
	    	setEmail(currentAdminUser.email)
	    	setPhone(currentAdminUser.phone)
		} else if (currentUser) {
           setFName(currentUser.name);
           setEmail(currentUser.email);
           if(currentUser.phone){
           	  setPhone(currentUser.phone);
           }else{
           	  setPhone("");
           }
           
           if(currentUser.avatar){
           	  setShowImage(currentUser.avatar);
           }else{
              setShowImage(profile);
           }
           
        }
    }, [currentUser,currentAdminUser]);

    useEffect(() => {       
        if(successMsg){
        	// debugger
            setTimeout(function(){
                clearAdminMessages();
            },3000);
            
        }
    }, [successMsg]) 

    useEffect(() => {       
        if(errorMsg){
        	

            setTimeout(function(){
                clearAdminMessages();
            },6000);
            
        }
        if (imageValidError) {
        	setTimeout(function(){
                setImageValidError("");
            },6000);
        }
    }, [errorMsg,imageValidError]) 

	return (
		<Fragment>
			<section className="profile-main-sec">
				<Container fluid>
					<Row className="justify-content-center">
			        	<Col lg={6}>
			        	      {successMsg ? <Alert variant="success">{successMsg}</Alert> : <Fragment /> }
                              {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : <Fragment /> }
			        		<div className="profile-edit-outer d-flex align-items-center justify-content-center">
			        			<div className="profile-edit">
			        				<div className="profile-circle">
				        				<Image src={show_image} className="profile-img" /> 
									        <Form.Control 
									            type="file"
									            onChange={handleChangeProfile}
									         />
									        <FiEdit />

								    </div>
			        				
			        			</div>
			        			
			        		</div>
			        		<span className="text-danger">{imageValidError}</span>
			        		<div className="darkblue-sec mt-5 mb-5">
				        		<div className="outer-form-plan">
				        			<Form>
								      <Form.Group className="mb-3" controlId="formBasicEmail">
								        <Row>
								        	<Col lg={12}>
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={fName}
								        			    placeholder="Full Name"
								        			    onChange={(e) => setFName(e.target.value)}
								        			/>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={email}
								        			    placeholder="Email"
								        			    readOnly
								        			/>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={phone}
								        			    placeholder="Phone Number"
								        			    onChange={(e) => setPhone(e.target.value)}
								        			/>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="right-profile-btn text-right">
							        				<Button className="orange-btn custom-btn w-100" onClick={submitBtn}>Save</Button>
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