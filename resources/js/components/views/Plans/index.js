import React, {useEffect} from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";

import MainView from './MainView';
import './style.scss';

import {
   PAGE_ATTR
} from "../../../constants/actionTypes"

const mapStateToProps = (state) => ({
  	...state
});

const mapDispatchToProps = (dispatch) => ({ });

const Plans = (props) => {
	let mainProps = props

	return (
		<section id="plans" className="founding-sec2">
			<MainView {...mainProps} />
		</section>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Plans);