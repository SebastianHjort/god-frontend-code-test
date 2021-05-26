import React from 'react';
import ReactDOM from 'react-dom';
import { StyleProvider, ThemePicker } from 'vcc-ui';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StyleProvider>
    <ThemePicker variant="light">
      <App />
    </ThemePicker>
  </StyleProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
