'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();exports.

























































withStore = withStore;exports.
















































withActions = withActions;exports.




















registryService = registryService;exports.












pushChange = pushChange;exports.




callAction = callAction;exports.




getDataset = getDataset;var _react = require('react');var _react2 = _interopRequireDefault(_react);var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} // data stores
//    [dataType]: []
//    [dataType]: {}
//    [dataType]:  "string/int/bool..."
var globalDataset = {// [dataType]: ,
}; // all listeners
var globalListeners = { // [dataType]: [],  
	pushChange: function pushChange(dataType) {globalListeners[dataType].forEach(function (item) {return item();});} }; // actions
var globalActions = {// [dataType]: {
	// 	acton1: (param) => {
	//	sosomething
	//  pushChange(dataType)
	// 	},
	// },
};var store = { // return 'dataType' store
	getData: function getData(dataType) {return globalDataset[dataType]();}, getActions: function getActions(dataType) {return globalActions[dataType];}, callAction: function callAction(dataType, method) {for (var _len = arguments.length, param = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {param[_key - 2] = arguments[_key];}var _globalActions$dataTy;return (_globalActions$dataTy = globalActions[dataType])[method].apply(_globalActions$dataTy, param);}, addListener: function addListener(dataType, actionFunc) {var list = globalListeners[dataType];var index = list.indexOf(actionFunc);if (index === -1) {return list.push(actionFunc);}return index;}, removeListener: function removeListener(dataType, actionFunc) {var list = globalListeners[dataType];var index = list.indexOf(actionFunc);if (index > -1) {list.splice(index, 1);}} };function withStore(OldComponent, dataType) {var _class, _temp;if (Array.isArray(dataType)) {throw new Error('dataType shouldn\'t be array in withStor');}return _temp = _class = function (_Component) {_inherits(WrapComponent, _Component);function WrapComponent(props) {_classCallCheck(this, WrapComponent);var _this = _possibleConstructorReturn(this, (WrapComponent.__proto__ || Object.getPrototypeOf(WrapComponent)).call(this, props));_this.state = { ds: store.getData(dataType) };_this.dsChang = _this.dsChang.bind(_this);return _this;}_createClass(WrapComponent, [{ key: 'componentWillMount', value: function componentWillMount() {store.addListener(dataType, this.dsChang);} // shouldComponentUpdate(nextProps, nextState) {
			// }
		}, { key: 'componentWillUnmount', value: function componentWillUnmount() {store.removeListener(dataType, this.dsChang);} }, { key: 'dsChang', value: function dsChang() {this.setState({ ds: store.getData(dataType) });} }, { key: 'render', value: function render() {var _props = this.props,children = _props.children,passThroughProps = _objectWithoutProperties(_props, ['children']);return _react2.default.createElement(OldComponent, _extends({ ds: this.state.ds, actions: store.getActions(dataType) }, passThroughProps), children); // return (
				// 	<OldComponent ds={this.state.ds} actions={store.getActions(dataType)} {...passThroughProps}>
				// 		{children}	
				// 	</OldComponent>
				// )
			} }]);return WrapComponent;}(_react.Component), _class.propTypes = { children: _propTypes2.default.node // eslint-disable-line react/require-default-props
	}, _temp;}function withActions(OldComponent, dataType) {var WrapComponent = function WrapComponent(_ref) {var children = _ref.children,passThroughProps = _objectWithoutProperties(_ref, ['children']);return _react2.default.createElement(OldComponent, _extends({ actions: store.getActions(dataType) }, passThroughProps), children);}; // 	<OldComponent actions={
	// 	store.getActions(dataType)
	// } { ...props
	// }
	// />;
	WrapComponent.propTypes = { children: _propTypes2.default.node // eslint-disable-line react/require-default-props
	};return WrapComponent;} // dsfunc :   ()=> ds ; return ds by function call.
function registryService(dataType, dsfunc, actions) {if (globalDataset[dataType] !== undefined || globalActions[dataType] !== undefined || globalListeners[dataType] !== undefined) {throw new Error(dataType + ' had been register.');}globalDataset[dataType] = dsfunc;globalActions[dataType] = actions;globalListeners[dataType] = [];} // normally call in the actions when the ds has been changed.
function pushChange(dataType) {globalListeners.pushChange(dataType);} // Be careful. this function will call action direction. 
function callAction(dataType, method) {var _globalActions$dataTy2;for (var _len2 = arguments.length, param = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {param[_key2 - 2] = arguments[_key2];}return (_globalActions$dataTy2 = globalActions[dataType])[method].apply(_globalActions$dataTy2, param);} // getDataset will return then ds by dataType, just for reading.
function getDataset(dataType) {return globalDataset[dataType];}