

const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');


const EventSchema = new mongoose.Schema ({

    start: { // in milliseconds
        type: Number,
        required: true
    },

    duration: { //  in milliseconds
        type: Number,
        required: true
    },

    description: {
        type: String,
        trim: true,
        required: false,
        default: ''
    },

    end: {
        type: Number,
        required: true
    }

}, { timestamps: true });


const Event = mongoose.model ('event', EventSchema)

module.exports = {
    Event
}