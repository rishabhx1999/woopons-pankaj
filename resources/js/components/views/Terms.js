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

const Terms = (props) => {
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
							<p>WOO-PONS is owned and operated by WOO-PONS, LLC.</p>
							<p>These are the terms and conditions for: </p>
							<ul>
								<li>WOO-PONS mobile App (Available on Google Play and App Store)</li>
								<li><a href="https://www.getwoopons.com/">https://www.getwoopons.com/</a></li>
								<li><a href="https://www.woo-pons.com/">https://www.woo-pons.com/</a></li>
								<li><a href="https://mywoopons.com/">https://mywoopons.com/</a></li>
							</ul>
							<p>By using the platform, you agree to be bound by these terms and conditions and our
privacy policy. In these terms and conditions, the words "platform" refers to the WOOPONS App and website together, "we", "us", "our" and “WOO-PONS” refers to WOO-PONS
and "you" and “user" refers to you, the WOO-PONS user.<br />
The following terms and conditions apply to your use of the platform. This includes the
mobile and tablet versions, as well as any other versions of WOO-PONS accessible via
desktop, mobile, tablet, social media or other devices.<br />
PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING, POSTING
INFORMATION ON, OR OBTAINING ANY SERVICES FROM THE PLATFORM.</p>

							<div class="number-outer">
								<h4>1. ACCEPTANCE OF TERMS</h4>
								<p>This agreement sets forth the legally binding terms for your use of WOO-PONS. By
registering and using the platform, you agree to be bound by this agreement. If you do
not agree to the terms of this agreement, you must not use the platform and stop using
the service immediately. We may modify this agreement from time to time, and such
modification will be effective when posted on the platform. You agree to be bound by
any modifications to these terms and conditions when you use WOO-PONS after such
modification is posted; therefore, it is important that you review this agreement
regularly.<br />
Use of the platform is prohibited for children under the age of 13. In the case of children
under 18 and over 13, it is the responsibility of parents and legal guardians to determine
whether use of the platform or any of the content and functionality available on the
platform is appropriate for their child or minor in custody.<br />
You represent and warrant that all registration information you submit is accurate and
truthful; and that your use of the platform does not violate any applicable law or
regulation. WOO-PONS may, in its sole discretion, refuse to offer services to any user
and change its eligibility criteria at any time. This provision is void where prohibited by
law and the right to access the service and the platform is revoked in such jurisdictions.<br />
By using the platform, you represent and warrant that you have full right, power and
authority to enter into this agreement and to fully perform all of your obligations
hereunder. You further represent and warrant that you have no legal incapacity or
contractual restriction that would prevent you from entering into this agreement.</p>
							</div>

							<div class="number-outer">
								<h4>2. NOTIFICATIONS </h4>
									<p>By providing WOO-PONS with your email address, you agree that we may use your email
address to send you notifications about WOO-PONS. We may also use your email address
to send you notifications and other messages, such as changes to service features, news
and special content. If you do not wish to receive these emails, you may opt-out of
receiving them by submitting your removal request through the contact information or
by using the "unsubscribe" option in the emails. Opting out may prevent you from
receiving notifications and mailings about updates, news or special content.</p>
								
							</div>
							<div class="number-outer">
								<h4>3. COUPONS AND PACKAGES</h4>
								<p>Through the monthly payment packages, the user will be able to access coupons with
offers to be redeemed at local businesses throughout Worcester County, Massachusetts.
Through the coupons, local businesses throughout Worcester County offer deals,
discounts and incentives for users who purchase the packages on the platform.</p>
								<p>WOO-PONS offers the following monthly payment packages:</p>
								
								<ul>
									<li>Silver & Gold (Users)</li>
									<li>Bronze & Platinum (Business owners)</li>
								</ul>
								<p>The Silver package includes one coupon (Woo-Pon) per week and the Gold package
includes unlimited coupons per week.<br />
The user can access a 30-day free trial before upgrading to any paid package. The user
can cancel the free trial at any time before moving to a paid package. When a user
purchases a package, WOO-PONS will send a confirmation email. This confirmation email
will occur automatically so that the user has confirmation of the payment and the start
of the package. If the user does not receive the email confirmation of the purchase and
the start of the package, it is possible that it has been sent to your spam folder.<br />
WOO-PONS may change or discontinue the availability of packages at any time at its sole
discretion. If a package purchase is cancelled, the payment made for the package will
be refunded in the applicable billing period. This does not affect your statutory rights.<br />
Packages include automatic recurring payments. You authorize WOO-PONS to renew your
package and to charge you monthly on each billing date (every 30 days). The billing date
of the package is the date on which you purchase the package and make the first
payment. On the applicable billing date, you will automatically be charged the
applicable package rate. The package will remain active until you cancel it or we
terminate it. You must cancel the package before it renews to avoid the next billing
period. We will bill you for the package billing fee in the payment method you choose
during registration and package purchase.<br />
Packages will automatically renew for an additional billing period unless cancelled prior
to the next billing period. Users may cancel the package through the user account
settings in the billing section or by submitting a cancellation request through our contact
information and the package will be cancelled for the next billing period. If a package is
cancelled, the user will be able to continue to use the payment features of the package
until the next billing period, at which time the package and access to the payment
features of the platform will be cancelled.</p>

							<h4>4. PAYMENTS</h4>
							<p>Packages can be paid through the following payment methods: </p>
							<ul>
								<li>Credit/debit card (Visa, Master, Discover, Amex, Diners, etc.)</li>
							</ul>
							<p>Package payment will be processed through our payment processor Stripe. The package
payment will be charged to your credit/debit card immediately after completing the
payment process for the corresponding package after the free trial period is over. The
package will be activated upon completion of the payment process and will be charged
on each billing date automatically. Once the transaction is processed, we will send an
electronic receipt to the user's email address.<br />
If you find any inconsistencies in your billing, please contact us via our contact details or
you can make a complaint via the customer service of the relevant payment processor.<br />
If your card is declined, you will receive an error message. No payment will be charged
to your card and no order will be processed. There may be a pending transaction on your
account until your card issuing bank withdraws the authorization. This usually takes 2 to
5 working days. Your card may be declined for a number of reasons, such as insufficient
funds, AVS (Address Verification System) mismatch or you have entered an incorrect
security code.<br />
If your payment is declined, you will need to provide an alternative payment method or
provide another card on which the payment can be charged and processed.<br />
Your payment details will be treated and retained securely and for the sole purpose of
processing the purchase of the packages. WOO-PONS reserves the right to engage any
payment platform available on the market, which processes your data for the sole
purpose of processing the purchase of the packages.</p>
							<h4>5. DISCLAIMER </h4>
							<p>The products and services, including offers, discounts or any incentives contained in the
coupons are not offered or provided by WOO-PONS. WOO-PONS services are limited to
providing the platform to facilitate access to such coupons through payment packages.
The products and services contained in the coupons are provided exclusively by local
businesses that offer such product offerings and services through the coupon. WOO-PONS
is not responsible at any time for the products and services or offers contained in the
coupons available through our packages. WOO-PONS is not responsible for the accuracy,
safety, quality or legality of the products, services or offers contained in the coupons
available through our packages. In the event that one or more users or any third party
initiates any claim or legal action against WOO-PONS or any third party, each and every
one of the users involved in such claims or actions exempt WOO-PONS from any liability.</p>
							<h4>6. LICENSE TO USE THE PLATFORM</h4>
								<p>WOO-PONS grants you a personal, worldwide, royalty-free, non-assignable and nonexclusive license to use the platform. This license is for the sole purpose of allowing you
to use and enjoy the functionalities available on the platform, including access to
discount coupons according to the package selected by the user. You may not copy,
modify, distribute, sell or lease any part of the platform or the software contained
therein, nor may you reverse engineer or attempt to extract the source code of such
software, unless such restrictions are prohibited by law, or you have our written
permission.<br />
The user agrees not to use the platform negligently, for fraudulent purposes or in an
unlawful manner. Likewise, the user agrees not to partake in any conduct or action that
could damage the image, interests, or rights of the WOO-PONS platform or third parties.<br />
WOO-PONS reserves the right to terminate your access immediately, with or without
notice, and without liability to you, if WOO-PONS believes that you have violated any of
these terms or interfered with the use of the platform or service by others.</p>
							<h4>7. COPYRIGHT</h4>
							<p>All WOO-PONS materials, including, without limitation, names, logos, trademarks,
images, text, columns, graphics, videos, photographs, illustrations, software and other
items, are protected by copyrights, trademarks and/or other intellectual property rights
owned and controlled by WOO-PONS or by third parties who have licensed or provided
their material to the platform. You acknowledge and agree that all WOO-PONS Materials
are made available for your limited, non-commercial, personal use. Except as
specifically provided herein. No material may be copied, reproduced, republished, sold,
downloaded, posted, transmitted or distributed in any way, or otherwise used for any
purpose, by any person or entity, without the prior express permission of WOO-PONS.
You may not add to, delete, distort or otherwise modify the material. Any unauthorized
attempt to modify any material, to defeat or circumvent any security feature, or to use
WOO-PONS or any portion of the material for any purpose other than its intended
purpose is strictly prohibited.</p>
							<h4>8. COPYRIGHT INFRINGEMENT </h4>
							<p>WOO-PONS will respond to all inquiries, complaints and claims regarding alleged
infringement for failure to comply with or violation of the provisions contained in the
Digital Millennium Copyright Act (DMCA). WOO-PONS respects the intellectual property
of others, and expects users to do the same. If you believe, in good faith, that any
material provided on or in connection with the website infringes your copyright or other
intellectual property right, please send us your copyright infringement request pursuant
to Section 512 of the Digital Millennium Copyright Act (DMCA), via our contact
information, with the following information: </p>
								<ul>
									<li>Identification of the intellectual property right that is allegedly infringed. All relevant registration numbers or a statement of ownership of the work should be included.</li>
									<li>A statement that specifically identifies the location of the infringing material, in
sufficient detail so that WOO-PONS can find it on the platform. </li>
									<li>Your name, address, telephone number and email address.</li>
									<li>A statement by you that you have a good faith belief that use of the allegedly
									infringing material is not authorized by the copyright owner, or its agents, or the
									law.</li>
									<li>A statement by you, made under penalty of perjury, that the information in your
notice is accurate and that you are the copyright owner or authorized to act on
the copyright owner's behalf.</li>
								<li>An electronic or physical signature of the copyright owner or the person
authorized to act on the copyright owner's behalf.</li>
								</ul>
								<h4>9. PERSONAL INFORMATION</h4>
								<p>Any personal information you provide in connection with your use of the platform will be
used in accordance with our privacy policy. Please refer to our privacy policy.</p>
							<h4>10. PROHIBITED ACTIVITIES</h4>
							<p>The content and information available on the platform (including, but not limited to,
data, information, text, music, sound, photos, graphics, video, maps, icons or other
material), as well as the infrastructure used to provide such content and information, is
owned by WOO-PONS or licensed to WOO-PONS by third parties. For all content other
than your own, you agree not to modify, copy, distribute, transmit, transmit, display,
perform, reproduce, publish, license, create derivative works from, transfer, or sell or
resell any information, software or services obtained from or through the platform. In
addition, the following activities are prohibited:</p>
							<ul>
								<li>Using the services or content for any commercial purpose, outside the scope of
the commercial purposes explicitly permitted in this agreement and related
guidelines made available by WOO-PONS.</li>
								<li>Access, monitor, reproduce, distribute, transmit, broadcast, stream, display, sell,
license, copy or otherwise exploit any content of the services, including, but not
limited to, the use of any robot, spider, scraper or other automated means or any
manual process for any purpose not in accordance with this agreement or without
our express written permission.</li>
								<li>Violate the restrictions of any robot exclusion header on the services or
circumvent or circumvent other measures employed to prevent or limit access to
the platform.</li>
								<li>Take any action that imposes, or may impose, in our discretion, an unreasonable
or disproportionately large load on our infrastructure.</li>
								<li>Establish a deep link to any part of the platform for any purpose without our
express written permission.</li>
								<li>Attempt to modify, translate, adapt, edit, decompile, disassemble or reverse
engineer any software used by WOO-PONS.</li>
								<li>Circumvent, disable or otherwise interfere with security-related features of the
platform or features that prevent or restrict the use or copying of any content.</li>
							</ul>
							<h4>11. DISCLAIMER OF WARRANTIES </h4>
							<p>Due to the nature of the Internet, WOO-PONS provides and maintains the platform on an
"as is," "as available" basis and does not promise that use of the platform will be
uninterrupted or error-free. We are not liable to you if we are unable to provide our
Internet services for any reason beyond our control.<br />
Our platform may occasionally contain links to other websites that are not under our
control or maintained by us. These links are provided solely for your convenience and we
are not responsible for the content of those websites.<br />
Except as provided above, we cannot provide any other warranties, conditions or other
terms, express or implied, statutory or otherwise, and all such terms are hereby
excluded to the fullest extent permitted by law.<br />
You shall be liable for any breach of these terms by you and, if you use the platform in
breach of these terms, you shall be liable for and shall reimburse WOO-PONS for any loss
or damage caused as a result.<br />
WOO-PONS shall not be liable for any amount for breach of any obligation under this
agreement if such breach is caused by the occurrence of any unforeseen event beyond
its reasonable control, including, without limitation, Internet outages, communications
outages, fire, flood, war or uncontrollable events of nature.<br />
These conditions do not affect your statutory rights as a consumer, which are available
to you.<br />
Subject to the foregoing, and to the maximum extent permitted by law, WOO-PONS
excludes liability for any loss or damage of any kind whatsoever arising, including
without limitation any direct, indirect or consequential loss, whether or not arising out
of any problem which you notify WOO-PONS of, and WOO-PONS shall have no liability to
pay any money by way of compensation, including without limitation any liability in
relation to:</p>
							<ul>
								<li>Any incorrect or inaccurate information on the platform</li>
								<li>Infringement by any person of any Intellectual Property Rights of any third party
caused by your use of the platform.
</li>
								<li>Any loss or damage resulting from your use of or inability to use the platform or
resulting from unauthorized access to or alteration of your transmissions or data
in circumstances beyond our control.</li>
								<li>Any loss of profits, wasted expenditure, corruption or destruction of data or any
other loss that does not arise directly from something we have done wrong.</li>
								<li>Any amount or kind of loss or damage due to viruses or other malicious software
that may infect a user's computer equipment, software, data or other property
caused by persons accessing or using content on the platform or by transmissions
through e-mails or attachments received from WOO-PONS</li>
								<li>All representations, warranties, conditions and other terms that would, but for
this notice, be in effect.</li>
							</ul>
							<h4>12. ELECTRONIC COMMUNICATIONS</h4>
							<p>WOO-PONS will not accept any liability for failed, partial or garbled computer
transmissions, for any breakdown, failure, connection or availability of computer,
telephone, network, electronic or Internet hardware or software, for the acts or
omissions of any user, for the accessibility or availability of the Internet or for traffic
congestion or for any unauthorized human act, including any error or mistake.</p>
<h4>13. THIRD PARTIES</h4>
<p>Through your use of the platform and services you may encounter links to third party
sites or be able to interact with third party sites. These third parties may charge a fee
for the use of certain content or services provided on or through their websites.
Therefore, you should investigate as you deem necessary or appropriate before
proceeding with any transaction with any third party to determine whether a fee will be
incurred. Where WOO-PONS provides details of fees or charges for such third-party
content or services, such information is provided for convenience and information
purposes only. Any interaction with third party sites and applications is at your own risk.
You expressly acknowledge and agree that WOO-PONS is in no way responsible for such
third-party websites.</p>
<h4>14. INDEMNIFICATION</h4>
<p>You agree to defend and indemnify WOO-PONS from and against any claims, causes of
action, demands, recoveries, losses, damages, fines, penalties or other costs or
expenses of any kind or nature, including, but not limited to, reasonable legal and
accounting fees, brought by third parties as a result of:</p>
<ul>
								<li>Your breach of this agreement or the documents referenced herein</li>
								<li>Your violation of any law or the rights of a third party.</li>
								<li>Your use of the WOO-PONS platform and packages.</li>
							</ul>
							<h4>15. CHANGES AND TERMINATION</h4>
							<p>We may change the platform and these terms at any time, at our sole discretion and
without notice. You are responsible for keeping yourself informed of these terms. Your
continued use of the platform constitutes your acceptance of any changes to these
terms and any changes will supersede all previous versions of the terms. Unless
otherwise specified, all changes to these terms apply to all users. In addition, we may
terminate our agreement with you under these terms at any time by notifying you in
writing (including by email) or without notice.</p>
<h4>16. ASSIGNMENT</h4>
<p>This agreement and any rights and licenses granted hereunder may not be transferred or
assigned by you, but may be assigned by WOO-PONS without restriction.
</p>
<h4>17. INTEGRATION CLAUSE</h4>
<p>This agreement, together with the privacy policy and any other legal notices posted by
WOO-PONS, shall constitute the entire agreement between you and WOO-PONS and shall
govern your use of the platform.</p>
<h4>18. DISPUTES</h4>
<p>You agree that any dispute, claim or controversy arising out of or relating to these terms
and conditions, or the breach, termination, enforcement, interpretation or validity
thereof or the use of the platform, shall be resolved by binding arbitration between you
and WOO-PONS, provided that each party retains the right to bring an individual action
in a court of competent jurisdiction.<br />
In the event a dispute arises in connection with your use of the platform or breach of
these terms and conditions, the parties agree to submit their dispute to arbitration
resolution before a reputable arbitration organization as mutually agreed by the parties
and in accordance with applicable commercial arbitration rules.<br />
You agree to initiate a formal dispute proceeding by sending us a communication through
our contact information. WOO-PONS may choose to send you a written offer after
receiving your initial communication. If we offer and send you a settlement offer and
you do not accept the offer, or we are unable to resolve your dispute satisfactorily and
you wish to continue the dispute process, you must initiate the dispute resolution
process before an accredited arbitration organization and file a separate Demand for
Arbitration. Any award rendered by the arbitration tribunal shall be final and conclusive
on the parties.<br />
To the fullest extent permitted by law, you agree that you will not file, join or
participate in any class action lawsuit in connection with any claim, dispute or
controversy that may arise in connection with your use of the platform.<br />
The courts of the United States, specifically the courts located in the State of
Massachusetts, shall have jurisdiction over any dispute, controversy or claim relating to
WOO-PONS and its business operations. Any such dispute or controversy shall be brought
and resolved in the courts of the United States, specifically the courts located in the
State of Massachusetts.</p>
<h4>19. FINAL PROVISIONS</h4>
<p>These terms and conditions are governed by the laws of the United States. Use of the
platform is unauthorized in any jurisdiction that does not give effect to all provisions of
these terms and conditions.<br />
Our compliance with these terms is subject to existing laws and legal process, and
nothing contained in these terms limits our right to comply with law enforcement or
other governmental or legal requests or requirements relating to your use of our
platform or information provided to or collected by us in connection with such use.<br />
If any section of these terms is held invalid, illegal or unenforceable, the validity,
legality and enforceability of the remaining provisions shall not in any way be affected
or impaired. Our failure to enforce or delay in enforcing any provision of these terms at
any time does not waive our right to enforce the same or any other provision in the
future.<br />
Any rights not expressly granted herein are reserved.</p>
<h4>20. CONTACT INFORMATION</h4>
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
					</div>
				    </Container>
				</section>
			</div>
		</Fragment>
	);
}

export default Terms;