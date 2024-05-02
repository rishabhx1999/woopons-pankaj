import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

import MainView from './MainView';
import './style.scss';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

const Faq = (props) => {
	let mainProps = {};

 
  	

	return (
		<div className="home-page">
			<MainView {...mainProps} />
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Faq);