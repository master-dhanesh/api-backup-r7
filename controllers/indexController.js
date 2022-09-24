const User = require("../models/userModel");
const { sendToken } = require("../utils/auth");
const cloudinary = require("cloudinary");
const formidable = require("formidable");

cloudinary.config({
    cloud_name: "dhanesh-cloudinary",
    api_key: "176257529696164",
    api_secret: "FsvsmtHChA4V5HJXdYSuMzzRwSg",
    secure: true,
});

exports.homepage = (req, res, next) => {
    console.log(req);
    res.status(200).json({ message: "This is homepage", id: req.auth.id });
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const createduser = await newUser.save();
        // res.status(201).json(createduser);
        sendToken(res, 201, createduser);
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

        // res.status(201).json(user);

        sendToken(res, 200, user);
    } catch (err) {
        console.log("error", err);
        res.status(500).json(err);
    }
};

exports.logout = (req, res, next) => {
    req.clearCookie();
    res.status(200).json({ message: "user logged out" });
};

exports.upload = async (req, res, next) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        if (err) throw err;

        const user = await User.findById(req.params.id).exec();
        if (files) {
            const { public_id, secure_url } =
                await cloudinary.v2.uploader.upload(files.image.filepath, {
                    folder: "r7",
                    width: 1920,
                    crop: "scale",
                    quality: "30",
                });
            user.image = {
                public_id,
                url: secure_url,
            };
        }
        console.log(user);
        await user.save();
        res.status(200).json({ message: "image uploaded" });
    });
};
