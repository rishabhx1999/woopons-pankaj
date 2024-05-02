import React, { Fragment,useState,useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";
import { options } from "../../../constants/businessType";

import {
  	CREATE_BUSINESS,
  	CLEAR_BUSINESS_MESSAGES,
  	PAGE_ATTR
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	successAddBusiness: state.admin.successAddBusiness,
  	errorAddBusiness: state.admin.errorAddBusiness,
});

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (formData) => {
    	dispatch({ type: CREATE_BUSINESS, payload: agent.admin.createBusiness(formData) });
  	},
    clearBusinessMessages: () => {
        dispatch({ type: CLEAR_BUSINESS_MESSAGES });
    },
    setPageHeading: (title) => {
        dispatch({ type: PAGE_ATTR, pageheading: title });
    }
});

const CreateBusiness = (props) => {
	

	const {currentAdminUser,currentUser,onSubmit,successAddBusiness,errorAddBusiness,clearBusinessMessages} = props;

	const {setPageHeading,pageheading} = props;

	useEffect(() => {  		
		if(pageheading){
            setPageHeading(pageheading);
		}else{
			setPageHeading("Filialen");
		}
  		
  	}, [pageheading])

  	const [businessError, setcBusinessError] = useState("");

	const [fName, setFName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const [password, setPassword] = useState("");
	const [businesPhone, setBusinesPhone] = useState("");
	const [address, setAddress] = useState("");
	const [type, setType] = useState("");
	const [about, setAbout] = useState("");

	const [Errors, setErrors] = useState({});

	const [imageValidError, setImageValidError] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [show_image, setShowImage] = useState(profile);

	const submitBtn =  (e) => {
	     e.preventDefault();

	     // debugger;
	     const formData = new FormData();
	     if (profileImage) {
	     	formData.append("profile", profileImage);
	     }
         // formData.append("id", currentUser.id);
         formData.append("name", fName);
         formData.append("phone", phone);
         formData.append("email", email);

         formData.append("password", password);
         formData.append("address", address);
         formData.append("business_phone", businesPhone);
         formData.append("business_type", type);
         formData.append("description", about);
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
	
	
	// useEffect(() => {
	// 	if (currentAdminUser) {
	// 		setShowImage(currentAdminUser.avatar) 
	//     	setFName(currentAdminUser.name)
	//     	setEmail(currentAdminUser.email)
	//     	setPhone(currentAdminUser.phone)
	// 	} else if (currentUser) {
 //           setFName(currentUser.name);
 //           setEmail(currentUser.email);
 //           if(currentUser.phone){
 //           	  setPhone(currentUser.phone);
 //           }else{
 //           	  setPhone("");
 //           }
 //           
 //           if(currentUser.avatar){
 //           	  setShowImage(currentUser.avatar);
 //           }else{
 //              setShowImage(profile);
 //           }
 //           
 //        }
 //    }, [currentUser,currentAdminUser]);

    useEffect(() => {       
        if(successAddBusiness){
        	// debugger
            setTimeout(function(){
                clearBusinessMessages();
            },3000);
            
        }
    }, [successAddBusiness]) 

    useEffect(() => {       
        if(errorAddBusiness){
        	if (typeof errorAddBusiness === 'string') {
        		setcBusinessError(errorAddBusiness)
        	} else {
        		setErrors(errorAddBusiness)
        	}
        	

            // setTimeout(function(){
            //     clearBusinessMessages();
            //     setErrors()
            // },6000);
            
        }
        if (imageValidError) {
        	setTimeout(function(){
                setImageValidError("");
            },6000);
        }
    }, [errorAddBusiness,imageValidError]) 

	return (
		<Fragment>
			<section className="profile-main-sec">
				<Container fluid>
					<Row className="justify-content-center">
			        	<Col lg={6}>
			        	      {successAddBusiness ? <Alert variant="success">{successAddBusiness}</Alert> : <Fragment /> }
                              {errorAddBusiness ? <Alert variant="danger">{errorAddBusiness}</Alert> : <Fragment /> }
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
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={fName}
								        			    placeholder="Company name"
								        			    onChange={(e) => setFName(e.target.value)}
								        			/>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={address}
								        			    placeholder="Address"
								        			    onChange={(e) => setAddress(e.target.value)}
								        			/>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={email}
								        			    placeholder="Email"
								        			    onChange={(e) => setEmail(e.target.value)}
								        			/>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={businesPhone}
								        			    placeholder="Business Phone"
								        			    onChange={(e) => setBusinesPhone(e.target.value)}
								        			/>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={phone}
								        			    placeholder="Cell phone"
								        			    onChange={(e) => setPhone(e.target.value)}
								        			/>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={password}
								        			    placeholder="Password"
								        			    onChange={(e) => setPassword(e.target.value)}
								        			/>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control
											          as="select"
											          value={type}
											          onChange={e => {
											            console.log("e.target.value", e.target.value);
											            setType(e.target.value);
											          }}
											        >
											         <option disabled value="" >Business Type</option>
											          {
											         	options.map((option,index)=>(
											         		<option key={index} value={option.value}>{option.label}</option>
											         		))

											         }
											        </Form.Control>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			
								        			<Form.Control 
								        				as="textarea" 
								        				rows={3} 
								        				value={about}
								        			    placeholder="About business"
								        			    onChange={(e) => setAbout(e.target.value)}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness);