import React, { Fragment,useState,useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";
import { useNavigate, Link } from "react-router-dom";

import { options } from "../../../constants/businessType";

import EventPopup from '../../EventPopup';

import {getBackgroundColor,createImageFromInitials} from '../../Utils'

import {
  	CREATE_CUSTOMER,
  	CREATE_CUSTOMER_CLEAR_MESSAGES,
  	GET_CUSTOMER_SUBSCRIPTION,
  	CANCEL_CUSTOMER_SUBSCRIPTION,
  	CUSTOMER_PROFILE_UPDATE,
  	SEND_FEEDBACK,
  	CLEAR_MESSAGE_FEEDBACK,
  	CUSTOMER_LOGIN_TOKEN_RESET
} from "../../../constants/actionTypes";

import { validate as FormValidate, ListErrorMessages } from '../../../constants/Validations';

import PlacesAutocomplete, {  geocodeByAddress,  getLatLng,} from 'react-places-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY");
Geocode.enableDebug();

const mapStateToProps = (state) => ({
  	...state,
  	customerUser: state.common.customerUser,
  	currentUser: state.common.currentUser,
  	successMsg: state.common.successMsg,
  	errorMsg: state.common.errorMsg,
  	subDetail: state.user.subDetail,
  	feedbackSucc: state.user.feedbackSucc,
  	redirectToAccount: state.common.redirectToAccount,
});

const mapDispatchToProps = (dispatch) => ({
  	onLoadAccount: () => {
    	dispatch({ type: GET_CUSTOMER_SUBSCRIPTION, payload: agent.customer.getMyAccount() });
  	},
  	cancelSubscrptn: (subid) => {
    	dispatch({ type: CANCEL_CUSTOMER_SUBSCRIPTION, payload: agent.customer.cancelSub(subid) });
  	},
  	profileUpdate: (formData) => {
    	dispatch({ type: CUSTOMER_PROFILE_UPDATE, payload: agent.customer.updateProfile(formData) });
  	},
  	profileBusinessUpdate: (formData) => {
    	dispatch({ type: CUSTOMER_PROFILE_UPDATE, payload: agent.business.updateProfile(formData) });
  	},
  	sendSuggestion: (formData) => {
    	dispatch({ type: SEND_FEEDBACK, payload: agent.customer.feedbackSend(formData) });
  	},
    clearCustomerMessages: () => {
        dispatch({ type: CREATE_CUSTOMER_CLEAR_MESSAGES });
    },
    clearFeedbackMessages: () => {
        dispatch({ type: CLEAR_MESSAGE_FEEDBACK });
    },
    clearAccountredirect: () => {
        dispatch({ type: CUSTOMER_LOGIN_TOKEN_RESET });
    }
});

const MainView = (props) => {

	const { currentUser,successMsg,errorMsg,clearCustomerMessages, customerUser, subDetail, onLoadAccount, cancelSubscrptn, profileUpdate, profileBusinessUpdate,sendSuggestion,feedbackSucc, clearFeedbackMessages, redirectToAccount,clearAccountredirect } = props;

	const [fName, setFName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const [businesPhone, setBusinesPhone] = useState("");
	const [address, setAddress] = useState("");
	const [type, setType] = useState("");
	const [about, setAbout] = useState("");

	const [howLong, setHowLong] = useState("");
	const [potentialCustomers, setPotentialCustomers] = useState("");

	const [currentLat, setCurrentLat] = useState('');
	const [currentLang, setCurrentLang] = useState('');
	const [selectedLat, setSelectedLat] = useState('');
	const [selectedLang, setSelectedLang] = useState('');

	const [currentLocation, setCurrentLocation] = useState(true);

	const [locationErr, setLocationErr] = useState('');

	const [imageValidError, setImageValidError] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [show_image, setShowImage] = useState(profile);

	const [errorText, setErrorText] = useState("");
	const [errors, setErrors] = useState({});

	const [editToggle, setEditToggle] = useState(true);

	const [isPlan, setIsPlan] = useState(false);
	const [planName, setPlanName] = useState('');
	const [planId, setPlanId] = useState('');
	const [planNextBill, setPlanNextBill] = useState('');
	const [planCancelAt, setPlanCancelAt] = useState('');
	const [planStatus, setPlanStatus] = useState('');
	const [statusBadge, setStatusBadge] = useState("success");

	const [feedback, setFeedback] = useState("");
	const [feedbackSuccess, setFeedbackSuccess] = useState("");

	const [isAccPending, setIsAccPending] = useState(false);
	const [showToggle, setShowToggle] = useState(false);

	useEffect(() => {       
        if(subDetail){
        	setIsPlan(true)
        	setPlanName(subDetail.plan_name)
        	setPlanId(subDetail.id)
        	if (subDetail.canceled_at) {
        		setPlanCancelAt(subDetail.canceled_at)
        		setStatusBadge('danger')
        	} else if (subDetail.next_billing) {
        		setPlanNextBill(subDetail.next_billing)
        		
        	}
        	setPlanStatus(subDetail.status)
        }
    }, [subDetail]) 

	let navigate = useNavigate();

	const submitBtn =  (e) => {
	    e.preventDefault();
	    let checkValidate = FormValidate({
             phone: { value: phone, required: true, numbers: true },
             name: { value: fName, required: true },
             address: { value: address, required: true }
        });
	    if (currentUser && currentUser.roleId == 2) {
	    	checkValidate = FormValidate({
	             phone: { value: phone, required: true, numbers: true },
	             name: { value: fName, required: true },
	             address: { value: address, required: true },
	             description: { value: about, required: true },
	             business_type: { value: type, required: true },
	             business_phone: { value: businesPhone, required: true, numbers: true },
				howLong: { value: howLong, required: true },
                potentialCustomers: { value: potentialCustomers, required: true },
	        });
	    }
	    

	    if(!checkValidate.status) {
	        setErrors(null);
	        submitHandle()
	    } else {
	        let values = ListErrorMessages(checkValidate.errors);
			console.log(values)
	        setErrors(values);
	    }

	     // debugger;
	     
	}

	useEffect(()=>{
		if (feedbackSucc) {
			setFeedbackSuccess(feedbackSucc)
			setFeedback('')
		} else {
			setFeedbackSuccess('')
		}
		setTimeout(function() {
			clearFeedbackMessages();
		}, 5000);
	},[feedbackSucc]) 

	useEffect(()=>{
		if (redirectToAccount) {
			clearAccountredirect()
		}
	},[redirectToAccount]) 

	const submitSuggetion = (e) => {
		e.preventDefault();
	    let checkValidate = FormValidate({
             feedback: { value: feedback, required: true }
        });

	    if(!checkValidate.status) {
	        setErrors(null);
	        submitFeedbackHandle()
	    } else {
	        let values = ListErrorMessages(checkValidate.errors);
			// console.log(values)
	        setErrors(values);
	    }

	}

	const submitFeedbackHandle =  () => {
	     // debugger;
	     const formData = new FormData();
         formData.append("feedback", feedback);
         sendSuggestion(formData)
	};

	const submitHandle =  () => {
	     // debugger;
	     const formData = new FormData();
	     if (profileImage) {
	     	formData.append("profile", profileImage);
	     }
         formData.append("id", currentUser.id);
         formData.append("name", fName);
         formData.append("phone", phone);
         formData.append("address", address);
		if(currentUser && currentUser.roleId == 2){
			formData.append("business_phone", businesPhone);
			formData.append("business_type", type);
			formData.append("description", about);

			if (selectedLat) {
				formData.append("latitude", selectedLat ? selectedLat : currentLat);
				formData.append("longitude", selectedLang ? selectedLang : currentLang);
			}

			formData.append("how_long", howLong);
			formData.append("potential_customers", potentialCustomers);
			profileBusinessUpdate(formData)
		} else {
	     profileUpdate(formData);
		}
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

    const handleSelect = address => {    
		geocodeByAddress(address)      
		.then(results => getLatLng(results[0]))      
		.then(({ lat, lng }) => {
				// setShowMap(true)
				setSelectedLat(lat)
				setSelectedLang(lng)
				setAddress(address)
				if (currentLat) {
					distance(currentLat,currentLang,lat,lng,'K')
				}
			  	// setMapPosition({ lat, lng })
	   			// setMarkerPosition({ lat, lng })
			  })      
		.catch(error => console.error('Error', error));  
	};

	const setAddressFunc = address => {
    	setAddress(address);
    }

    const displayLocation = (latitude,longitude) => {
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY&latlng='+latitude+','+longitude+'&sensor=true';
		fetch(url)
		.then(res => res.json())
		.then(address => setCurrentAddress(address))
	};

    const setCurrentAddress = (data) => {
		console.log(data)
		var current_address = data.results[0];
		setAddress(current_address.formatted_address)
	}

	const distance = (lat1, lon1, lat2, lon2, unit) => {
    	let _dist = null;
	    if ((lat1 == lat2) && (lon1 == lon2)) {
	        // return 0;
	        _dist = 0;
	        console.log(_dist)
	    } else {
	        var radlat1 = Math.PI * lat1/180;
	        var radlat2 = Math.PI * lat2/180;
	        var theta = lon1-lon2;
	        var radtheta = Math.PI * theta/180;
	        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	        if (dist > 1) {
	            dist = 1;
	        }
	        dist = Math.acos(dist);
	        dist = dist * 180/Math.PI;
	        dist = dist * 60 * 1.1515;
	        if (unit=="K") { dist = dist * 1.609344 }
	        if (unit=="N") { dist = dist * 0.8684 }
	        _dist = dist;
	    }
	    if (_dist <= 1) {
	    	setLocationErr('')
	    	setCurrentLocation(true)
	    	// debugger
	    } else {
	    	setCurrentLocation(false)
	    	setLocationErr('Please select location 1km radius from your current location')
	    }
	    console.log(`diatance: ${_dist}`)
	}

	var successCallback = function(position){
	  var x = position.coords.latitude;
	  var y = position.coords.longitude;
	  // console.log(`lat: ${x}`)
	  // console.log(`long: ${y}`)
	  displayLocation(x,y);
	};

	var errorCallback = function(error){
	  var errorMessage = 'Unknown error';
	  switch(error.code) {
	    case 1:
	      errorMessage = 'Permission denied';
	      break;
	    case 2:
	      errorMessage = 'Position unavailable';
	      break;
	    case 3:
	      errorMessage = 'Timeout';
	      break;
	  }
	  console.log(errorMessage);
	};

	var locOptions = {maximumAge:0, timeout:3000, enableHighAccuracy:true};



    useEffect(() => {
		if (currentUser && currentUser.roleId != 1) {
			onLoadAccount()
			console.log(currentUser)
           setFName(currentUser.name);
           setEmail(currentUser.email);
           if(currentUser.address){
           	  setAddress(currentUser.address) 
           }else{
           	  navigator.geolocation.getCurrentPosition(successCallback,errorCallback,locOptions);
           }
           
           if(currentUser.phone){
           	  setPhone(currentUser.phone);
           }else{
           	  setPhone("");
           }
           
           if(currentUser.avatar){
           	  setShowImage(currentUser.avatar);
           }else{
              setShowImage(createImageFromInitials(500, currentUser.name, getBackgroundColor()));
           }

           if(currentUser && currentUser.roleId == 2){
           	  setBusinesPhone(currentUser.business_phone) 
           	  
           	  setType(currentUser.business_type)
           	  setAbout(currentUser.description)

           	  setCurrentLat(currentUser.latitude)
	  		  setCurrentLang(currentUser.longitude)

           	  setHowLong(currentUser.how_long_in_business)
           	  setPotentialCustomers(currentUser.potential_customers_to_know)

           	  if (currentUser.status == 2) {
           	  	setIsAccPending(true)
           	  }
           }
           
        } else {
    		navigate('/')
        }
    }, [currentUser]);

    useEffect(() => {       
        if(successMsg){
        	// debugger
            setTimeout(function(){
                clearCustomerMessages();
            },3000);
            
        }
    }, [successMsg]) 

    useEffect(() => {       
        if(errorMsg){
        	if (typeof errorMsg == 'string') {
        		if(errorMsg == 'Unauthenticated.')
        		{
        			navigate('/')
        		} else {
        			setErrorText(errorMsg)
        		}
        		
        	} else {
        		setErrors(errorMsg)
        	}

            setTimeout(function(){
                clearCustomerMessages();
            },6000);
            
        }
        if (imageValidError) {
        	setTimeout(function(){
                setImageValidError("");
            },6000);
        }
    }, [errorMsg,imageValidError])

    const cancelSubscription = () => {
		setShowToggle(true);
	}

	const handleModalClose = () => setShowToggle(false);
	

    const submitAction = () => {
    	cancelSubscrptn(planId)
    	setShowToggle(false);
    	onLoadAccount()
    } 

    let popupProps = {
    	showToggle,
    	handleModalClose,
    	modalMessage: 'Are you sure you want to cancel plan?',
    	submitAction,
    }

    const searchOptions = {
	  // componentRestrictions: { country: ['us'] },
	  // types: ['city']
    	location: new google.maps.LatLng(42.407211, -71.382439),
		radius: 2000,
		types: ['address']
	}

	return (
		<Fragment>
			<section className="profile-main-sec myaccount-main-sec p-50">
				<Container>
					<Row className="">
						
			        	<Col lg={6}>
			        	      {successMsg ? <Alert variant="success">{successMsg}</Alert> : <Fragment /> }
                              {errorText ? <Alert variant="danger">{errorText}</Alert> : <Fragment /> }
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
			        		<div className="darkblue-sec">
				        		<div className="outer-form-plan">
				        			<Form>
								      <Form.Group className="mb-3" controlId="formBasicEmail">
								        <Row>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Name</Form.Label>
								        			<Form.Control 
								        			    type="text"
								        			    value={fName}
								        			    onChange={(e) => setFName(e.target.value)}
								        			    placeholder="Full Name"
								        			    readOnly={editToggle}
								        			/>
								        		</div>
								        		<span className="text-danger">{errors && errors.name ? errors.name : ''}</span>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Email</Form.Label>
								        			<Form.Control 
								        			    type="text"
								        			    value={email}
								        			    onChange={(e) => setEmail(e.target.value)}
								        			    placeholder="Email"
								        			    readOnly
								        			/>
								        		</div>
								        		<span className="text-danger">{errors && errors.email ? errors.email : ''}</span>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Cell Phone <span className="field-desc"> This will not be shown on the platform (internal use only)</span></Form.Label>
								        			<Form.Control 
								        			    type="text"
								        			    value={phone}
								        			    onChange={(e) => setPhone(e.target.value)}
								        			    placeholder="Phone"
								        			    readOnly={editToggle}

								        			/>
								        		</div>
								        		<span className="text-danger">{errors && errors.phone ? errors.phone : ''}</span>
								        	</Col>
								        	
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Address</Form.Label>
								        			<PlacesAutocomplete        
												value={address}        
												onChange={setAddressFunc}        
												onSelect={handleSelect} 
												searchOptions={searchOptions}     
												>        
												{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (          
													<div>            
													<input              
														{...getInputProps({                
															placeholder: 'Search Address...',                
															className: 'location-search-input',              
														})}            
													/>            
													<div className="autocomplete-dropdown-container">              
													{loading && <div>Loading...</div>}              
															{suggestions.map(suggestion => {                
																const className = suggestion.active                  
																? 'suggestion-item--active'                  
																: 'suggestion-item';                
																// inline style for demonstration purpose                
																const style = suggestion.active                  
																? { backgroundColor: '#fafafa', cursor: 'pointer' }                  
																: { backgroundColor: '#ffffff', cursor: 'pointer' };                
																return (                  
																<div      
																{...getSuggestionItemProps(suggestion, 
																	{ className,                      
																		style,                    
																	})} 
																	key={suggestion.placeId}                 
																>                    
																<span
																	key={suggestion.placeId}
																	>{suggestion.description}</span>                  
																</div>                
																);              
															})}            
															</div>         
															</div>        
													)}      
												</PlacesAutocomplete> 
												{ !currentLocation ? <span className="text-danger" dangerouslySetInnerHTML={{__html:locationErr}}></span> : ''}
								        			<span className="text-danger">{errors && errors.address ? errors.address : ''}</span>
								        		</div>
								        	</Col>
								        	

								        	{(currentUser && currentUser.roleId == '2') ? (

								        			<Fragment>
								        				
								        				<Col md={12} className="mt-4">
											        		<div className="outer-form">
											        			<Form.Label>Business Phone <span className="field-desc"> This number will be shared on the platform</span></Form.Label>
											        			<Form.Control 
											        			    type="text"
											        			    value={businesPhone}
											        			    placeholder="Business Phone"
											        			    onChange={(e) => setBusinesPhone(e.target.value)}
											        			    readOnly={editToggle}
											        			/>
											        			<span className="text-danger">{(errors && errors.business_phone ) ? errors.business_phone : '' }</span>
											        		</div>
											        	</Col>

											        	<Col md={12} className="mt-4">
											        		<div className="outer-form">
											        			<Form.Label>Business Type</Form.Label>
											        			<Form.Control
														          as="select"
														          value={type}
														          onChange={e => {
														            console.log("e.target.value", e.target.value);
														            setType(e.target.value);
														          }}
														          readOnly={editToggle}
														        >
														         <option disabled value="" >Business Type</option>
														         <>
														         {
														         	options.map((option,index)=>(
														         		<option key={index} value={option.value}>{option.label}</option>
														         		))

														         }
														     	</>
														        </Form.Control>
														         <span className="text-danger">{(errors && errors.business_type ) ? errors.business_type : '' }</span>
											        		</div>
											        	</Col>
											        	<Col md={12} className="mt-4">
											        		<div className="outer-form">
											        			<Form.Label>About Business</Form.Label>
											        			<Form.Control 
											        				as="textarea" 
											        				rows={3} 
											        				value={about}
											        			    placeholder="About business"
											        			    onChange={(e) => setAbout(e.target.value)}
											        			    readOnly={editToggle}
											        			/>
											        			<span className="text-danger">{(errors && errors.description ) ? errors.description : '' }</span>
											        		</div>
											        	</Col>

											        	<Col md={12} className="mt-4">
											        		<div className="outer-form">
											        			<Form.Label>How long have you been in business</Form.Label>
											        			<Form.Control 
											        				as="textarea" 
											        				rows={3} 
											        				value={howLong}
											        			    placeholder="How long have you been in business"
											        			    onChange={(e) => setHowLong(e.target.value)}
											        			    readOnly={editToggle}
											        			/>
											        			<span className="text-danger">{(errors && errors.howLong ) ? errors.howLong : '' }</span>
											        		</div>
											        	</Col>

											        	<Col md={12} className="mt-4">
											        		<div className="outer-form">
											        			<Form.Label>What would you like your potential customers to know?</Form.Label>
											        			<Form.Control 
											        				as="textarea" 
											        				rows={3} 
											        				value={potentialCustomers}
											        			    placeholder="What would you like your potential customers to know?"
											        			    onChange={(e) => setPotentialCustomers(e.target.value)}
											        			    readOnly={editToggle}
											        			/>
											        			<span className="text-danger">{(errors && errors.potentialCustomers ) ? errors.potentialCustomers : '' }</span>
											        		</div>
											        	</Col>

								        			</Fragment>




								        		) : null}





								        	<Col lg={12} className="mt-4">
								        		<div className="btn-grp text-center">
							        				<Button 
							        					onClick={()=> setEditToggle(!editToggle)}
							        					className="custom-btn orange-btn-border">
							        					Edit details
							        				</Button>
							        				<Button 
							        					disabled={!currentLocation}
							        					onClick={submitBtn}
							        				 	className="orange-btn custom-btn">Save changes
							        				</Button>
							        			</div>
								        	</Col>
								        	
								        </Row>
								      </Form.Group>
								    </Form>
				        		</div>
                            </div>
			        	</Col>
			        	<Col lg={6}>
			        		<div className="starter-plan-outer">
			        			<>
				        			{ isPlan ?
				        				<>
				        					
			        						<h3>{planName} <Badge bg={statusBadge} className="active-badge">{planStatus}</Badge></h3>
			        						{ planCancelAt ?
			        							<p className="mb-5">Cancelled on {planCancelAt}</p>
			        							:
			        							<>
			        							{ (currentUser &&  currentUser.roleId == 3) ?
			        									<p className="mb-5">Next billing date {planNextBill}</p>
			        								: null
			        							}
			        							
			        							</>
			        						}
			        						

			        						
				        					
				        				</>
				        				:
				        				
			        					<>
			        					<p className="mb-5">Not Plan Yet. Please buy</p>
			        					</>
				        				
				        			}
				        			<>
	        							{
	        								(isAccPending)
	        								?
	        								(
	        									<p className="mb-5">We recieved your payment and your account is under verification process. Once approved we’ll notify at your registered email id.</p>
	        								)
	        								: null

	        							}
        							</>
				        			<>
					        			<div className={`btn-grp ${ isPlan && planNextBill ? 'text-center' : 'btn-single'}`}>
					        				{ isPlan && planNextBill ?
					        					<>
						        					
					        						<Link to="/user/upgrade-plan" className="orange-btn btn btn-primary custom-btn">Upgrade Plan</Link>
					        						<Button onClick={cancelSubscription} className="custom-btn orange-btn-border">Cancel plan</Button>
						        					
						        				</>
						        				:
						        				
					        					<>
					        					<Link to="/user/upgrade-plan" className="orange-btn btn btn-primary custom-btn account-buy-btn">Buy Plan</Link>
					        					</>
						        				
						        			}
					        				
					        				
					        			</div>
				        			</>
			        			</>
			        		</div>
			        		<div className="starter-plan-textarea">
			        			{feedbackSuccess ? <Alert variant="success">{feedbackSuccess}</Alert> : <Fragment /> }
			        			<Form>
								      <Form.Group className="mb-3" controlId="formBasicEmail">
									      <Form.Label>Feedback/Suggestions</Form.Label>
						        			<div className="inner-textarea">
						        				<Form.Control 
						        					as="textarea" 
						        					rows={3}
						        					value={feedback}
							        			    placeholder="We value your feedback to better your user experience within our mobile app. Please provide them here..."
							        			    onChange={(e) => setFeedback(e.target.value)} 
						        				/>
						        				<span className="text-danger">{errors && errors.feedback ? errors.feedback : ''}</span>
						        				<Button
						        					onClick={submitSuggetion}
						        				 	className="custom-btn orange-btn mt-3 d-flex ml-auto"
						        				 	>Submit</Button>
						        			</div>
								        
								      </Form.Group>
								    </Form>
			        		</div>
			        	</Col>
			      	</Row>
			      	<EventPopup {...popupProps} />
			    </Container>
			</section>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);