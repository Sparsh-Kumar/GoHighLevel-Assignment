

const path = require ('path');
const { Event } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Event'));

const findtimeslots = (req, res) => {
    try {

        // getting the start date value
        let startDate = req.query.startDate; // in milliseconds
        if (!startDate) {
            throw new Error ('please specify the start date');
        }

        startDate = parseInt (startDate); // start of the day
        
        let endDate = startDate + 86399999; // end of the day
        starttimeDateObj = new Date (startDate);

        let startYear = starttimeDateObj.getFullYear ();
        let startMonth = starttimeDateObj.getMonth ();
        let startDay = starttimeDateObj.getDate ();

        let should_start_time = new Date (startYear, startMonth, startDay, parseInt(process.env.START_HOURS)).getTime ();
        let should_end_time = new Date (startYear, startMonth, startDay, parseInt(process.env.END_HOURS)).getTime ();

        // finding events in that particular day
        let slots = [];

        Event.find({
            start: {
                $gte: startDate
            },
            end: {
                $lte: endDate
            }
        }).then ((events) => {

            if (! events || !events.length) {
                // print from START_HOURS TO END_HOURS WITH DEFAULT DURATION OF 30 MINS.
                for (let index = should_start_time;index < should_end_time;index = index + 1800000) {
                    slots.push ({
                        start_time: index,
                        end_time: index + 1800000
                    });
                }

            } else {
                // here the logic goes
                console.log ('some other logic here');
            }

            return res.status (200).send ({
                status: 'success',
                slots
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
     findtimeslots
}