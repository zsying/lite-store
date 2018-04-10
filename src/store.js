import React, {
	Component
} from 'react'
import PropTypes from 'prop-types'

// data stores
//    [dataType]: []
//    [dataType]: {}
//    [dataType]:  "string/int/bool..."
const globalDataset = {
	// [dataType]: ,
};

// all listeners
const globalListeners = {
	// [dataType]: [],  
	pushChange: (dataType) => {
		globalListeners[dataType].forEach(item => item());
	}
};

// actions
const globalActions = {
	// [dataType]: {
	// 	acton1: (param) => {
	//	sosomething
	//  pushChange(dataType)
	// 	},
	// },
};

const store = {
	// return 'dataType' store
	getData: (dataType) => {
		const f = globalDataset[dataType]
		if (typeof f !== 'function') {
			throw new Error(`cannot find ${dataType}'s datasource`)
		}
		return f()
	},

	getActions: (dataType) => {
		const o = globalActions[dataType]
		if (typeof o !== 'object') {
			throw new Error(`cannot find ${dataType}'s actions`)			
		}
		return 0
	},

	callAction: (dataType, method, ...param) =>
		globalActions[dataType][method](...param),

	addListener: (dataType, actionFunc) => {
		const list = globalListeners[dataType];
		const index = list.indexOf(actionFunc);
		if (index === -1) {
			return list.push(actionFunc);
		}
		return index;
	},

	removeListener: (dataType, actionFunc) => {
		const list = globalListeners[dataType];
		const index = list.indexOf(actionFunc);
		if (index > -1) {
			list.splice(index, 1);
		}
	},
};

export function withStore(OldComponent, dataType) {
	if (Array.isArray(dataType)) {
		throw new Error(`dataType shouldn't be array in withStor`);
	}
	return class WrapComponent extends Component {
		static propTypes = {
			children: PropTypes.node, // eslint-disable-line react/require-default-props
		};

		constructor(props) {
			super(props);
			this.state = {
				ds: store.getData(dataType),
			};
			this.dsChang = this.dsChang.bind(this);
		}
		componentWillMount() {
			store.addListener(dataType, this.dsChang)
		}
		// shouldComponentUpdate(nextProps, nextState) {

		// }
		componentWillUnmount() {
			store.removeListener(dataType, this.dsChang)
		}
		dsChang() {
			this.setState({
				ds: store.getData(dataType)
			});
		}
		render() {
			const {
				children,
				...passThroughProps
			} = this.props;
			return React.createElement(OldComponent, {
				ds: this.state.ds,
				actions: store.getActions(dataType),
				...passThroughProps
			}, children)
			// return (
			// 	<OldComponent ds={this.state.ds} actions={store.getActions(dataType)} {...passThroughProps}>
			// 		{children}	
			// 	</OldComponent>
			// )
		}
	}
}

export function withActions(OldComponent, dataType) {
	const WrapComponent = ({
			children,
			...passThroughProps
		}) => React.createElement(
			OldComponent, {
				actions: store.getActions(dataType),
				...passThroughProps
			}, children);
	// 	<OldComponent actions={
	// 	store.getActions(dataType)
	// } { ...props
	// }
	// />;
	WrapComponent.propTypes = {
		children: PropTypes.node, // eslint-disable-line react/require-default-props
	}
	return WrapComponent;
}

// dsfunc :   ()=> ds ; return ds by function call.
export function registryService(dataType, dsfunc, actions) {
	if (globalDataset[dataType] !== undefined ||
		globalActions[dataType] !== undefined ||
		globalListeners[dataType] !== undefined) {
		throw new Error(`${dataType} had been register.`);
	}

	globalDataset[dataType] = dsfunc;
	globalActions[dataType] = actions;
	globalListeners[dataType] = [];
}

// normally call in the actions when the ds has been changed.
export function pushChange(dataType) {
	globalListeners.pushChange(dataType);
}

// Be careful. this function will call action direction. 
export function callAction(dataType, method, ...param) {
	return globalActions[dataType][method](...param);
}

// getDataset will return then ds by dataType, just for reading.
export function getDataset(dataType) {
	return store.getData(dataType)
	// return globalDataset[dataType];
}