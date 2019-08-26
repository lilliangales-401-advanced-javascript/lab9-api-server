'use strict';

/**
 * Function that generates 404 error response
 * @function
 * @param req
 * @param res
 * @param next
 */
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error).end();
};
