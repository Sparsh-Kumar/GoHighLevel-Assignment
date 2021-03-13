

const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');


const EventSchema = new mongoose.Schema ({

    datetime: { // in milliseconds
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
    }

}, { timestamps: true });


const Event = mongoose.model ('event', EventSchema)

module.exports = {
    Event
}