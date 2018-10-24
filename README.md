# Scan and Go
A Progressive Web App Shopping list with barcode features.

This app is still in the development phase.

Running this app or building this app on your own computer assumes you have NPM installed.

This app is essentially two apps in one. There's a server, which I use to view production "build" files, and there's the front end, 
which is the actual app itself.

To install dependencies for the server, run `npm install` from the root of app.
To install dependencies for the front end, run `npm install` from the root of the client folder.

This app is fully functional so long as you are able able to get your own server up in running (This is just a demo at this point in time. Not hosted on any website.)
This application utilizes the device camera and a server based routing system. Meaning (at this point in time) to utilize the app, you must view the
application on "localhost" - not just static files. To do that, either... 
* run `npm start` from the root of the client folder or...
* run `npm build` from the root of the client folder, set an environment variable called `NODE_ENV` to true and run `npm start` from the root of the whole app, or...
* run `npm build` from the root of the client folder and have your own server serve the generated files.

## FUTURE TODOS:
* Fix Camera when user alternates from portrait to landscape