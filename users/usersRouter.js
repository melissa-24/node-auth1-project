const router = require('express').Router();

const users = require('./usersModel.js');

router.get('/', (req, res, next) => {
    users.find()
    .then(users => res.json(users))
    .catch(err => ({code: 500, message: 'Error finding users'}));
});

module.exports = router;