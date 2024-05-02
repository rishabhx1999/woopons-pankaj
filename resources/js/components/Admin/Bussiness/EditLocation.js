import React, { Fragment,useState,useEffect, useRef } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { FaAngleLeft } from 'react-icons/fa';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import profile from "../../../assets/images/avtar.jpg";
import TimePicker from 'react-bootstrap-time-picker';

import { ALL_LOCATIONS } from "../../../constants/linkConstants";

import { Link, useNavigate, useParams } from 'react-router-dom';
import { timeToInt,timeFromInt } from 'time-number';

// import GooglePlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-google-places-autocomplete';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


import {
  	EDIT_LOCATION,
  	UPDATE_LOCATION,
  	UPDATE_LOCATION_MSG_REMOVE,
} from "../../../constants/actionTypes";

import PlacesAutocomplete, {  geocodeByAddress,  getLatLng,} from 'react-places-autocomplete';

import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY");
Geocode.enableDebug();

const mapStateToProps = (state) => ({
  	...state,
  	Location: state.admin.Location,
  	successUpdateLocation: state.admin.successUpdateLocation,
  	errorUpdateLocation: state.admin.errorUpdateLocation,
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (lId) => {
    	dispatch({ type: EDIT_LOCATION, payload: agent.admin.editLocation(lId) });
  	},
  	onSubmit: (formData) => {
    	dispatch({ type: UPDATE_LOCATION, payload: agent.admin.updateLocation(formData) });
  	},
	clearAdminMessages: () => {
	   dispatch({ type: UPDATE_LOCATION_MSG_REMOVE });
	}
});


const EditLocation = (props) => {

	const { onLoad, Location, onSubmit, clearAdminMessages, successUpdateLocation, errorUpdateLocation } = props;

	let navigate = useNavigate();

	const params = useParams();
	let locationId = params.id;

	const locationRef = useRef();
	const imagesDiv = useRef();
	const formRef = useRef();
	const weeklastday = useRef();
	const weekFirstday = useRef();

	const [lat, setLat] = useState('');
	const [long, setLong] = useState('');
	let _timePickerState = {
	  value:"0",
      format: 24,
      initialValue: "00:00",
      start: "00:00",
      end: "23:59",
      step: 30,
    }
	const [wStartDay, setWStartDay] = useState("Monday");
	const [wEndDay, setWEndDay] = useState("Friday");

	const [openHrs, setOpenHrs] = useState(_timePickerState);
	const [closeHrs, setCloseHrs] = useState(_timePickerState);
	const [satOpenHrs, setSatOpenHrs] = useState(_timePickerState);
	const [satCloseHrs, setSatCloseHrs] = useState(_timePickerState);

	const [lName,setLName] = useState('');
	const [locationAddress, setLocationAddress] = useState('Bestech Square Mall, Mohali Railway Station Road, Sector 66, Sahibzada Ajit Singh Nagar, Punjab, India');
	const [lPhone,setLPhone] = useState('');
	const [lPhoneError,setLPhoneError] = useState('');

	const [lEmail,setLEmail] = useState('');
	const [lEmailError,setLEmailError] = useState('');

	const [lWebsite,setLWebsite] = useState('');

	const [showMap, setShowMap] = useState(false);
	const [imagesLocation, setImagesLocation] = useState([]);
	const [imagesPrevLocation, setImagesPrevLocation] = useState([]);
	const [imageValidError, setImageValidError] = useState("");

	const [isValidError, setIsValidError] = useState(false);

	const [deletedImages, setDeletedImages] = useState([]);

	const [mapPosition, setMapPosition] = useState({
	    lat: 30.6737072,
	    lng: 76.740323
	});
	const [markerPosition, setMarkerPosition] = useState({
	    lat: 30.6737072,
	    lng: 76.740323
	});

	const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!lEmail || regex.test(lEmail) === false){
            setLEmailError("Email is not valid");
            return false;
        }
        setLEmailError('')

        return true;
    }

    const phoneValidation = () => {
        const regex1 = /^\d{10}$/;
        if(!lPhone || regex1.test(lPhone) === false){
            setLPhoneError("Only 10 digits phone number allow.");
            return false;
        }
        setLPhoneError('')
        return true;
    }

    useEffect(() => {
    	if (Location) {
    		if (Location.locationimages) {
    			setImagesPrevLocation(Location.locationimages)
    		}
    		if (Location.workingstartday) { 

    			setWStartDay(Location.workingstartday)
    			let _slctedIndex = null;
    			for (var i = 0; i < weekFirstday.current.options.length; ++i) {
					var item = weeklastday.current.options[i]; 
					if (item.value == Location.workingstartday) {
						_slctedIndex = i
					}
				} 
				for (var i = 0; i < weeklastday.current.options.length; ++i) {
					var item = weeklastday.current.options[i]; 
					if (i < _slctedIndex) {
						item.disabled = true
					} else {
						item.disabled = false
					}

				}
    		}
    		if (Location.workingendday) { 
    			setWEndDay(Location.workingendday) 
    		}
    		if (Location.workingstarttime) { 
    			// console.log(timeToInt(Location.workingstarttime))
    			setOpenHrs({ ...openHrs,value:timeToInt(Location.workingstarttime) }) 
    		}
    		if (Location.workingendtime) { 
    			setCloseHrs({ ...closeHrs,value:timeToInt(Location.workingendtime) }) 
    		}
    		if (Location.satstarttime) { 
    			setSatOpenHrs({ ...satOpenHrs,value:timeToInt(Location.satstarttime) })
    		}
    		if (Location.satendtime) { 
    			setSatCloseHrs({ ...satCloseHrs,value:timeToInt(Location.satendtime) }) 
    		}
    		if (Location.location) { 
    			setLocationAddress(Location.location) 
    		}
    		if (Location.phone) { setLPhone(Location.phone) }
    		if (Location.name) { setLName(Location.name) }
    		if (Location.email) { setLEmail(Location.email) }
    		if (Location.website) { setLWebsite(Location.website) }
    		if (Location.lat && Location.lng) { 
    			setMapPosition({lat: parseInt(Location.lat), lng:parseInt(Location.lng)}) 
    			setMarkerPosition({lat: parseInt(Location.lat), lng:parseInt(Location.lng)})
    		}
    	}
    },[Location])

   const handleRemovedImages = (e,Id) => {

   }

	const submitBtn =  (e) => {
	     e.preventDefault();
	    // console.log(imagesLocation)


	    if(emailValidation() && phoneValidation()){
		     	const formData = new FormData();
		     	for (let i = 0; i < imagesLocation.length; i++) {
		      	formData.append('files', imagesLocation[i]);
		    	}
	         // formData.append("files", [imagesLocation]);
	         formData.append("workingstartday", wStartDay);
	         formData.append("workingendday", wEndDay);
	         formData.append("workingstarttime", timeFromInt(openHrs.value));
	         formData.append("workingendtime", timeFromInt(closeHrs.value));
	         formData.append("satstarttime", timeFromInt(satOpenHrs.value));
	         formData.append("satendtime", timeFromInt(satCloseHrs.value));
	         formData.append("location", locationAddress);
	         formData.append("lat", markerPosition.lat);
	         formData.append("lng", markerPosition.lng);
	         formData.append("name", lName);
	         formData.append("email", lEmail);
	         formData.append("phone", lPhone);
	         formData.append("website", lWebsite);

	         if (deletedImages.length > 0) {
	         	for (let i = 0; i < deletedImages.length; i++) {
			      	formData.append('deleteImages[]', deletedImages[i]);
			    	}
	         }
	          // console.log(formData.get('files'));
				if (locationId && locationId != '') {
					formData.append("locationId", locationId);
					onSubmit(formData);
				}
		     
		} 
		// else {
		// 	Object.values(formState.errors).map( (e,idx) => {
		// 		console.log(e.message)
		//    })
		// }
	    
	}; 

	const handleOpenTimeChange = (value) => {
	   setOpenHrs({ ...openHrs,value:value });
	}
	const handleCloseTimeChange = (value) => {
	   setCloseHrs({ ...closeHrs,value:value });
	}
	const handleSatOpenTimeChange = (value) => {
	   setSatOpenHrs({ ...satOpenHrs,value:value });
	}
	const handleSatCloseTimeChange = (value) => {
	   setSatCloseHrs({ ...satCloseHrs,value:value });
	}

	const filterState = (timeState) => {
	    const ret = {...timeState};

	    try {
	      timeToInt(ret.start);
	    } catch(ex) {
	      ret.start = "00:00";
	    }

	    try {
	      timeToInt(ret.end);
	    } catch(ex) {
	      ret.end = "23:59";
	    }

	    if (ret.step < 1) {
	      ret.step = 30;
	    }

	    return ret;
	}

    const onPlaceSelected = ( place ) => {
	   const address = place.formatted_address,
	   addressArray =  place.address_components,
	   latValue = place.geometry.location.lat(),
	   lngValue = place.geometry.location.lng();
	// Set these values in the state.
	   setLocationAddress(address)
	   setMapPosition({lat: latValue,lng: lngValue})
	   setMarkerPosition({lat: latValue,lng: lngValue})
	  	
	};

	const onMarkerDragEnd = ( event ) => {
	  // console.log( 'event', event );
	  	let newLat = event.latLng.lat(),
	   	newLng = event.latLng.lng(),
	   	addressArray = [];
		Geocode.fromLatLng( newLat , newLng ).then(
		   response => {
		    const address = response.results[0].formatted_address,
		     addressArray =  response.results[0].address_components;
		     // console.log(address)
		     setLocationAddress(address)
		     // console.log(locationRef)
		     // locationRef.current.setAddressText(locationAddress);
		     // locationRef.setAddressText(address)
		     setMapPosition({ lat:newLat, lng:newLng })
	   		setMarkerPosition({ lat:newLat, lng:newLng })
		   },
		   error => {
		    console.error(error);
		   }
		)
	}

	const  onInfoWindowClose = ( event ) => {
	};
    const handleChange = address => {   
		setLocationAddress(address) 
	};   
	const handleSelect = address => {    
		geocodeByAddress(address)      
		.then(results => getLatLng(results[0]))      
		.then(({ lat, lng }) => {
				setShowMap(true)
				setLocationAddress(address) 
			  	setMapPosition({ lat, lng })
	   			setMarkerPosition({ lat, lng })
			  })      
		.catch(error => console.error('Error', error));  
	};

	const handleMapToggle = () => {
		setShowMap(!showMap)
	}

	const fileSelectedHandler = (e) => {
		const uploadImage = e.target.files[0];
    	if (!uploadImage.name.match(/\.(jpg|jpeg|png)$/)) {
    		setImageValidError("Only .png, .jpg and .jpeg format allowed!")
    		return false;
    	} else {
    		
			setImagesLocation([...imagesLocation,uploadImage])
			setImagesPrevLocation([...imagesPrevLocation,URL.createObjectURL(uploadImage)])
		}
	}

	const removeImage = (e, i) => {
		// console.log(index)
		if ((typeof imagesPrevLocation[i] === 'object')) {    
    		deletedImages.push(imagesPrevLocation[i].id); 
			setDeletedImages(deletedImages)
		}
		let deleteImages = imagesLocation.filter((item, index) => index !== i)
		let deleteImagesPrev = imagesPrevLocation.filter((item, index) => index !== i)
		setImagesLocation(deleteImages)
		setImagesPrevLocation(deleteImagesPrev)
		

	}

	useEffect(() => {
		onLoad(locationId)
		
	},[])

	useEffect(() => {
		console.log(imagesPrevLocation)
		console.log(deletedImages)
		if (imageValidError) {
        	setTimeout(function(){
                setImageValidError("");
            },3000);
        }
        if(successUpdateLocation){
            setTimeout(function(){
                clearAdminMessages();
            },3000);
            
        }
        if (errorUpdateLocation) {
        	setTimeout(function(){
                clearAdminMessages("");
            },3000);
        }

	},[imageValidError,successUpdateLocation,errorUpdateLocation,imagesPrevLocation,deletedImages])

    const AsyncMap = withScriptjs(
					   withGoogleMap(
					    props => (
						     <GoogleMap google={props.google}
						      defaultZoom={15}
						      defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
						     >
						    
							{/*Marker*/}
						      <Marker google={props.google}
						       	name={'Dolores park'}
						        draggable={true}
						        onDragEnd={ onMarkerDragEnd }
						        position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
						      />
						      <Marker />
							{/* InfoWindow on top of marker */}
						      <InfoWindow
						       onClose={onInfoWindowClose}
						       position={{ lat: ( markerPosition.lat + 0.0018 ), lng: markerPosition.lng }}
						      >
						       <div>
						        <span style={{ padding: 0, margin: 0 }}>{ locationAddress }</span>
						       </div>
						      </InfoWindow>
						</GoogleMap>
						)
					   )
					);
   	const handleWeekFirstDay = (e)=> {
    	let _val = e.target.value
    	let _idx = e.target.selectedIndex

    	setWStartDay(_val)
    	// console.log(weeklastday.current.options)
    	for (var i = 0; i < weeklastday.current.options.length; ++i) {
    		// let _frstI = ;
			var item = weeklastday.current.options[i]; 
			if (i < _idx) {
				item.disabled = true
			} else {
				// if (_frstI) {}
				if (i == _idx) { item.selected = true }
				item.disabled = false
			}

		}
    }

   	const sliderSettings = {
      dots: false,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
    };
   	

	return (
		<Fragment>
			<section className="profile-main-sec">
				<div className="shadow-box">
				<Form ref={formRef}>
					{successUpdateLocation ? <Alert variant="success">{successUpdateLocation}</Alert> : <Fragment /> }
                    {errorUpdateLocation ? <Alert variant="danger">{errorUpdateLocation}</Alert> : <Fragment /> }
					<Row className="mb-5">
			           <Col md={6}>
			           		<Link to={ALL_LOCATIONS} ><FaAngleLeft /> Filansd/kontact</Link>
			           	</Col>
			           <Col md={6} className="text-right">
			           	<a onClick={submitBtn} className="custom-btn btn-primary skyblue-btn">Save Changes</a>	
			           	
			           </Col>
			        </Row>
			        <Row className="mt-5">
			           <Col md={3}>
				           	<div className="image-box btn-blue">
				           		<input type="file" 
				           			onChange={fileSelectedHandler} 
				           			required
				           			className="file-edit skyblue-btn custom-btn w-100 h-100"
				           			
				           		/>
				           		<button type="submit" className="skyblue-btn custom-btn w-100 "><BsFillPlusCircleFill /><br /> Add Images</button>
				           	</div>
				           	<span className="text-danger text-upload-error">{imageValidError}</span>
					   </Col>
					   <Col md={9}>
				           <div ref={imagesDiv}>
				           	<Slider {...sliderSettings}>
				           	{imagesPrevLocation.map((imageSrc, index) => (
						           	<div className="image-box ">
						           		<Image src={(typeof imageSrc === 'object') ? imageSrc.path :imageSrc} />
						           		<AiFillCloseCircle onClick={(e) => removeImage(e, index)} className="cross" />
						           	</div>
						      ))}
					        </Slider>
					        </div>	
					   </Col>
					   
			        </Row>

			        <Row className="mt-5">
			           <Col md={9}>
			           		<div className="outer-form">
			           			<p>working days</p>
			           			<div className="inner-form">
			           				<Row>
			           					<Col md={3}>
			           						<Form.Select 
			           							aria-label="Default select example"
			           							onChange={handleWeekFirstDay}
			           							value={wStartDay}
			           							ref={weekFirstday}
			           						>
										      <option value="Monday">Monday</option>
										      <option value="Tuesday">Tuesday</option>
										      <option value="Wednesday">Wednesday</option>
										      <option value="Thursday">Thursday</option>
										      <option value="Friday">Friday</option>
										    </Form.Select>
			           					</Col>
			           					<Col md={3}>
			           						<Form.Select 
			           							aria-label="Default select example"
			           							onChange={(e)=> setWEndDay(e.target.value)}
			           							value={wEndDay}
			           							ref={weeklastday}
			           						>
										      <option value="Monday">Monday</option>
										      <option value="Tuesday">Tuesday</option>
										      <option value="Wednesday">Wednesday</option>
										      <option value="Thursday">Thursday</option>
										      <option value="Friday">Friday</option>
										    </Form.Select>
			           					</Col>
			           					<Col md={6}>
			           						<div className="date-outer d-flex align-items-center justify-content-end mb-4">
			           							<p>Öffnungszeiten</p>
			           							<TimePicker 
			           								{...filterState(openHrs)}
			           								onChange={handleOpenTimeChange}
			           								required
			           							/>
			           							<TimePicker 
			           								{...filterState(closeHrs)}
			           								onChange={handleCloseTimeChange}
			           								required 
			           							/>
			           						</div>

			           						<div className="date-outer d-flex align-items-center justify-content-end">
			           							<p>Samstag</p>
			           							<TimePicker 
			           								{...filterState(satOpenHrs)}
			           								onChange={handleSatOpenTimeChange} 
			           							/>
			           							<TimePicker 
			           								{...filterState(satCloseHrs)}
			           								onChange={handleSatCloseTimeChange} 
			           							/>
			           						</div>
			           					</Col>
			           				</Row>
			           			</div>
			           		</div>
			           		<Row>
	           					<Col md={12} className="mt-4">
	           						<Form.Group className="mb-3" controlId="formBasicEmail">
								        <Form.Label>Name</Form.Label>
								        <Form.Control 
					        			    value={lName}
					        			    onChange={(e) => setLName(e.target.value)}
								        	type="text" 
								        	placeholder="Enter name" 
								        	required
								        />
								        <span className="text-danger"></span>
								    </Form.Group>
	           					</Col>
	           					<Col md={12} className="mt-4">
	           						<Form.Group className="mb-3" controlId="formBasicEmail">
								        <Form.Label>Location</Form.Label>
							        <PlacesAutocomplete        
										value={locationAddress}        
										onChange={handleChange}        
										onSelect={handleSelect}      
										>        
										{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (          
											<div>            
											<input              
												{...getInputProps({                
													placeholder: 'Search Places ...',                
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
														>                    
														<span>{suggestion.description}</span>                  
														</div>                
														);              
													})}            
													</div> 
													<a className="map-show-hide" onClick={handleMapToggle} >
													{showMap ? 'Hide Map' :'Show Map'}</a>         
													</div>        
											)}      
										</PlacesAutocomplete> 

									    <div 
									    	className="map-data" 
									    	style={
									    		{
									    			display: showMap ? 'block' : 'none' 
									    		}
									    }>
										    <div className="location-map">
										    	<AsyncMap 
										    	  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY&libraries=places"
											      loadingElement={
											       <div style={{ height: `100%` }} />
											      }
											      containerElement={
											       <div style={{height: `700px`, width: `700px`}} />
											      }
											      mapElement={
											       <div style={{height: `700px`, width: `700px`}} />
											      }
										    	/>
										    </div>
									    </div>
								    </Form.Group>
	           					</Col>
	           					<Col md={12} className="mt-4">
	           						<Form.Group className="mb-3" controlId="formBasicEmail">
								        <Form.Label>Phone</Form.Label>
								        <Form.Control
								        	value={lPhone}
					        			    onChange={(e) => { 
					        			    	setLPhoneError('');
					        			    	setLPhone(e.target.value)
					        			    }}
								        	type="text" 
								        	placeholder="Enter phone"
								        	required 
								        />
								        
								    </Form.Group>
								    <span className="text-danger">{lPhoneError}</span>
	           					</Col>
	           					<Col md={12} className="mt-4">
	           						<Form.Group className="mb-3" controlId="formBasicEmail">
								        <Form.Label>Email</Form.Label>
								        <Form.Control 
								        	value={lEmail}
					        			    onChange={(e) => {
					        			    	setLEmailError('');
					        			    	setLEmail(e.target.value)
					        			    }} 
								        	type="email" 
								        	placeholder="Enter email"
								        	required
								        />
								        <span className="text-danger">{lEmailError}</span>
								    </Form.Group>
	           					</Col>
	           					<Col md={12} className="mt-4">
	           						<Form.Group className="mb-3" controlId="formBasicEmail">
								        <Form.Label>Website</Form.Label>
								        <Form.Control 
								        	value={lWebsite}
					        			    onChange={(e) => setLWebsite(e.target.value)} 
								        	type="text" 
								        	placeholder="Enter Website Url"
								        	required
								        />
								        <span className="text-danger"></span>
								    </Form.Group>
	           					</Col>
	           				</Row>
			           </Col>
			        </Row>
			        </Form>
				</div>
			</section>
		</Fragment>
	);
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY'
})(connect(mapStateToProps, mapDispatchToProps)(EditLocation))