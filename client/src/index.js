import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <Router>
        <App />
    </Router>
), document.getElementById('root'));

/*
create-react-app auto creates a service worker. Unfortunately, at this moment in time, we can not make changes to
the pre-built service worker. There are three ways to make a custum service worker with react.js

1. Use a bundeler with a custom config such as webpack (time consuming)
2. Eject the create-react-app by running `npm run eject` after initially creating the app. The end result is similar to #1. (takes advanced knowledge of
create react app tool).
3. By using the sw-precache command line library (made by Google) to overried the generated service worker. It's less advance but quicker to understand and use.

I use option 3. 
In package.json, I altered the `npm run build` command to generate the custum service worker once the build process is complete.

I did NOT alter the ./serviceWorker.js file. This technically in not the service worker that is built once the build command is used.
All this file really does is check if 'servicveworker' is in the scope of the 'window' object, as well as perform other checks. 
I want to keep this checking behavior, so I did not touch the auto-generated ./serviceWorker.js file. My actual service worker configs are in ../sw-precache-config.js
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
