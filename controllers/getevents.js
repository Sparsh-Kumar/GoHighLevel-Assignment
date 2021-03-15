

const path = require ('path');
const { Event } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Event'));
const _ = require ('lodash');

const getevents = (req, res) => {

    try {

        return res.status (200).send ({
            status: 'success',
            events: req.events
        })

    } catch (error) {

        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }
}


module.exports = {
    getevents
}