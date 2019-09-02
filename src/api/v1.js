'use strict';

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

router.param('model', modelFinder.load);

/**
 * Get a list of records for a given model
 * Model must be a proper model, located within the ../models folder
 * @route GET /api/v1/models
 * @returns {object} 200 { count: 2, results: [ {}, {} ] }
 * @returns {Error}  500 - Server error
 */

router.get('/api/v1/models', (request, response) => {
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

/**
 * Get the schema for a given model
 * Model must be a proper model, located within the ../models folder
 * @route GET /api/v1/:model/schema
 * @returns {object} 200 { schema }
 * @returns {Error}  500 - Server error
 */

router.get('/api/v1/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});


/**
 * Get all records of the given model
 * Model must be a proper model, located within the ../models folder
 * @route GET /api/v1/:model
 * @returns {object} 200 { count: data.length, results: data,}
 * @returns {Error}  500 - Server error
 */
router.get('/api/v1/:model', handleGetAll);
/**
 * Post for a given model
 * Model must be a proper model, located within the ../models folder
 * @route POST /api/v1/:model
 * @returns {object} 200 { result }
 * @returns {Error}  500 - Server error
 */
router.post('/api/v1/:model', handlePost);
/**
 * Get information for one given id
 * Model must be a proper model, located within the ../models folder
 * @route GET /api/v1/:model/:id
 * @returns {object} 200 { result }
 * @returns {Error}  500 - Server error
 */
router.get('/api/v1/:model/:id', handleGetOne);
/**
 * Put for a given id & model
 * Model must be a proper model, located within the ../models folder
 * @route PUT /api/v1/:model/:id
 * @returns {object} 200 { result }
 * @returns {Error}  500 - Server error
 */
router.put('/api/v1/:model/:id', handlePut);
/**
 * Delete for a given id & model
 * Model must be a proper model, located within the ../models folder
 * @route DELETE /api/v1/:model/:id
 * @returns {object} 200 { result }
 * @returns {Error}  500 - Server error
 */
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers



function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  console.log(request.params);
  request.model.get(request.params.id)
    .then( result => {
      console.log(result);
      response.status(200).json(result[0]);
    })
    .catch( next );
}


function handlePost(request,response,next) {
  request.model.create(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


function handlePut(request,response,next) {
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
