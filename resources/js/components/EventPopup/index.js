import React, {useEffect} from 'react';
import { connect } from "react-redux";

import MainView from './MainView';
import './style.scss';

const mapStateToProps = (state) => ({
  	...state
});

const mapDispatchToProps = (dispatch) => ({ });

const EventPopup = (props) => {

	let mainProps = {...props}


	return (
		<div className="dashboard-page">
			<MainView {...mainProps} />
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPopup);