# Robo Report 
[![Build Status](https://travis-ci.org/JSweet314/robo-report-client.svg?branch=master)](https://travis-ci.org/JSweet314/robo-report-client)

Welcome to Robo Report! This app serves to increase awareness of the widespread issue of unwanted robo-calls and malicious telemarketers. In addition raising awareness, this app enables users to submit reports from within the app directly to the FCC and eliminate the need to include their contact information time and time again. Utilizing React and Electron, RoboReport is built as a desktop application due Node.js libraries required by Nightmare.js, a browser automation utility that this app uses to complete the FCC Complaint Form for Unwanted Calls. For questions, reach out on GitHub to [Jon Sweet](https://github.com/jsweet314) or [Matt Renn](https://github.com/rennmatthewp).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* This app requires that you have [**Node.js**](https://nodejs.org/en/) installed locally.
* A [Firebase](https://firebase.google.com/) account
* JWT access to the [RoboReport API](http://roboreport-api.herokuapp.com/)
  * This API is restricted to code owners, and access will be given out on a VERY limited basis.

### Installing

You may use NPM or Yarn - just stick to ONE of the two. Instructions listed here use NPM.

Clone down this repo.

```
git clone https://github.com/JSweet314/robo-report-client.git
```

Change in to the project directory and install dependencies.

```
cd robo-report-client && npm install
```

Create a `.env` file in the root of the projects and add your Firebase API key and RoboReport API token with the following format

```
REACT_APP_ROBO_TOKEN=<YOUR ROBOREPORT API TOKEN>
REACT_APP_FIREBASE_API_KEY=<YOUR FIREBASE API KEY>
```

Start the development server with the command

```
npm run dev
```

Please see the [Electron](https://www.electronjs.org/docs) docs for details on packaging Electron apps for production

## Running the tests

The testing suite can be run with the command

```
npm test
```

## Built With

* [ReactJS](https://www.reactjs.org) - UI/View Framework
* [Redux](https://redux.js.org) - Application State Management
* [Electron](https://www.electronjs.org) - JavaScript Desktop App Framework
* [Nightmare](https://nightmarejs.org) - Browser Automation Library
* [Victory](http://formidable.com/open-source/victory/) - React.js Charting Library
* [Moment](https://www.momentjs.com) - JavaScript Date/Time Library
* [Firebase](https://firebase.google.com/) - For User Authentication (OAuth)

## Authors

* **Jonathan Sweet** - [JSweet314](https://github.com/JSweet314)
* **Matt Renn** - [rennmatthewp](https://github.com/rennmatthewp)
