import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username must be 5 characters or more'],
        unique: true
    },
    password_digest: {
        type: String,
        required: true,
        minLength: [8, 'Password must be 8 characters or more']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model('User', userSchema);
export default User;

