'use strict';
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

/**
 *
 * Model finder module.
 * @module src/middleware/model-finder
 */

const modelsFolder = `${__dirname}/../models`;

/**
 * @function
 * @name load
 * @param req {object} (request object)
 * @param res {object} (response object)
 * @param next {object} (next object)
 */
const load = (req,res,next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  const Model = require(`../models/${modelName}/${modelName}-model.js`);
  req.model = new Model();
  next();
};

/**
 *@function 
 *@name list
 * @param req {object} (request object)
 * @param res {object} (response object)
 * @param next {object} (next object)
 * @returns {Promise<T | void>}
 */
const list = () => {
  return readdir(modelsFolder)
    .then(contents =>
      contents.filter((entry) =>
        fs.lstatSync(`${modelsFolder}/${entry}`).isDirectory() && fs.statSync(`${modelsFolder}/${entry}/${entry}-model.js`)
      )
    )
    .catch(console.error);
};

module.exports = {load,list};
