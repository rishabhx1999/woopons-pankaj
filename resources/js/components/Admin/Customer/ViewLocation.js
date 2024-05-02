import React, { Fragment,useState,useEffect, useRef } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { FaAngleLeft } from 'react-icons/fa';
import { BsFillPlusCircleFill, BsGlobe } from 'react-icons/bs';
import { AiFillCloseCircle, AiOutlineMail } from 'react-icons/ai';
import { IoMdCall } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";
import TimePicker from 'react-bootstrap-time-picker';
import './style.scss';
import DeleteModal from './DeleteModal.js';

import { ALL_LOCATIONS } from "../../../constants/linkConstants";

import { Link, useNavigate, useParams } from 'react-router-dom';
import { timeToInt,timeFromInt } from 'time-number';

// import GooglePlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-google-places-autocomplete';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import clockCircle from "../../../assets/clock-circle-outlined.png";

import {
  	EDIT_LOCATION,
  	UPDATE_LOCATION,
  	UPDATE_LOCATION_MSG_REMOVE,
  	DELETE_LOCATION,
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
  	isDeleted: state.admin.isDeleted,
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (lId) => {
    	dispatch({ type: EDIT_LOCATION, payload: agent.admin.editLocation(lId) });
  	},
  	onDeleteSubmit: (formData) => {
    	dispatch({ type: DELETE_LOCATION, payload: agent.admin.deleteLocation(formData) });
  	}
});


const ViewLocation = (props) => {

	const { onLoad, isDeleted, onDeleteSubmit, Location, successUpdateLocation, errorUpdateLocation } = props;

	let navigate = useNavigate();

	const params = useParams();
	let locationId = params.id;

	const locationRef = useRef();
	const imagesDiv = useRef();
	const formRef = useRef();

	const [lat, setLat] = useState('');
	const [long, setLong] = useState('');
	let _timePickerState = "00:00";
	const [wStartDay, setWStartDay] = useState("Monday");
	const [wEndDay, setWEndDay] = useState("Friday");

	const [openHrs, setOpenHrs] = useState(_timePickerState);
	const [closeHrs, setCloseHrs] = useState(_timePickerState);
	const [satOpenHrs, setSatOpenHrs] = useState(_timePickerState);
	const [satCloseHrs, setSatCloseHrs] = useState(_timePickerState);

	const [thisId, setThisId] = useState('');

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

	const [showDelete,setShowDelete] = useState(false)

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
    		if (Location.id) {
    			setThisId(Location.id)
    		}
    		if (Location.locationimages) {
    			setImagesPrevLocation(Location.locationimages)
    		}
    		if (Location.workingstartday) { setWStartDay(Location.workingstartday) }
    		if (Location.workingendday) { setWEndDay(Location.workingendday) }
    		if (Location.workingstarttime) { 
    			// console.log(timeToInt(Location.workingstarttime))
    			setOpenHrs(Location.workingstarttime) 
    		}
    		if (Location.workingendtime) { 
    			setCloseHrs(Location.workingendtime) 
    		}
    		if (Location.satstarttime) { 
    			setSatOpenHrs(Location.satstarttime)
    		}
    		if (Location.satendtime) { 
    			setSatCloseHrs(Location.satendtime) 
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

	const  onInfoWindowClose = ( event ) => {
	}; 

	useEffect(() => {
		onLoad(locationId)
		
	},[])

    const AsyncMap = withScriptjs(
					   withGoogleMap(
					    props => (
						     <GoogleMap google={props.google}
						      defaultZoom={11}
						      defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
						     >
						    
							{/*Marker*/}
						      <Marker google={props.google}
						       	name={'Dolores park'}
						        draggable={false}
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
   	const sliderSettings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      swipeToSlide: true,
    };

    const handleDeleteClose = () => { setShowDelete(false) }

    useEffect(()=>{
    	if (isDeleted) {
    		navigate('/admin/locations')
    	}
    },[isDeleted])
   	
   	const handleDeleteLocation = () => {
   		onDeleteSubmit({locationId})
   		// navigate('/admin/locations')
   		// console.log(locationId)
   	}

   	let deleteProps = {
    	handleDeleteLocation,
    	handleDeleteClose,
    	showDelete
    }

	return (
		<Fragment>
			<section className="profile-main-sec edit-location-sec">
				<div className="shadow-box">
					<Row className="mb-5">
			           <Col md={6}>
			           		<Link to={ALL_LOCATIONS} ><FaAngleLeft /> Filansd/kontact</Link>
			           	</Col>
			           <Col md={6} className="text-right">
			           <div className="kontakt-btngrp">
			           		<Link 
				           	className="custom-btn btn-primary skyblue-btn"
				           	onClick={()=> setShowDelete(true)}>Delete
				           </Link>
				           <Link 
				           	className="custom-btn btn-primary skyblue-btn"
				           	to={'/admin/location/'+thisId}>Edit
				           </Link>
			           </div>	
			           	
			           </Col>
			        </Row>
			        <Row className="mt-5">
					   <Col md={12}>
				           <div ref={imagesDiv}>
				           	<Slider {...sliderSettings}>
				           	{imagesPrevLocation.map((imageSrc, index) => (
						           	<div className="image-box ">
						           		<Image src={(typeof imageSrc === 'object') ? imageSrc.path :imageSrc} />
						           	</div>
						      ))}
					        </Slider>
					        </div>	
					   </Col>
					   
			        </Row>

			        <Row className="mt-5">
			           <Col md={9}>
			           		<div className="outer-edit-locat w-100 mb-4">
				           		<div className="date-time-outr">
				           			<div className="dat-time-inner">
				           				<div><span>{wStartDay}</span> - <span>{wEndDay}</span></div>
				           				<div><span><Image src={clockCircle} /> {openHrs}</span> - <span>{closeHrs}</span></div>
				           			</div>
				           			<div className="dat-time-inner">
				           				<div><span>Saturday</span></div>
				           				<div><span><Image src={clockCircle} />{satOpenHrs}</span> - <span> {satCloseHrs}</span></div>
				           			</div>
				           		</div>
			           		</div>
			           		<div className="outer-edit-locat w-100 mb-4">
				           		<div className="date-time-outr">
				           			<div className="dat-time-inner">
				           				<div><span><IoMdCall /> {lPhone}</span> </div>
				           			</div>
				           		</div>
			           		</div>
			           		<div className="outer-edit-locat w-100 mb-4">
				           		<div className="date-time-outr">
				           			<div className="dat-time-inner">
				           				<div><span><AiOutlineMail /> {lEmail}</span> </div>
				           			</div>
				           		</div>
			           		</div>
			           		<div className="outer-edit-locat w-100 mb-4">
				           		<div className="date-time-outr">
				           			<div className="dat-time-inner">
				           				<div><span><BsGlobe /> {lWebsite}</span> </div>
				           			</div>
				           		</div>
			           		</div>
			           		<div className="outer-edit-locat w-100 mb-4">
				           		<div className="date-time-outr">
				           			<div className="dat-time-inner">
				           				<div><span><FiMapPin /> {locationAddress}</span> </div>
				           			</div>
				           		</div>
			           		</div>

			           </Col>
			           <Col md={3}>
			           	<div className="map-viewlocat">
			           		<AsyncMap 
							    	  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY&libraries=places"
								      loadingElement={
								       <div style={{ height: `100%` }} />
								      }
								      containerElement={
								       <div style={{height: `400px`, width: `100%`}} />
								      }
								      mapElement={
								       <div style={{height: `400px`, width: `100%`}} />
								      }
							    	/>
			           	</div>
			           </Col>
			        </Row>
				</div>
				<DeleteModal {...deleteProps} />
			</section>
		</Fragment>
	);
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY'
})(connect(mapStateToProps, mapDispatchToProps)(ViewLocation))