

const path = require ('path');
const { Event } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Event'));
const _ = require ('lodash');

const getevents = (req, res) => {

    try {

        let startDate = req.query.startDate;
        let endDate = req.query.endDate;

        // TODO - We can validate if the values entered startDate and endDate must be of Number type
        // startDate and endDate should be in milliseconds
        
        if (!startDate) {
            throw new Error ('please enter the start date');
        }

        startDate = parseInt(startDate);
        if (!endDate) {
            endDate = parseInt (startDate) + 86399999;
        }
        endDate = parseInt (endDate);

        Event.find ({
            datetime: {
                $gte: startDate,
                $lte: endDate
            }
        }).then ((events) => {

            return res.status (200).send ({
                status: 'success',
                events
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
    getevents
}