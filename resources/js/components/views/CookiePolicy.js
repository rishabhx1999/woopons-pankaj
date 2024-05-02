import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../assets/images/avtar.jpg";
import googlepay from "../../assets/images/google-pay.png";
import appstore from "../../assets/images/app-store.png";
import hand from "../../assets/images/hand.png";
import Loader from "../Loader";

import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate, Link } from "react-router-dom";

const CookiePolicy = (props) => {
	const [pageLoaded, setPageLoaded] = useState(true)
	return (
		<Fragment>
			<div className="dashboard-page inner-page details-main-sec">
				<section className="profile-main-sec">
					<Container>
						<div className="mobile-pages">
							<h3>COOKIE POLICY</h3>
							<h4>Welcome to WOO-PONS!</h4>
							<p>WOO-PONS is owned and operated by WOO-PONS, LLC.</p>
							<p>This cookie policy explains how and why cookies and other similar technologies may be stored on and accessed from your device when you use or visit:</p>
							<ul>
								<li><a href="https://www.getwoopons.com/">https://www.getwoopons.com/</a></li>
								<li><a href="https://www.woo-pons.com/">https://www.woo-pons.com/</a></li>
								<li><a href="https://mywoopons.com/">https://mywoopons.com/</a></li>
							</ul>
							<p>(Hereinafter referred to as “WOO-PONS”).</p>
							<p>The information collected through cookies will be under responsibility and in charge of:</p>
							<ul>
								<li>WOO-PONS, LLC. </li>
								<li><a href="#">Hello@Woo-Pons.com</a></li>
								<li>508-422-5858</li>
							</ul>
							<p>This cookie policy should be read together with our privacy policy and our terms and conditions.</p>
							<p>By using the website, you accept the use of cookies by WOO-PONS, in the terms contained in this policy.</p>

							<div class="number-outer">
								<h4>1. WHAT ARE COOKIES?</h4>
								<p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember if you have been to the website before. Cookies are a very common web technology; most websites use cookies and have done so for years. Cookies are widely used to make the website work more efficiently. Cookies are used to measure which parts of the website users visit and to personalize their experience. Cookies also provide information that helps us monitor and improve the performance of the website.</p>

								<h4>2. REFUSING OR WITHDRAWING CONSENT TO THE USE OF COOKIES</h4>
								<p>If you do not want cookies to be dropped on your device, you can adjust the setting of
your Internet browser to reject the setting of all or some cookies and to alert you when
a cookie is placed on your device. For further information about how to do so, please
refer to your browser ‘help’, ‘tool’, or ‘edit’ section. Please note that if you use your
browser settings to block all cookies, including strictly necessary cookies, you may not
be able to access or use all or parts of the functionalities of the website.<br />
If you want to remove previously-stored cookies, you can manually delete the cookies at
any time. However, this will not prevent the website from placing further cookies on
your device unless and until you adjust your Internet browser setting as described above.</p>

							<p>We provide the links for the management and blocking of cookies depending on the browser you use:</p>
							<ul>
								<li>Microsoft Edge: <a href="https://support.microsoft.com/en-us/office/delete-cookies-inmicrosoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09?ui=en-us&rs=enus&ad=us">https://support.microsoft.com/en-us/office/delete-cookies-inmicrosoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09?ui=en-us&rs=enus&ad=us</a> </li>
								<li>Firefox: <a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-datafirefox">https://support.mozilla.org/en-US/kb/clear-cookies-and-site-datafirefox</a></li>
								<li>Chrome: <a href="https://support.google.com/chrome/answer/95647?hl=en">https://support.google.com/chrome/answer/95647?hl=en</a></li>
								<li>Safari: <a href="https://support.apple.com/guide/safari/manage-cookies-and-websitedata-sfri11471/mac">https://support.apple.com/guide/safari/manage-cookies-and-websitedata-sfri11471/mac</a></li>
							</ul>
							<p>In cases where you access the website through an iOS or Android mobile device, please follow the instructions below to delete or block cookies on your device:</p>
							<ul>
								<li>Android: <a href="https://support.google.com/answer/32050">https://support.google.com/answer/32050</a> </li>
								<li>iOS: <a href="https://support.apple.com/en-us/HT201265">https://support.apple.com/en-us/HT201265</a></li>
							</ul>
							</div>

							<div class="number-outer">
								<h4>3. FIRST-PARTY COOKIES</h4>
								<p>We use cookies to enhance the performance of our website and personalize your online
								experience. Cookies help us to collect information on how people use our website and
								which pages they visit. They enable us to monitor the number of visitors and to analyze
								website usage patterns and trends. We collect this information anonymously, so it does
								not identify anyone as an individual and no personal information is stored in our cookies.
								We always use cookie data in a responsible way.</p>
							<h4>4. THIRD-PARTY COOKIES</h4>
							<p>Third-party cookies may come from partners or third-party companies that provide
							functional web services or tools for our website and the optimal functioning and
							operation of our services. We use third party cookies responsibly and for the sole
							purpose of providing optimal functioning of the platform and services. You may opt out
							of these cookies by following the cookie removal information contained in this document
							or the technical information of the browser from which you access our website and
							services.</p>
							<h4>5. COOKIES WE USE</h4>
							<p>We use the following cookies on our website:</p>
							<table>
								<tr>
									<th>Cookie</th>
									<th>Domain</th>
									<th>Description</th>
									<th>Duration</th>
									<th>Type</th>
								</tr>
								<tr>
									<td>JSESSIONID</td>
									<td>tracker.metricool.com</td>
									<td>The JSESSIONID cookie is used by New Relic to store a session identifier so that New Relic can monitor session counts for an application.</td>
									<td>session</td>
									<td>Necessary</td>
								</tr>
								<tr>
									<td>msgsndr_id</td>
									<td>www.getwoopons.com</td>
									<td>No description</td>
									<td>1 year</td>
									<td>Other</td>
								</tr>
								<tr>
									<td>_acu</td>
									<td>.getwoopons.com</td>
									<td>No description</td>
									<td>5 months 27 days</td>
									<td>Other</td>
								</tr>
							</table>
							</div>
							<div class="number-outer">
								<h4>6. PURPOSES OF OUR COOKIES</h4>
								<p>Our cookies are used for the following purposes:</p>
								<p>Strictly Necessary: These cookies are essential for the website to perform its basic functions.</p>
								<p>Security: We use these cookies to help identify and prevent potential security risks</p>
								<p>Analytics and Performance: Performance cookies collect information on how users
interact with our website, including what pages are visited most, as well as other
analytical data. We use these details to improve how our website functions and to
understand how users interact with them.</p>
								<p>GOOGLE Analytics. We use Google Analytics provided by Google, Inc., USA (“Google”).
These tool and technologies collect and analyze certain types of information, including
IP addresses, device and software identifiers, referring and exit URLs, feature use
metrics and statistics, usage and purchase history, media access control address (MAC
Address), mobile unique device identifiers, and other similar information via the use of
cookies. The information generated by Google Analytics (including your IP address) may
be transmitted to and stored by Google on servers in the United States. We use the
GOOGLE Analytics collection of data to enhance the website and platform and improve
our service.</p>
								<h4>7. CONTACT US</h4>
								<p>If you have questions or concerns about this cookie policy and the handling and security
of your data, please contact us through our contact form or via the contact information
below:</p>
								<p>WOO-PONS, LLC</p>
								<p>#1080<br />
								571 Boston Turnpike STE 3<br />
								Shrewsbury, MA 01545 </p>
								<p>
									Email: Hello@Woo-Pons.com<br />
									Phone: 508-422-5858
								</p>
							</div>
						</div>
				    </Container>
				</section>
			</div>
		</Fragment>
	);
}

export default CookiePolicy;