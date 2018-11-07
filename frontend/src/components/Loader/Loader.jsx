import './Loader.scss';
import React from 'react';
var loaderGif = require('../../assets/images/loader.gif');

const Loader = (props) => (
	<img id='app-loader' src={loaderGif} alt='loader' />
);

export default Loader;