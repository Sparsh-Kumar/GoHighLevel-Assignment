

const path = require ('path');
const { EventEmitter } = require('events');
const { eventNames } = require('process');
const { Event } = require (path.resolve (__dirname, '..', 'Database', 'Models', 'Event'));

const findtimeslots = (req, res) => {
    try {

        let slots = [];
        for (let index = req.should_start_time; index < req.should_end_time;index = index + 1800000) {
            slots.push ({
                start: index,
                end: index + 1800000
            });
        }

        if (req.events && req.events.length) {
            for (let event of req.events) {
                let event_starting_time = event.start;
                let event_ending_time = event.end;
                for (let index = 0;index < slots.length;index++) {
                    let slot = slots [index];
                    if ((event_starting_time >= slot.start && event_starting_time <= slot.end) || (event_ending_time >= slot.start && event_ending_time <= slot.end)) {
                        slots.splice (index, 1);
                    }
                }
            }
        }

        return res.status (200).send ({
            status: 'success',
            slots
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