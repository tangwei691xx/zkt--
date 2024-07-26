/**
 * 标签埋点功能
 * 页面级的埋点只执行一次
 * onclick的埋点可以反复执行
 */
// import React from 'react';
const React = require('react');
const trackList = [];
let logpage = (options) => {
	if (trackList.indexOf(options.category) === -1) {
		trackList.push(options.category || 'category');
	}
};

let logevent = (options) => {
	options = zkt.isObject(options) ? options : {};
	zkt.TJ.newlogpv(options)
	console.log('logevent', options);
};

const onMouseEvent = function(callback, logData, event) {
	if (typeof callback === 'function') {
		callback(event);
	}
	logevent(logData);
};

const propsWithEvents = function(type, props) {
	const newProps = Object.assign(props);
	if (!Object.isFrozen(newProps)) {
		newProps.onClick = onMouseEvent.bind(null, props.onClick, props.logclick);
		if (typeof Object.freeze === 'function') {
			Object.freeze(newProps);
		}
	}
	return newProps;
};

const autoTrack = {
	init: (config) => {
		if (config.pageCallback) {
			let orginLogpage = logpage;
			logpage = function() {
				orginLogpage.apply(this, arguments);
				config.pageCallback.apply(this, arguments);
			}
		}
		if (config.eventCallback) {
			logevent = config.eventCallback;
		}
		const originCreateElement = React.createElement;
		React.createElement = function(...args) {
			const type = args[0];
			const props = args[1] || {};
			const newArgs = args;
			if (props.logpage) {
				logpage(props.logpage);
			}
			if (props.onClick && props.logclick) {
				console.log('------logevent', JSON.stringify(props))
				let logclick = {
					bt: 'click'
				}
				props.logclick = Object.assign(logclick, props.logclick || {});
				newArgs[1] = propsWithEvents(type, props || {});
			}

			return originCreateElement.apply(null, newArgs);
		};
	}
};

module.exports  = autoTrack;