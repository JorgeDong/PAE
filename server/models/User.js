const moongoose = require('mongoose');

const UserSchema = new moongoose.Schema({
    id: {
        type: Number,
        required: False
    },
    name: {
        type: String,
        required: True
    },
    email: {
        type: String,
        required: True
    },
    password: {
        type: String,
        required: True
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;