

const path = require ('path');
const RouteHandler = require ('express').Router ();
const { createEvent } = require (path.resolve (__dirname, '..', 'controllers', 'createEvent'));
const { docs } = require (path.resolve (__dirname, '..', 'controllers', 'docs'));

// creating the api docs endpoint
RouteHandler.get ('/docs', docs);

// create event api endpoint
RouteHandler.post ('/create_event', createEvent);


RouteHandler.get ('/', (req, res) => {
    try {
        return res.status (200).render ('layouts/index.hbs');
    } catch (error) {
        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }
})

module.exports = {
    RouteHandler
}