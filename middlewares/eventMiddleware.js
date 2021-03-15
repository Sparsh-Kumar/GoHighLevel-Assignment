
const path = require ('path');
const { Event } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Event'));

const eventMiddleware = (req, res, next) => {
    try {

        let startDate = req.query.startDate;
        let endDate = req.query.endDate;

        if (!startDate) {
            throw new Error ('please enter the start Date');
        }

        startDate = parseInt (startDate);
        if (!endDate) {
            endDate = startDate + 86399999
        }
        endDate = parseInt (endDate);
        starttimeDateObj = new Date (startDate);
        let startYear = starttimeDateObj.getFullYear ();
        let startMonth = starttimeDateObj.getMonth ();
        let startDay = starttimeDateObj.getDate ();
        let should_start_time = new Date (startYear, startMonth, startDay, parseInt(process.env.START_HOURS)).getTime ();
        let should_end_time = new Date (startYear, startMonth, startDay, parseInt(process.env.END_HOURS)).getTime ();

        Event.find ({
            start: {
                $gte: startDate
            },
            end: {
                $lte: endDate
            }
        }).then ((events) => {
            req.should_start_time = should_start_time;
            req.should_end_time = should_end_time;
            if (!events || !events.length) {
                req.events = [];
            } else {
                req.events = events;
            }
            next ();

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
    eventMiddleware
}