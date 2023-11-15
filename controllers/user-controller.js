
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const UserService = require('../services/user-service')
const UserPreferences = require('../models/user-preferences');
const User = require('../models/user-model');
const axios = require('axios');
const Jobs = require('../services/jobs-service');
const JobsService = require('../services/jobs-service');
class UserController {
    async registration(req, res, next) {
        try {
            

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {email, password} = req.body;
            const newUser = await UserService.registration(email,password);
           

            await UserPreferences.create({
                user_id: newUser.id,
                timezone: null,
                country: null,
              });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async resetPassword(req, res, next){
        try{
        const email = req.user.email;
        await UserController.resetPassword(email);
        }
        catch(e){
            next(e);
        }

    }

    async updatePreferences(req, res, next){
        const country = req.headers['x-country'];
        const timezone = req.headers['x-timezone'];
        const userId = req.headers['X-AUTH-USER'];
        try{
        const userDb = await User.findOne({
            where: {
                id: userId
            }
        })

        const userPreferences = await UserPreferences.findOne({
            where: {
              user_id:userDb.id,
            },
          });

        if(userPreferences){
            await UserPreferences.update({
                timezone: timezone,
                country: country
            })
        }
        console.log('User preferences updated successfully:', userPreferences.toJSON());

        }
        catch(e){
            next(e);
        }
    
       
       
    }
    async jobsPopulate(req,res,next){
        try{
        const userId = req.headers['X-AUTH-USR'];
        const jobs = await axios.get('https://www.arbeitnow.com/api/job-board-api').data.data;
        await JobsService.jobsPopulate(userId, jobs);
        }
        catch{
            next(e);
        }
    }
    async getAllJobs(req,res,next){
        try{
            const jobs = await JobsService.getAllJobs();
            res.json(jobs);
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new UserController();