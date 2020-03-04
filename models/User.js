const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Veuillez entrer un nom de 6 caractère minimum"],
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: [true, "Veuillez entrer un email"],
        min: 6
    },
    password: {
        type: String,
        required: [true, "Veuillez entrer un mot de passe"],
        max: 1024,
        min: 6
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema)