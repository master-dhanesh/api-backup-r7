exports.sendToken = (res, statuscode, user) => {
    const token = user.getJWTToken();

    const cookieOptions = {
        expire: Date.now() + process.env.COOKIEEXPIRE * 24 * 60 * 60 * 1000,
        httpOnly: true,
    };

    res.status(statuscode)
        .cookie("token", token, cookieOptions)
        .json({ success: true, user, token });
};
