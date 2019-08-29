'use strict';


/**
 *
 * Not Found Error response module.
 * @module src/middleware/404
 */

/**
 * Function that generates 404 error response
 * @function
 * @param req {object} (request object)
 * @param res {object} (response object)
 * @param next {object} (next object)
 */
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error).end();
};
