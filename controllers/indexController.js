exports.homepage = (req, res, next) => {
    res.status(200).json({ message: "This is homepage" });
};
