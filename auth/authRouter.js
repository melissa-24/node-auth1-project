const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/usersModel.js');

router.post('/register', async (req, res) => {
    let user = req.body;
    
    if(!(user.firstName && user.lastName && user.username && user.password)) {
        next({ code: 400, message: 'Missing required data'})
    } else {
        const hast = bcrypt.hastSync(user.password, 12);
        user.password = hash;

        try {
            const saved = await Users.add(user);
            req.session.user = saved;
            res.status(201).json(saved);
        } catch (err) {
            console.log(err);
            next({code: 500, message: 'Can not add user to database'});
        }
    }
});

router.post('/login', async (req, res) => {
    let user = req.body;

    if(!(user.username && user.password)) {
        next ({ code: 400, message: 'Missing fieilds'});
    } else {
        try {
            const found = await user.findBy({username: user.username});

            if(found && bcrypt.compareSync(user.password, found.password)) {
                req.session.user = found;
                res.status(200).json({message: `Welcome ${found.firstName} ${found.lastName}`, user: found});
            } else {
                next({ code: 401, message: 'Wrong user or password'});
            }
        } catch (err) {
            next({ code: 500, message: 'You Shall not pass'});
        }
    }
});

router.get('/logout', (req, res, next) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                console.log(err);
            next({code: 401, message: "There seems to be an issue logging out"});
            } else {
                res.send('Congrats you have been logged out');
            }
        });
    } else {
        res.send();
    }
});

module.exports = router;