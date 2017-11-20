import React, {
	Component
} from 'react'

// data stores
//    [dataType]: []
//    [dataType]: {}
//    [dataType]:  "string/int/bool..."
let globalDataset = {
	// [dataType]: ,
};

// all listeners
let globalListeners = {
	// [dataType]: [],  
	pushChange: (dataType) => {
		globalListeners[dataType].forEach(item => item());
	}
};

// actions
let globalActions = {
	// [dataType]: {
	// 	acton1: (param) => {
	//	sosomething
	//  pushChange(dataType)
	// 	},
	// },
};

const store = {
	// return 'dataType' store
	getData: function(dataType) {
		return globalDataset[dataType]();
	},

	getActions: function (dataType) {
		return globalActions[dataType];
	},
	callAction: function (dataType, method, ...param) {
		return globalActions[dataType][method](...param);
	},
	addListener: function(dataType, actionFunc) {
		let list = globalListeners[dataType];
		let index = list.indexOf(actionFunc);
		if(index === -1) {
			return list.push(actionFunc);
		}
		return index;
	},
	removeListener: function(dataType, actionFunc) {
		let list = globalListeners[dataType];
		let index = list.indexOf(actionFunc);
		if(index > -1) {
			list.splice(index, 1);
		}
	},
};

export function withStore(OldComponent, dataType) {
	if (Array.isArray(dataType)) {
		throw new Error(`dataType shouldn't be array in withStor`);
	}
	return class WrapComponent extends Component {
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
		componentWillUnmount() {
			store.removeListener(dataType, this.dsChang)
		}
		dsChang() {
			this.setState({
				ds: store.getData(dataType)
			});
		}
		render() {
			// let { children, ...passThroughProps } = this.props;
			return <OldComponent ds={this.state.ds} actions={store.getActions(dataType)} {...this.props} />
		}
	}
}

export function withActions(OldComponent, dataType) {
	let WrapComponent = (props) => <OldComponent actions={store.getActions(dataType)} {...props} />;
	return WrapComponent;
}

// dsfunc :   ()=> ds ; return ds by function call.
export function registryService(dataType, dsfunc, actions) {
if(globalDataset[dataType] !== undefined || globalActions[dataType] !== undefined || globalListeners[dataType] !== undefined) {
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


// export function getData(dataType) {
// 	return globalDataset[dataType];
// }
