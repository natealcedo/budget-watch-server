import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const entrySchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ['FOOD', 'EXPENSE', 'LEISURE'],
        default: 'EXPENSE'
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String, 
        required: true
    },
    year: { 
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day:{
        type: Number,
        required: true
    },
    _user: {
        type: Schema.ObjectId, 
        ref: 'User'
    }
});


const Entry = mongoose.model('Entry', entrySchema);
export default Entry;

