

const path = require ('path');
const { Event } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Event'));
const _ = require ('lodash');

const getevents = (req, res) => {

    try {

        let { startDate, endDate } = _.pick (req.body, ['startDate', 'endDate']);
        // TODO - We can validate if the values entered startDate and endDate must be of Number type
        // startDate and endDate should be in milliseconds

        if (!startDate || !endDate) {
            throw new Error ('please enter both the start date and end date');
        }

        startDate = parseInt(startDate);
        endDate = parseInt (endDate);

        Event.find ({
            
            datetime: {
                $and: [
                    {$gte: startDate},
                    {$lte: endDate}
                ]
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