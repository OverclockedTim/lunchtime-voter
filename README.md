# Overview

Lunchtime Voter is a primarily two things - fun project for teams and weekend exploration of bleeding edge technologies <echo>OF THE FUTURE</echo>.

## Technologies

* Typescript as web client language
* Angular 2 as framework
* Firebase as database
* Possibly Materialize.css as CSS framework?  I can't find a lot that really works well with Angular 2 just yet.

### Possible Future Technologies

* Ionic 2 Hybrid Apps
* Swift 2.0 iOS apps
* Android Studio based Android Apps (Java 7, newest OS, etc)

## The App

The app idea itself is basically a tool for people to figure out where to go to lunch together.  
Pretty much everywhere I've ever worked, this primarily involved emailing or messaging 20 people about a hundred times:
"Do you want to go here?"  "Not Really, how bout here." "Not Really.  Anywhere but there" and so on.  Most of you
will know what I'm talking about :)  So this is just a quick way to get together and make a decision.  

Everyone gets to submit one idea for lunch. Everyone else votes on an idea.  The idea with the highest common point total wins,
and the group goes there for lunch.

### Prototype Idea Pics

![1. Set a Deadline](design/1_ Deadline.png)

![2. Invite](design/2_ Invite.png)

![3. Pick a Time](design/3_ Pick a Time.png)

![4. Pick a Place](design/4_ Pick a Place.png)

![5. Lunching](design/5_Lunching.png)

## Contributing

Everyone is welcome to commit towards this primary goal.  Design changes will be voted on my active commiters.

### Contributing Bugs

Done through github issues

### Chatting.

Done through Slack.  Link TBD.

### Contributing Code

Github pull requests. 

### Contributing BBQ and/or Bubble Tea.

I will definitely come to your house anytime.

# Getting Started / Running

# install the repo with npm
npm install

# start the server
npm start 
```
go to [http://localhost:3000](http://localhost:3000) in your browser

# Table of Contents
* [File Structure](#file-structure)
* [Getting Started](#getting-started)
* [Dependencies](#dependencies)
* [Installing](#installing)
* [Running the app](#running-the-app)
* [Contributing](#contributing)
* [TypeScript](#typescript)
* [Frequently asked questions](#frequently-asked-questions)
* [Support, Questions, or Feedback](#support-questions-or-feedback)
* [License](#license)


## File Structure
We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```angular2-webpack-starter/
├──src/                                   * our source files that will be compiled to javascript
│   │
│   ├──app/                               * WebApp: folder
│   │   ├──homeComponent.ts                         * App.ts: a simple version of our App component components
│   │   └──bootstrap.ts                   * entry file for app
│   │
│   ├──bindings/                          * where common files used throughout our app
│   │   ├──location_bindings.ts           * injectables to change the Router location Strategy
│   │   └──change_detection_bindings.ts   * injectables to change Angular's Change Detection Strategy
│   │
│   ├──public/                            * static assets are served here
│   │   ├──lib/                           * static libraries
│   │   │   └──es6-shim.js                * ignore this file. This is needed to polyfill the browser to for ES6 features to similarly
│   │   │
│   │   ├──favicon.ico                    * replace me with your own favicon.ico
│   │   ├──service-worker.js              * ignore this. Web App service worker that's not complete yet
│   │   ├──robots.txt                     * for search engines to crawl your website
│   │   ├──human.txt                      * for humans to know who the developers are
│   │   │
│   │   └──index.html                     * Index.html: where we place our script tags
│   │
│   └──typings/                           * where we define our custom types
│       ├──ng2.d.ts                       * where we patch angular2 types with our own types until it's fixed
│       └──_custom.d.ts                   * we include all of our custom types here
│
├──tsd_typings/                           * ignore this auto generated file from tsd
│   └──tsd.d.ts                           * ignore this our main file for all of our type definitions
│
├──test/                                  * this is our global unit tests and end-to-end tests
│
├──spec.bundle.js                         * ignore this magic that sets up our angular 2 testing environment
├──karma.config.js                        * karma config for our unit tests
├──protractor.config.js                   * protractor config for our end-to-end tests
├──tsconfig.json                          * config that webpack uses for typescript
├──tsd.json                               * config that tsd uses for managing it's definitions
├──package.json                           * what npm uses to manage it's dependencies
└──webpack.config.js                      * our webpack config
```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v4.1.1`+ and NPM `2.10.0`+

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies
* `npm run server` to start the dev server in another tab

## Running the app
After you have installed all dependencies you can now run the app. Run `npm run server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

### server
```bash
npm run server # or either webpack-dev-server or npm run express
```

## Other commands 
fire
### build files
```bash
npm run build  # or webpack
```

### watch and build files
```bash
npm run watch  # or webpack --watch
```

### run tests 
```bash
npm run test  # or karma start
```

### run webdriver (for end-to-end)
```bash
npm run webdriver-start  # or webdriver-manager start
```

### run end-to-end tests
```bash
# make sure you have webdriver running and a sever for the client app
npm run e2e  # or protractor
```

# TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

## Use latest TypeScript compiler
Make sure to upgrade, even if you installed TypeScript previously.

```
npm install --global typescript
```

## .d.ts Typings
The TSD typings in `tsd_typings/` are autogenerated.

```
npm install --global tsd
```

> You may need to require `reference path` for your editor to autocomplete correctly
```
/// <reference path="/src/typings/_custom.d.ts" />
```

If your editor only works with reference path here's the convention I'm using

`/src/typings/` hand written typings for when you need to create/update one for a library 

`/src/typings/_custom.d.s` main file to require everything (reference path this file)

`/src/typings/tsd.d.ts` requires tsd_typings

`/tsd_typings/` tsd typings (like node_modules these files live and generates at root level)

Otherwise including them in `tsd.json` is much prefered 

## Use a TypeScript-aware editor
We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

# Data Design

An example, MVP Data Design doc is now included to help everybody get an idea of the layout in firebase.  This is a simplest-possible-case data design.

![1. Data Design](design/data_design.png)


#Deploy your own

https://<yourfirebase>.firebaseio.com/?page=Hosting