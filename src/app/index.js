import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

import './index.css';

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
