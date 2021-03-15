

const path = require ('path');
const RouteHandler = require ('express').Router ();
const { createEvent } = require (path.resolve (__dirname, '..', 'controllers', 'createEvent'));
const { docs } = require (path.resolve (__dirname, '..', 'controllers', 'docs'));
const { dashboard } = require (path.resolve (__dirname, '..', 'controllers', 'dashboard'));
const { getevents } = require (path.resolve (__dirname, '..', 'controllers', 'getevents'));
const { findtimeslots } = require (path.resolve (__dirname, '..', 'controllers', 'findtimeslots'));

// creating the api docs endpoint
RouteHandler.get ('/docs', docs);

// create event api endpoint
RouteHandler.post ('/create_event', createEvent);

// creating the dashboard endpoint
RouteHandler.get ('/dashboard', dashboard);

// creating the endpoint for getting the events b/w start date and end date
RouteHandler.get ('/get_events', getevents);

// creating the endpoint got finding the timeslots of a given date
RouteHandler.get ('/find_slots', findtimeslots);

module.exports = {
    RouteHandler
}