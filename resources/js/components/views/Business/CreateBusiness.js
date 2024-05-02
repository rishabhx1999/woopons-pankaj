import React, { Fragment,useState,useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert, Modal  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";
import { options as selectOptions } from "../../../constants/businessType";
import { validate as FormValidate, ListErrorMessages } from '../../../constants/Validations';
import successRed from "../../../assets/images/success-red.png";
import { IoMdInformationCircleOutline } from 'react-icons/io';

import { browserName } from 'react-device-detect';

import {
  	CREATE_BUSINESS_FRONT,
  	CLEAR_BUSINESS_FRONT_MESSAGES,
  	PAGE_ATTR,
  	FRONTEND_LOGIN
} from "../../../constants/actionTypes";

import { useNavigate, useParams } from "react-router-dom";

import PlacesAutocomplete, {  geocodeByAddress,  getLatLng,} from 'react-places-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY");
Geocode.enableDebug();

const mapStateToProps = (state) => ({
  	...state,
  	currentUser: state.common.currentUser,
  	successAddBusiness: state.common.successAddBusiness,
  	errorAddBusiness: state.common.errorAddBusiness,
  	businessUser: state.common.businessUser,
});

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (formData) => {
    	dispatch({ type: CREATE_BUSINESS_FRONT, payload: agent.business.createProfile(formData) });
  	},
  	submitLogin: (userData) => {
    	dispatch({ type: FRONTEND_LOGIN, payload: userData });
  	},
    clearBusinessMessages: () => {
        dispatch({ type: CLEAR_BUSINESS_FRONT_MESSAGES });
    },
    setPageHeading: (title) => {
        dispatch({ type: PAGE_ATTR, pageheading: title });
    }

});

const CreateBusiness = (props) => {
	

	const { currentUser,onSubmit,successAddBusiness,errorAddBusiness,clearBusinessMessages, submitLogin, businessUser } = props;

	const {setPageHeading,pageheading} = props;

	useEffect(() => {  		
		if(pageheading){
            setPageHeading(pageheading);
		}else{
			setPageHeading("Create Business");
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

	const [howLong, setHowLong] = useState("");
	const [potentialCustomers, setPotentialCustomers] = useState("");

	const [Errors, setErrors] = useState({});

	const [imageValidError, setImageValidError] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [show_image, setShowImage] = useState(profile);

	const [currentLocation, setCurrentLocation] = useState(false);

	const [searchOptions, setSearchOptions] = useState({});

	const [currentLat, setCurrentLat] = useState('');
	const [currentLang, setCurrentLang] = useState('');
	const [selectedLat, setSelectedLat] = useState('');
	const [selectedLang, setSelectedLang] = useState('');

	const [locationErr, setLocationErr] = useState('');

	const [curBusinesUser, setCurBusinesUser] = useState(null);

	const [successPopMsg, setSuccessPopMsg] = useState('Go back to home');

	const [guideLink, setGuideLink] = useState('');

	const [modalShow, setModalShow] = useState(false);
	const [checked, setChecked] = useState(1);

	const handleChange = e => {
	    e.persist();
	    let _val = e.target.value;
	    setChecked(_val)

	};

	let params = useParams();
	let navigate = useNavigate();

	const handleClose = () => {
    	setModalShow(false);
    }

    const handleNextNav = () => {

    	setModalShow(false);
    	// setTimeout(function() {
    	if (curBusinesUser) {
    		submitLogin({'data':curBusinesUser})
    	}
    		
    	// }, 3000);
    	
    	// navigate('/user/myaccount')
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

	const submitBtn =  (e) => {
	    e.preventDefault();
	    let checkValidate = FormValidate({
             email: { value: email, email: true, required: true },
             phone: { value: phone, required: true, numbers: true },
             name: { value: fName, required: true },
			 promote_images: { value: checked, required: true },
             address: { value: address, required: true },
             description: { value: about, required: true },
             howLong: { value: howLong, required: true },
             potentialCustomers: { value: potentialCustomers, required: true },
             business_type: { value: type, required: true },
             business_phone: { value: businesPhone, required: true, numbers: true },
             password: { value: password, required: true, hasSpecialCharacter:true, hasUpperCase: true, hasLowerCase:true, minlength: true }
        });

	    if(!checkValidate.status) {
	        setErrors(null);
	        submitHandle()
	    } else {
	        let values = ListErrorMessages(checkValidate.errors);
			// console.log(values)
	        setErrors(values);
	    }

	     // debugger;
	     
	}; 

	const submitHandle = () => {
		const formData = new FormData();
		if (profileImage) {
			formData.append("profile", profileImage);
		}
		// formData.append("id", currentUser.id);
		formData.append("plan_slug", params.plan);
		formData.append("name", fName);
		formData.append("phone", phone);
		formData.append("email", email);

		formData.append("password", password);
		formData.append("address", address);
		formData.append("business_phone", businesPhone);
		formData.append("business_type", type);
		formData.append("description", about);

		formData.append("latitude", selectedLat ? selectedLat : currentLat);
		formData.append("longitude", selectedLang ? selectedLang : currentLang);

		formData.append("how_long", howLong);
		formData.append("potential_customers", potentialCustomers);
		formData.append("promote_images", checked);
		onSubmit(formData);
	}

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

    const displayLocation = (latitude,longitude) => {
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY&latlng='+latitude+','+longitude+'&sensor=true';
		fetch(url)
		.then(res => res.json())
		.then(address => setCurrentAddress(address))

		// if (google) {
	    	
		// }
	};

	// Dispatching city, state, and zip code to store state
	const setCurrentAddress = (data) => {
		console.log(data)
		var current_address = data.results[0];
		setAddress(current_address.formatted_address)
	}

	var successCallback = function(position){
	  var x = position.coords.latitude;
	  var y = position.coords.longitude;
	  console.log(`lat: ${x}`)
	  console.log(`long: ${y}`)
	  setCurrentLat(x)
	  setCurrentLang(y)
	  setLocationErr('')
	  setCurrentLocation(true)

	  displayLocation(x,y);

	};

	// useEffect(()=>{
    	
    	// Chrome, Firefox, IE, , Edge, Opera
    	
    // },[browserName])

	var errorCallback = function(error){
	  var errorMessage = 'Unknown error';
	  switch(error.code) {
	    case 1:
	    	let _guideLink = '';
	    	if (browserName == 'Safari') {
	    		_guideLink = 'https://support.apple.com/en-in/guide/mac-help/mh35873/mac#:~:text=On%20your%20Mac%2C%20choose%20Apple,Location%20Services%20on%20the%20right.'
	    	} else if (browserName == 'Firefox') {
	    		_guideLink = 'https://support.mozilla.org/en-US/kb/does-firefox-share-my-location-websites'
	    	} else if (browserName == 'Edge') {
	    		_guideLink = 'https://support.microsoft.com/en-us/windows/windows-location-service-and-privacy-3a8eee0a-5b0b-dc07-eede-2a5ca1c49088'
	    	} else if (browserName == 'IE') {
	    		_guideLink = 'https://answers.microsoft.com/en-us/ie/forum/all/how-to-set-current-location-on-internet-explorer/a779409c-f351-49ee-a68c-39275ea557d4'
	    	} else if (browserName == 'Opera') {
	    		_guideLink = 'https://www.metopera.org/season/in-cinemas/met-live-at-home-faq/how-to-enable-location-services/'
	    	} else {
	    		console.log(browserName)
	    		_guideLink = 'https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DDesktop'
	    	}


	    	setLocationErr(`<b>Please Enable Browser Location Setting To Get Your Current Location<b><br/><a class="guide-link" href="${_guideLink}" target="_blank">Guide To Enable</a>`)
	    	setCurrentLocation(false)
	      errorMessage = 'Permission denied';
	      break;
	    case 2:
	    	
	      	errorMessage = 'Position unavailable';
	      	break;
	    case 3:
	    	setLocationErr('Timeout')
	      errorMessage = 'Timeout';
	      break;
	  }
	  console.log(errorMessage);
	};

	var options = {maximumAge:0, timeout:3000, enableHighAccuracy:true};

	const getCurntLocation = () => {
		navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);
	}

	useEffect(()=>{

    	getCurntLocation();
    },[])

    useEffect(()=> {
    	if (locationErr == 'Timeout') {
    		getCurntLocation()
    	}

    },[locationErr])
	
	
	useEffect(() => {
		if (businessUser && businessUser.token && businessUser.roleId == 2) {
			setModalShow(true)
			setCurBusinesUser(businessUser)
			setTimeout(function(){
                clearBusinessMessages();
            },3000);
        }
    }, [businessUser]);

    useEffect(() => {       
        if(currentUser){
        	navigate('/business')
        }
    }, [currentUser]) 

    useEffect(() => {       
        if(errorAddBusiness){
        	if (typeof errorAddBusiness === 'string') {
        		setcBusinessError(errorAddBusiness)
        	} else {
        		setErrors(errorAddBusiness)
        	}
        	
            
        }
        if (imageValidError) {
        	setTimeout(function(){
                setImageValidError("");
            },6000);
        }
    }, [errorAddBusiness,imageValidError])

	let _searchOptions = {
    	location: new google.maps.LatLng(42.407211, -71.382439),
		radius: 2000,
		types: ['address']
	}

	return (
		<Fragment>
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
			                        <h4 className="text-center">Welcome to WOO-PONS!</h4>
			                        <div className="right-profile-btn text-center mt-4">
				        				<Button onClick={handleNextNav} className="orange-btn custom-btn w-100">{successPopMsg}
				        				</Button>
				                    	<span className="total-txt modal-business-alert">
				                    		<IoMdInformationCircleOutline />
				                    		We’re excited that you are a part of the WOO-PON family! <br></br>You will receive an email with your login information. 
										</span>
				        			</div>
			                    </div>
			                </div>
					    </Modal>
						{/* Modal code end*/}
						<Col lg={12}>
							<h3 className="inner-pages-title text-center">Create an account to start your membership</h3>
						</Col>
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
			        		<div className="image-desc-div text-center mt-3">
			        			<p className="image-desc">Please upload a logo or image of your business. Customers WILL see this throughout the app. If a logo is not added, your business will automatically have our default image. It is highly recommended that you use your own image. </p>
			        		</div>
			        		<div className="darkblue-sec mt-5 mb-5">
				        		<div className="outer-form-plan">
				        			<Form>
								      <Form.Group className="mb-3" controlId="formBasicEmail">
								        <Row>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Company Name</Form.Label>
								        			<Form.Control 
								        			    type="text"
								        			    value={fName}
								        			    placeholder="Company name"
								        			    onChange={(e) => setFName(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.name ) ? Errors.name : '' }</span>
								        		</div>

								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        		<Form.Label>Business Address</Form.Label>
								        		<PlacesAutocomplete        
												value={address}        
												onChange={setAddressFunc}        
												onSelect={handleSelect} 
												searchOptions={_searchOptions}      
												>        
												{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (          
													<div>            
													<input              
														{...getInputProps({                
															placeholder: 'Business Address...',                
															className: 'location-search-input',              
														})}            
													/>            
													<div className="autocomplete-dropdown-container">              
													{loading && <div>Loading...</div>}              
															{suggestions.map(suggestion => {      console.log(suggestion) 
															if ("terms" in suggestion) {
															let _srchDat = suggestion.terms 

															let _existData = _srchDat.find(item => item.value === 'MA');
															if (_existData) {
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
															}}              
															})}            
															</div>         
															</div>        
													)}      
												</PlacesAutocomplete>
												{ !currentLocation ? <span className="text-danger" dangerouslySetInnerHTML={{__html:locationErr}}></span> : ''}
												<span className="text-danger">{(Errors && Errors.address ) ? Errors.address : '' }</span> 
								        		</div>
	     										
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Email</Form.Label>
								        			<Form.Control 
								        			    type="text"
								        			    value={email}
								        			    placeholder="Email"
								        			    onChange={(e) => setEmail(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.email ) ? Errors.email : '' }</span>
								        		</div>
								        		
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Business Phone <span className="field-desc"> This number will be shared on the platform</span> </Form.Label>
								        			<Form.Control 
								        			    type="text"
								        			    value={businesPhone}
								        			    placeholder="Business Phone"
								        			    onChange={(e) => setBusinesPhone(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.business_phone ) ? Errors.business_phone : '' }</span>
								        		</div>
	     										
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Cell Phone <span className="field-desc"> This will not be shown on the platform (internal use only)</span></Form.Label>
								        			<Form.Control 
								        			    type="text"
								        			    value={phone}
								        			    placeholder="Cell phone"
								        			    onChange={(e) => setPhone(e.target.value)}
								        			/>
								        		</div>
								        		<span className="text-danger">{(Errors && Errors.phone ) ? Errors.phone : '' }</span>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Password</Form.Label>
								        			<Form.Control 
								        			    type="password"
								        			    value={password}
								        			    placeholder="Password"
								        			    onChange={(e) => setPassword(e.target.value)}
								        			/>
								        			<p className="text-danger">{(Errors && Errors.password ) ? Errors.password : '' }</p>
								        		</div>
	     										
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>Business Type</Form.Label>
								        			<Form.Control
											          as="select"
											          value={type}
											          onChange={e => {
											            setType(e.target.value);
											          }}
											        >
											         <option disabled value="" >Business Type</option>
											         {
											         	selectOptions.map((option,index)=>(
											         		<option key={index} value={option.value}>{option.label}</option>
											         		))

											         }
											        </Form.Control>
											        <span className="text-danger">{(Errors && Errors.business_type ) ? Errors.business_type : '' }</span>
								        		</div>
								        		
								        		
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>About Business</Form.Label>
								        			<Form.Control 
								        				as="textarea" 
								        				rows={3} 
								        				value={about}
								        			    placeholder="1-2  sentences about what you do, and who you serve"
								        			    onChange={(e) => setAbout(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.description ) ? Errors.description : '' }</span>
								        		</div>
								        		
								        		
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>How long have you been in business</Form.Label>
								        			<Form.Control 
								        				as="textarea" 
								        				rows={3} 
								        				value={howLong}
								        			    placeholder="example: _____ years"
								        			    onChange={(e) => setHowLong(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.howLong ) ? Errors.howLong : '' }</span>
								        		</div>
								        		
								        		
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Label>What would you like your potential customers to know?</Form.Label>
								        			<Form.Control 
								        				as="textarea" 
								        				rows={3} 
								        				value={potentialCustomers}
								        			    placeholder=" Who would this be good for?"
								        			    onChange={(e) => setPotentialCustomers(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.potentialCustomers ) ? Errors.potentialCustomers : '' }</span>
								        		</div>
								        	</Col>

			        						<Col lg={12} className="mt-4">
			        							<Form.Label>Can we use some of your social media images to promote?</Form.Label>
			        							<Row className="mt-2">
									        		<Col lg={3}>
										        		<div className="outer-form radio-with-text">
										        			<Form.Check 
													            type="radio"
													            label="Yes"
													            value="1"
														        type="radio"
														        aria-label="radio 1"
														        onChange={handleChange}
														        checked={checked == 1}
													          />
										        		</div>
										        	</Col>
										        	<Col lg={3}>
										        		<div className="outer-form radio-with-text">
										        			<Form.Check 
													            type="radio"
													            label="No"
													            value="0"
														        type="radio"
														        aria-label="radio 1"
														        onChange={handleChange}
														        checked={checked == 0}
													          />
										        		</div>
										        	</Col>
										        	<span className="text-danger">{(Errors && Errors.promote_images ) ? Errors.promote_images : '' }</span>
									        	</Row>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="right-profile-btn text-right">
							        				<Button 
							        					disabled={!currentLocation}
							        					className="orange-btn custom-btn w-100" 
							        					onClick={submitBtn}
							        				>Save</Button>
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