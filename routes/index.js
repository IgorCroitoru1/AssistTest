const Router = require('express').Router;
const router = new Router();
const {body} = require('express-validator');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware')
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);


router.post('/reset-password', userController.resetPassword);
router.post('/jobs-populate',authMiddleware, userController.jobsPopulate)
router.post('/jobs-get',authMiddleware)
module.exports = router;