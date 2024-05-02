import React from 'react';
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';

export const FOOTER_LINKS = [
	{
		id: "2",
      	name: "Terms & Conditions",
		link: "/features",
		icon: ""
	},
	{
		id: "3",
      	name: "Privacy Policy",
		link: "/prices",
		icon: ""
	},
	{
		id: "4",
      	name: "Disclaimer",
		link: "/contact-us",
		icon: ""
	}
];

export const FOOTER_ICONS = [
	{
		id: "1",
      	name: "Facebook",
		link: "https://www.facebook.com",
		icon: <BsFacebook />,
		class: "facebook-icon"
	},
	{
		id: "2",
      	name: "Twitter",
		link: "https://twitter.com",
		icon: <BsTwitter />,
		class: "twitter-icon"
	},
	{
		id: "3",
      	name: "Insta",
		link: "https://www.instagram.com",
		icon: <BsInstagram />,
		class: "insta-icon"
	}
];