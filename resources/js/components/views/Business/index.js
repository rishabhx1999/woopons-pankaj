import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";

import MainView from './MainView';
import './style.scss';

import {
  	PLAN_FETCH,
  	PLAN_FEATURES,
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

const Business = (props) => {
	let mainProps = {};

 
  	

	return (
		<div className="home-page">
			<MainView {...mainProps} />
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Business);