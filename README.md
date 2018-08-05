[![Build Status](http://img.shields.io/travis/quocvu/zipcodes-nearby.svg?style=for-the-badge)](https://travis-ci.org/quocvu/zipcodes-nearby)
[![Coverage Status](https://img.shields.io/coveralls/quocvu/zipcodes-nearby.svg?style=for-the-badge)](https://coveralls.io/github/quocvu/zipcodes-nearby)
[![NPM Downloads](https://img.shields.io/npm/dt/zipcodes-nearby.svg?style=for-the-badge)](https://www.npmjs.com/package/zipcodes-nearby)
[![NPM Version](https://img.shields.io/npm/v/zipcodes-nearby.svg?style=for-the-badge)](https://www.npmjs.com/package/zipcodes-nearby)
[![Dependencies](https://img.shields.io/david/quocvu/zipcodes-nearby.svg?style=for-the-badge)](https://david-dm.org/quocvu/zipcodes-nearby)
[![License](https://img.shields.io/github/license/quocvu/zipcodes-nearby.svg?style=for-the-badge)](https://github.com/quocvu/zipcodes-nearby/blob/master/LICENSE)

# Zipcodes near by

Find a list of zipcodes within a certain distance of a given zipcode.

## Installation

    npm install zipcodes-nearby

## Usage

The method `near(zipcode|coordinates, distance[, options])` takes 2 to 3 arguments.

* First is the zipcode or geo-coordinates (long/lat) to search around
* Second is the distance (in meters) to search within
* Third is an optional object with the following attributes:
  * `datafile`: name for the CSV file containing zipcodes coordinates. By default it looks for a file `zipcodes.csv` in the same folder
  * `zipcode`: name of the column in the CSV file containing the zipcode. By default it is `Zipcode`
  * `long`: name of the column in the CSV file containing the zipcode longitude. By default it is `Long`
  * `lat`: name of the column in the CSV file containing the zipcode latitude. By default it is 'Lat'

For examples:

```
var zipcodes = require('zipcodes-nearby');

// find zipcodes within 10km from 95020 using the default datafile "zipcodes.csv"
nearby = zipcodes.near('95020', 10000);

// find zipcodes within 10km from a location given by geo-coordinates using the default datafile "zipcodes.csv"
nearby = zipcodes.near({ longitude: 78.8, latitude: 48.3 }, 10000);

// find zipcodes within 10km from 95020 using the datafile "newzipcodes.csv"
nearby = zipcodes.near('95020', 10000, { datafile: 'newzipcodes.csv' });

```

## Data file

The data file with zipcodes coordinates must be supplied.  We have include one
for USA to use.  It can be replaced by zipcodes (or postal codes) from any country
as long as the file contains the zipcode, the longitude, and the latitude.

You can download an updated file for the USA at <http://federalgovernmentzipcodes.us/>


## License

[MIT](https://github.com/quocvu/zipcodes-nearby/blob/master/LICENSE.txt)


## Author Information

Quoc Vu  

* https://linkedin.com/in/quocvu  
* https://github.com/quocvu
