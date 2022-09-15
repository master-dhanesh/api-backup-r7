const User = require("../models/userModel");

exports.homepage = (req, res, next) => {
    res.status(200).json({ message: "This is homepage" });
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const createduser = await newUser.save();
        res.status(201).json(createduser);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.signin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })
            .select("+password")
            .exec();

        if (!user) return res.status(404).json({ error: "User not found" });

        const matchPassword = await user.comparePassword(password);

        if (!matchPassword)
            return res.status(401).json({ error: "wrong inputs" });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};
