

const path = require ('path');
const _ = require ('lodash');
const { Event } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Event'));


const createEvent = (req, res) => {
    try {

        let { datetime, duration, description } = _.pick (req.body, ['datetime', 'duration', 'description']);
        // we are expecting the duration in minutes
        // TODO - validate the values of datetime and duration must be integers
        if (!datetime || !duration) {
            throw new Error ('datetime and duration are necessary');
        }
        // converting minutes to milliseconds
        duration = duration * 60000;
        Event.create ({
            datetime,
            duration,
            description
        }).then ((created_event) => {

            return res.status (200).send ({
                status: 'success',
                created_event
            })

        }).catch ((error) => {

            return res.status (401).send ({
                status: 'failure',
                message: error.message
            })
        })

    } catch (error) {

        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }
}

module.exports = {
    createEvent
}