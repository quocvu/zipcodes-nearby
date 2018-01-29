const fs = require('fs');

const Csv = require('fast-csv');
const geolib = require('geolib');
const _ = require('lodash');

const csvOptions = {
  discardUnmappedColumns: true,
  headers: true,
  ignoreEmpty: true,
  trim: true
};

/**
 * Return coordinates of the given zipcode
 *
 * @param {object} zipcode to search for coordinates
 * @param {string} datafile containing zipcodes coordinates
 * @param {object} columns names in CVS to get zipcode, longitude, and latitude
 */
function findCoordinates(zipcode, datafile, columns) {
  return new Promise((resolve, reject) => {
    Csv.fromPath(datafile, csvOptions)
      .validate((data) => {
        return data
          && data.hasOwnProperty(columns.long) && !_.isEmpty(data[columns.long])
          && data.hasOwnProperty(columns.lat) && !_.isEmpty(data[columns.lat])
          && data.hasOwnProperty(columns.zipcode) && !_.isEmpty(data[columns.zipcode]);
      })
      .on('data-invalid', (data) => {
        // console.log('Missing zipcode or longitude or latitude', data);
      })
      .on('data', (data) => {
        if (zipcode == data[columns.zipcode]) {
          resolve({ latitude: data[columns.lat], longitude: data[columns.long] });
        }
      })
      .on('end', () => {
        reject('Cannot find zipcode ' + zipcode);
      });
  });
}

/**
 * Return zipcodes near the given coordinates
 *
 * @param {object} center coordinates to search zipcodes around
 * @param {number} radius to search zipcodes within
 * @param {string} datafile containing zipcodes coordinates
 * @param {object} columns names in CVS to get zipcode, longitude, and latitude
 */
function findNear(center, radius, datafile, columns) {
  return new Promise((resolve, reject) => {
    const matches = [];

    Csv.fromPath(datafile, csvOptions)
      .validate((data) => {
        return data
          && data.hasOwnProperty(columns.long) && !_.isEmpty(data[columns.long])
          && data.hasOwnProperty(columns.lat) && !_.isEmpty(data[columns.lat])
          && data.hasOwnProperty(columns.zipcode) && !_.isEmpty(data[columns.zipcode]);
      })
      .on('data-invalid', (data) => {
        // console.log('Missing zipcode or longitude or latitude', data);
      })
      .on('data', (data) => {
        const distance = geolib.getDistance(center,
          { latitude: data[columns.lat], longitude: data[columns.long] });

        if (distance <= radius) {
          matches.push(data[columns.zipcode]);
        }
      })
      .on('end', () => {
        resolve(matches);
      });
  });
}

module.exports = {

  /**
   * Given a zipcode, find all other zipcodes that are within a certain distance
   *
   * @param {string} zipcode to search around
   * @param {number} distance maximun distance from the given zipcode
   * @param {object} options optional parameters
   *   options.datafile: name of the CSV file containing zipcode info
   *   options.zipcode: name of the column in the CSV file containing the zipcode
   *   options.long: name of the column in the CSV file containing the zipcode longitude
   *   options.lat: name of the column in the CSV file containing the zipcode latitude
   * @returns {array} of zipcode within the given distance
   */
  near(zipcode, distance, options) {
    const datafile = options && options.datafile !== undefined ? options.datafile : 'zipcodes.csv';
    const columns = {
      long: options && options.long !== undefined ? options.long : 'Long',
      lat: options && options.lat !== undefined ? options.lat : 'Lat',
      zipcode: options && options.zipcode !== undefined ? options.zipcode : 'Zipcode',
    };

    const zipcodes = [];

    return new Promise((resolve, reject) => {
      findCoordinates(zipcode, datafile, columns)
        .then((center) => {
          findNear(center, distance, datafile, columns)
            .then((zipcodes) => {
              resolve(zipcodes);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        })
    });
  },
};
