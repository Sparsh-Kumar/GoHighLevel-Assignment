

const path = require ('path');
const { Event } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Event'));
const _ = require ('lodash');

const createEvent = (req, res) => {
    try {

        let { starttime, duration, description } = _.pick (req.body, ['starttime', 'duration', 'description']);
        if (!starttime || !duration) {
            throw new Error ('please enter starttime and duration');
        }

        starttime = parseInt (starttime);
        let endtime = starttime + parseInt (duration) * 60000;
        starttimeDateObj = new Date (starttime);

        let startYear = starttimeDateObj.getFullYear ();
        let startMonth = starttimeDateObj.getMonth ();
        let startDay = starttimeDateObj.getDate ();

        let should_start_time = new Date (startYear, startMonth, startDay, parseInt(process.env.START_HOURS)).getTime ();
        let should_end_time = new Date (startYear, startMonth, startDay, parseInt(process.env.END_HOURS)).getTime ();

        if ((starttime < should_start_time) || (starttime > should_end_time) || (endtime > should_end_time) || (endtime < should_start_time)) {
            throw new Error ('this is not a valid timing');
        }

        Event.findOne ({

            $or: [
                {
                    start: {
                        $lte: starttime,
                        $lte: endtime
                    },
                    end: {
                        $gte: starttime,
                        $lte: endtime
                    }
                },

                {
                    start: {
                        $lte: starttime,
                        $lte: endtime
                    },
                    end: {
                        $gte: starttime,
                        $gte: endtime
                    }
                },

                {
                    start: {
                        $gte: starttime,
                        $lte: endtime
                    },

                    endtime: {
                        $gte: starttime,
                        $gte: endtime
                    }
                },

                {
                    start: {
                        $gte: starttime,
                        $lte: endtime
                    },

                    endtime: {
                        $gte: starttime,
                        $lte: endtime
                    }
                }
                
            ]

        }).then ((event) => {

            if (event) {
                throw new Error ('already an event');
            }
            else {
                return Event.create ({
                    start: starttime,
                    duration,
                    description,
                    end: endtime
                })
            }
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