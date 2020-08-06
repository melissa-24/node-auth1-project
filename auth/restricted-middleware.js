module.exports = (req, res, next) => {
    console.log(req.session);
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Hey you need to log in to do that'});
    }
}