'use strict';

const Model = require('../mongo.js');
const schema = require('./products-schema.js');
/**
 *
 * Products model.
 * @module src/models/products/products-model
 */



/**
 * @class
 * @constructor
 */

class Products extends Model {
  constructor() { super(schema); }
}

module.exports = Products;
