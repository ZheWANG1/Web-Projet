import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import NavigationPannel from './components/NavigationPannel';
import Homepage from './components/Homepage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink

} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>

        <Router>
          <App />
        </Router>
 





  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
