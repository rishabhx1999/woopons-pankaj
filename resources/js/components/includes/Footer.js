import React from "react";
import { connect } from "react-redux";
import { Container, Image, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

import { FOOTER_LINKS, FOOTER_ICONS } from './../../constants/footer.js';
import logo from '../../assets/images/logo.svg';

const mapStateToProps = (state) => {
	return {
		...state,
		appName: state.common.appName,
		currentUser: state.common.currentUser
	}
};

const mapDispatchToProps = (dispatch) => ({})

const AppendScript = (currentUser) => {
	if(currentUser && currentUser.role == "1"){
	} else {
		return (
		   '<chat-widget style="--chat-widget-primary-color: #188bf6; --chat-widget-active-color:#188bf6 ;--chat-widget-bubble-color: #188bf6" location-id="18bxfgHNKgzz3Bqhy8CY" prompt-avatar="https://widgets.leadconnectorhq.com/chat-widget/assets/defaultAvatar.png" agency-name="Leads Kept" agency-website=""></chat-widget> <script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" > </script>'
		)

	}

}



const Footer = (props) => {
	const { appName,currentUser } = props;

	const script = document.createElement("div");
	script.className = "div_script";

	script.innerHTML = AppendScript(currentUser);

	if(document.body.querySelector(".div_script") == null){
		document.body.appendChild(script);
	}


	return (
      	<footer className="footer">
      		<Container>
				<Row className="align-items-center">
					<Col lg={12}>
						<div className="links d-flex justify-content-between">
							<p>© Copyright 2023. Woo-Pons. All rights reserved.</p>

							<div className="linksouter">
								<Link to="/customer/privacy-policy">Privacy Policy</Link>
								<Link to="/customer/terms-and-conditions">Terms & Conditions</Link>
								<Link to="/cookie-policy">Cookies Policy</Link>
							</div>
						</div>
					</Col>

				</Row>
			</Container>
			<Helmet>
                <chat-widget style="--chat-widget-primary-color: #188bf6; --chat-widget-active-color:#188bf6 ;--chat-widget-bubble-color: #188bf6" location-id="18bxfgHNKgzz3Bqhy8CY" prompt-avatar="https://widgets.leadconnectorhq.com/chat-widget/assets/defaultAvatar.png" agency-name="Leads Kept" agency-website="">
                </chat-widget> 
                   <script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" > </script>
            </Helmet>
      	</footer>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(Footer);