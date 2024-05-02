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

const Privacy = (props) => {
	const [pageLoaded, setPageLoaded] = useState(true)
	return (
		<Fragment>
			<div className="dashboard-page inner-page details-main-sec">
				<section className="profile-main-sec">
					<Container>
						<div className="mobile-pages">
							<div className="mobile-pages">
							<h3>PRIVACY POLICY</h3>
							<h4>Welcome to WOO-PONS!</h4>
							<p>WOO-PONS is owned and operated by WOO-PONS, LLC.<br />
WOO-PONS values your privacy and the protection of your personal data. This privacy
policy describes what information we collect from you, how we collect it, how we
use it, how we obtain your consent, how long we retain it in our databases and, if
necessary, with whom we share it.<br />
By using the platform, you accept the practices described in this privacy policy. Your
use of the platform is also subject to our terms and conditions. In this privacy policy,
the words "platform" refers to the WOO-PONS App and website together, "we", "us",
"our" and “WOO-PONS” refers to WOO-PONS and "you" and “user" refers to you, the
WOO-PONS user.<br />
This privacy policy may change from time to time. Your continued use of the
platform after we make changes is deemed acceptance of those changes, so please
check the policy periodically for updates. This privacy policy has been prepared and
is maintained in accordance with all applicable national and international laws and
regulations and, in particular, with the data protection regulations of the State of
Massachusetts.</p>

							<div class="number-outer">
								<h4>1. GENERAL INFORMATION</h4>
								<p>Users' personal data collected through:</p>
							<ul>
								<li>WOO-PONS mobile App (Available on Google Play and App Store)</li>
								<li><a href="https://www.getwoopons.com/">https://www.getwoopons.com/</a></li>
								<li><a href="https://www.woo-pons.com/">https://www.woo-pons.com/</a></li>
								<li><a href="https://mywoopons.com/">https://mywoopons.com/</a></li>
							</ul>
							<p>Will be under responsibility and in charge of:</p>
							<ul>
								<li>WOO-PONS, LLC.</li>
								<li>Hello@Woo-Pons.com</li>
								<li>508-422-5858</li>
							</ul>
							<p>(Hereinafter referred to as “WOO-PONS”).</p>
							</div>

							<div class="number-outer">
								<h4>2. TYPES OF INFORMATION GATHERED</h4>
									<p>The information we collect from our users helps us to provide our platform and to
personalize and continually improve the user experience on the platform. These are
the types of information we collect. These are the types of information we collect:<br />
Information You Give Us. You provide information when you provide, search, read
and view content on the platform, purchase a package and/or communicate with us
through our contact information. As a result of those actions, you might supply us
with the following information:</p>
							<ul>
								<li>Name</li>
								<li>Email Address</li>
								<li>Phone number</li>
								<li>Any additional information relating to you that you provide to us directly or
indirectly through our platform or online presence such as ‘cookies’.</li>
							</ul>
							<p>WOO-PONS will not collect any personally identifiable information about you, unless
you provide it.</p>
							<p>Information Collected Automatically: By accessing and using the platform you
automatically provide us with the following information:</p>
								<ul>
									<li>Mobile device ID</li>
									<li>Model and manufacturer</li>
									<li>Operating system</li>
									<li>Version information</li>
									<li>IP address</li>
								</ul>
								<p>Payment Information: Your payment data will be processed by the payment
processors available on this platform (Stripe), which will process and store your data
securely and for the sole purpose of processing the purchase of the packages. WOOPONS reserves the right to contract any payment platform available on the market,
which processes your data for the sole purpose of processing the purchase of the
packages.</p>
								<p>See Stripe's privacy policy here:</p>
								<ul>
									<li><a href="https://stripe.com/en-gb-us/privacy">https://stripe.com/en-gb-us/privacy</a></li>
								</ul>
								<p>GOOGLE Analytics. We use Google Analytics provided by Google, Inc., USA
(“Google”). These tool and technologies collect and analyze certain types of
information, including IP addresses, device and software identifiers, referring and
exit URLs, feature use metrics and statistics, usage and purchase history, media
access control address (MAC Address), mobile unique device identifiers, and other
similar information via the use of cookies. The information generated by Google
Analytics (including your IP address) may be transmitted to and stored by Google on
servers in the United States. We use the GOOGLE Analytics collection of data to
enhance the platform and improve our service.</p>
							<p>Please consult Google's privacy policy here:</p>
							<ul>
								<li><a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></li>
							</ul>
							</div>
							<div class="number-outer">
								<h4>3. HOW LONG WE KEEP YOUR DATA</h4>
								<p>Personal data provided by users through the platform will be retained for the time
necessary to provide the platform and packages. WOO-PONS may retain personal
data for a longer period where the user has given consent to such processing,
provided that such consent is not withdrawn. In addition, WOO-PONS may be obliged
to retain personal data for a longer period if this is necessary for compliance with a
legal obligation or by order of an authority. Once the retention period expires, the
personal data will be deleted. Therefore, the right of access, the right of erasure,
the right of rectification and the right to data portability cannot be asserted once
the retention period has expired.</p>
								<h4>4. HOW WE USE YOUR INFORMATION. </h4>
								<p>In general, we use the information we collect primarily to provide, maintain, protect
and improve our platform. We use personal information collected through our
platform as described below:</p>
								<ul>
									<li>Provide the platform (Available on Google Play and App Store).</li>
									<li>User registration</li>
									<li>Provide 30-day free trial of the packages.</li>
									<li>Provide packages</li>
									<li>Provide coupons through the packages.</li>
									<li>Process monthly payments for packages..</li>
									<li>Provide the functionalities available on the platform.</li>
									<li>Understand and enhance your experience using our platform.</li>
									<li>Respond to your comments or questions through our contact information.</li>
									<li>Send you related information, including confirmations, invoices, technical
notices, updates, security alerts and support and administrative messages.</li>
									<li>Communicate with you about upcoming events, offers and news about WOOPONS.</li>
									<li>Marketing purposes of WOO-PONS.</li>
									<li>Protect, investigate and deter against fraudulent, unauthorized or illegal
activity.</li>
								</ul>
								<h4>5. HOW DO YOU GET MY CONSENT?</h4>
								<p>By visiting the website, purchasing a package, using the coupons available in the
packages, contacting us through our contact information and providing us with
personal information to contact you, you consent to our use of cookies, you consent
to our collection, storage and use of your information on the terms contained in this
privacy policy. You may withdraw your consent by sending us your request via the
contact information or contact page.</p>
							<h4>6. HOW WE SHARE INFORMATION</h4>
							<p>The personal information of our users is an important and fundamental part of our
business. Under no circumstances will we sell or share information with third parties
that has not been previously authorized by the user or owner of the personal data.
We share user information solely and exclusively as described below.<br />
Third-Party Service Providers. We use third-party services to perform certain
functions through our platform. Examples include processing payments (Stripe),
sending emails, analyzing data (Google Analytics), providing marketing assistance and
delivering search results.<br />
These third-party services and tools may have access to personal information needed
to perform their functions, but may not use that information for other purposes.
Information shared with these third-party services will be treated and stored in
accordance with their respective privacy policies and our privacy policy.<br />
SMS text messages. We use SMS text messages to send various types of messages,
such as notifications about our services or special content, such as product and
service offers. By providing your phone number through the use of our services and
website, you agree to these terms and conditions.<br />
By entering your phone number through our contact and registration form, you
consent to receive SMS text notifications from us. Please note that your consent to
receive or not receive these messages is not a condition of any purchase on our
website. Your phone number and name will be shared with the SMS marketing
platform we use. When sending text messages, your phone number will be shared
with our applicable text messaging carrier in order to fulfill the sending and delivery
of text messages.<br />
If you wish to unsubscribe from receiving text messages and marketing notifications,
please respond with a STOP to any SMS message we send you. You understand and
agree that alternative methods of unsubscribing, such as the use of alternative
wording or requests, will not be considered a reasonable means of unsubscribing.
Message and data usage fees may apply.<br />
If you have any questions, you may contact us for more information.
Business Transfers. In the event that WOO-PONS creates, merges with, or is acquired
by another entity, your information will most likely be transferred. WOO-PONS will
email you or place a prominent notice on our platform before your information
becomes subject to another privacy policy.<br />
Protection of WOO-PONS and others. We release personal information when we
believe release is appropriate to comply with the law, enforce or apply our Terms and
conditions and other agreements, or protect the rights, property, or safety of WOOPONS, our users or others. This includes exchanging information with other
companies and organizations for fraud protection and credit risk reduction.<br />
With Your Consent. Other than as set out above, you will receive notice when
personally identifiable information about you might go to third parties, and you will
have an opportunity to choose not to share the information.<br />
Anonymous Information. WOO-PONS uses the anonymous browsing information
collected automatically by our servers primarily to help us administer and improve
the platform. We may also use aggregated anonymous information to provide
information about the platform to potential business partners and other unaffiliated
entities. This information is not personally identifiable.</p>

							<h4>7. PROTECTING YOUR INFORMATION</h4>
							<p>We restrict authorized access to your personal information to those persons who have
a legitimate need to know such information to provide certain functions and to those
persons you have authorized to have access to such information. WOO-PONS follows
generally accepted industry standards for data security to protect the personal
information you provide and share through the platform, both during transmission
and once WOO-PONS receives it. No method of transmission over the Internet, or
method of electronic storage, is 100% secure. Therefore, while WOO-PONS strives to
use commercially acceptable means to protect your personal information, we cannot
guarantee its absolute security. We will not sell, distribute or lease your personal
information to third parties unless we have your permission or are required by law to
do so.</p>
							<h4>8. RIGHTS </h4>
							<p>Users who provide information through our platform, as data subjects and data
owners, have the right to access, rectify, download or delete their information, as
well as to restrict and object to certain processing of their information. While some
of these rights apply generally, others apply only in certain limited circumstances.
We describe these rights below:</p>
							<ul>
								<li>Access and portability: to access and know what information is stored in our servers, you can send us your request through our contact information</li>
								<li>Rectify, Restrict, Limit and/or Delete: You can also rectify, restrict, limit or
delete much of your information.</li>
								<li>Right to be informed: Users of our platform will be informed, upon request,
about what data we collect, how it is used, how long it is retained and whether it
is shared with third parties.</li>
								<li>Object: When we process your information based on our legitimate interests as
explained above, or in the public interest, you may object to this processing in
certain circumstances. In such cases, we will stop processing your information
unless we have compelling legitimate reasons to continue processing it or where
it is necessary for legal reasons.</li>
								<li>Revoke consent: Where you have previously given your consent, such as to allow
us to process and store your personal information, you have the right to revoke
your consent to the processing and storage of your information at any time. For
example, you may withdraw your consent by updating your settings. In certain
cases, we may continue to process your information after you have withdrawn
your consent if we have a legal basis for doing so or if your withdrawal of consent
was limited to certain processing activities.</li>
								<li>Complaint: If you wish to file a complaint about our use of your information (and
without prejudice to any other rights you may have), you have the right to do so
with your local supervisory authority. Users can exercise all these rights by
contacting us through the contact information or the contact page.</li>
									<li>Rights related to automated decision-making, including profiling: Platform
users may request that we provide a copy of the automated processing activities
we conduct if they believe that data is being unlawfully processed.
</li>
								
								</ul>
								<p>Users or owners of the personal information they provide through the platform may
exercise these rights over their personal information at any time and without any
limitation by sending us their request through our contact information.</p>
							<h4>9. CHILDREN’S ONLINE PRIVACY PROTECTION </h4>
							<p>We comply with the requirements of the data protection regulations of the State of
Massachusetts, regarding the protection of personal data of minors. Although the
platform and content are available to all ages, we do not collect any information
from children under the age of 13 without the respective permission of their parents
or legal guardians. If you are aware that a child under the age of 13 has provided us
with personal information without the permission of his or her parent or legal
guardian, please contact us. If we become aware that a minor has provided us with
personal information without the permission of a parent or legal guardian, we will
take steps to delete that information, terminate that person's account, and restrict
access to that person's account.</p>
							<h4>10. THIRD PARTIES</h4>
							<p>Except as otherwise expressly included in this privacy policy, this document
addresses only the use and disclosure of information WOO-PONS collects from you. If
you disclose your information to others, whether other WOO-PONS users or vendors,
different rules may apply to their use or disclosure of the information you disclose to
them. WOO-PONS does not control the privacy policies of third parties, and you are
subject to the privacy policies of those third parties where applicable. WOO-PONS is
not responsible for the privacy or security practices of other platforms, including
those that are linked to from WOO-PONS.</p>
							<h4>11. CONTACT US </h4>
							<p>If you have any questions or concerns about this privacy policy and the processing
and security of your data, please contact us via our contact page or by using the
following contact information:</p>
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
					</div>
				    </Container>
				</section>
			</div>
		</Fragment>
	);
}

export default Privacy;