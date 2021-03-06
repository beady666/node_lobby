## Overview

Playing around trying to make a card game lobby using:
* node.js + various middlewares
* bootstrap layout/css
* postgresql database
* html5 canvas
* web sockets

## Install/Instructions

1. clone this repo
2. install PostgreSQL
   * **TODO**: add details to these notes and add DB scripts to repo
   1. create DB
   2. create DB user for app service, give it grants on DB
   3. as DB user, create tables
3. [install node.js (include npm)](https://docs.npmjs.com/getting-started/installing-node)
4. install node packages (from package.json)
   * `$ npm install`
5. set the DB connection string in the env where you will run the app, e.g.
   * `$ export DB_URL=postgres://game_user:password@localhost:5432/game_db`
6. run the app
   * `$ node app`
7. point a web browser to localhost:3000

## Acknowledgements

The user registration & login were mostly cribbed from Brad Traversy's tutorial (links below), but modified to use postgres for the datastore instead of mongoDB.

[Brad's YouTube video tutorial part #1](https://www.youtube.com/watch?v=Z1ktxiqyiLA),
[Brad's code on github](https://github.com/bradtraversy/loginapp)

## Notes / Links

### Node middleware
[pg-promise - Promises/A+ interface for PostgreSQL](https://github.com/vitaly-t/pg-promise)

### [Bootstrap](http://getbootstrap.com/)
Bootstrap uses css to scale web apps based on the device viewport size. In general using bootstrap requires the following:
* boostrap.js, boostrap.css, and jquery.min.js (I used 3.1.0)
   * for this project, I've included them in the `public` folder
* include the above files in your layout html and add a meta viewport tag, e.g.
   * [basic html template with bootstrap](http://getbootstrap.com/getting-started/#template)
