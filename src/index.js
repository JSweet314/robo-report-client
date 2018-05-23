import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import dotenv from 'dotenv';
import App from './components/App';
import './index.css';

dotenv.config();

ReactDOM.render(
  <Router>
    <App />
  </Router>, 
  document.getElementById('root')
);

registerServiceWorker();
