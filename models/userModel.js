const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const validator = require("validator");

const userModel = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        minlength: [4, "Username required at least 4 characters"],
    },
    password: {
        type: String,
        required: [true, "Passsword is required"],
        minlength: [6, "Password required at least 6 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Invalid email"],
    },
});

const User = model("user", userModel);

module.exports = User;
