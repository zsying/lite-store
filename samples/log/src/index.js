import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { regLogService } from './logservice';
import register from './registerServiceWorker';

regLogService();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
