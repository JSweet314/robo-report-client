import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import dotenv from 'dotenv';
import App from './components/App';
import './index.css';

dotenv.config();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
