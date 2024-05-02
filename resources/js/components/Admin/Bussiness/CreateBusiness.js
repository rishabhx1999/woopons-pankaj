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
  	CREATE_BUSINESS,
  	CLEAR_BUSINESS_MESSAGES,
  	PAGE_ATTR
} from "../../../constants/actionTypes";

import { Map, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

import PlacesAutocomplete, {  geocodeByAddress,  getLatLng,} from 'react-places-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY");
Geocode.enableDebug();
// import GooglePlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-google-places-autocomplete';

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
	let navigate = useNavigate();

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

	const [currentLat, setCurrentLat] = useState('');
	const [currentLang, setCurrentLang] = useState('');
	const [selectedLat, setSelectedLat] = useState('');
	const [selectedLang, setSelectedLang] = useState('');

	const [howLong, setHowLong] = useState("");
	const [potentialCustomers, setPotentialCustomers] = useState("");

	const [Errors, setErrors] = useState({});

	const [imageValidError, setImageValidError] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [show_image, setShowImage] = useState(profile);

	const [checked, setChecked] = useState('');

	const handleChange = e => {
	    e.persist();
	    let _val = e.target.value;
	    setChecked(_val)
	    // debugger
	    // if (_val == 'unlimited') {
	    // 	setUnlimited(1)
	    // } else {
	    // 	setOneTime(1)
	    // }

	};

	const handleSelect = address => {    
		geocodeByAddress(address)      
		.then(results => getLatLng(results[0]))      
		.then(({ lat, lng }) => {
				// setShowMap(true)
				setSelectedLat(lat)
				setSelectedLang(lng)
				setAddress(address) 
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
             plan: { value: checked, required: true },
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

	const submitHandle =  () => {
	     // debugger;
	     const formData = new FormData();
	     if (profileImage) {
	     	formData.append("profile", profileImage);
	     }
         formData.append("plan_id", checked);
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
	
	const displayLocation = (latitude,longitude) => {
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY&latlng='+latitude+','+longitude+'&sensor=true';
		fetch(url)
		.then(res => res.json())
		.then(address => setCurrentAddress(address))
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
	  setCurrentLat(x)
	  setCurrentLang(y)
	  console.log(`lat: ${x}`)
	  console.log(`long: ${y}`)
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

	var options = {maximumAge:0, timeout:3000, enableHighAccuracy:true};

    useEffect(()=>{
    	navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);

    },[])
    useEffect(() => {       
        if(successAddBusiness){
        	// debugger
            setTimeout(function(){
                clearBusinessMessages();
                navigate('/admin/dashboard')
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

    const searchOptions = {
	  // componentRestrictions: { country: ['us'] },
	  // types: ['Massachusetts']
	  // location: new google.maps.LatLng(42.4072, 71.3824),
	  // radius: 2000,
	  // types: ['address']
    	location: new google.maps.LatLng(42.407211, -71.382439),
		radius: 2000,
		types: ['address']
	}

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
			        			<Row>
			        		
					        		<Col lg={6} className="mt-4">
						        		<div className="outer-form radio-with-text">
						        			<Form.Check 
									            type="radio"
									            label="Bronze"
									            value="3"
										        type="radio"
										        aria-label="radio 1"
										        onChange={handleChange}
										        checked={checked == 3}
									          />
						        		</div>
						        	</Col>
						        	<Col lg={6} className="mt-4">
						        		<div className="outer-form radio-with-text">
						        			<Form.Check 
									            type="radio"
									            label="Platinum"
									            value="4"
										        type="radio"
										        aria-label="radio 1"
										        onChange={handleChange}
										        checked={checked == 4}
									          />
						        		</div>
						        	</Col>
						        	<span className="text-danger">{(Errors && Errors.plan ) ? Errors.plan : '' }</span>
					        	</Row>
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
								        			<span className="text-danger">{(Errors && Errors.name ) ? Errors.name : '' }</span>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
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
															placeholder: 'Business Address...',                
															className: 'location-search-input',              
														})}            
													/>            
													<div className="autocomplete-dropdown-container">              
													{loading && <div>Loading...</div>}              
															{suggestions.map(suggestion => {   console.log(suggestion)             
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
								        		<span className="text-danger">{(Errors && Errors.address ) ? Errors.address : '' }</span>
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
								        			<span className="text-danger">{(Errors && Errors.email ) ? Errors.email : '' }</span>
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
								        			<span className="text-danger">{(Errors && Errors.business_phone ) ? Errors.business_phone : '' }</span>
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
								        			<span className="text-danger">{(Errors && Errors.phone ) ? Errors.phone : '' }</span>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="password"
								        			    value={password}
								        			    placeholder="Password"
								        			    onChange={(e) => setPassword(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.password ) ? Errors.password : '' }</span>
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
								        			
								        			<Form.Control 
								        				as="textarea" 
								        				rows={3} 
								        				value={about}
								        			    placeholder="About business"
								        			    onChange={(e) => setAbout(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.description ) ? Errors.description : '' }</span>
								        		</div>
								        	</Col>

								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        				as="textarea" 
								        				rows={3} 
								        				value={howLong}
								        			    placeholder="How long have you been in business"
								        			    onChange={(e) => setHowLong(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.howLong ) ? Errors.howLong : '' }</span>
								        		</div>
								        		
								        		
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        				as="textarea" 
								        				rows={3} 
								        				value={potentialCustomers}
								        			    placeholder="What would you like your potential customers to know?"
								        			    onChange={(e) => setPotentialCustomers(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.potentialCustomers ) ? Errors.potentialCustomers : '' }</span>
								        		</div>
								        		
								        		
								        	</Col>

								        	<Col lg={12} className="mt-4">
								        		<div className="right-profile-btn text-right">
							        				<Button className="orange-btn custom-btn w-100" onClick={submitBtn}>Create Business</Button>
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