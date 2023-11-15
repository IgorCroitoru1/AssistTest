
const User = require('../models/user-model');
const ApiError = require('../exceptions/api-error');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserPreferences = require('../models/user-preferences');

class UserService{
    async registration(email, password){
        const candidate = User.findOne({
            where: {
                email: email
            }
        })
        if (candidate){
            throw ApiError("User with this email already exist")
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({email: email, passwordHash: hashPassword})

        await createUserWithPreferences(user);

        
        return user;

    }

    async resetPassword(email){
        const candidate = User.findOne({
            where: {
                email: email
            }
        })
        if(!candidate){
            throw ApiError("User with this email is not existing")
        }

        const user = await User.findOne({
            where: {
             email: email
            },
          });
        if(!user){
            throw ApiError("User does not exist")
        }
        //....
        const newPassword = this.generateRandomPassword();
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

    }

    generateRandomPassword() {
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
      
        const getRandomChar = (charSet) => charSet[Math.floor(Math.random() * charSet.length)];
      
        const randomPassword =
          getRandomChar(lowerCaseChars) +
          getRandomChar(upperCaseChars) +
          Array.from({ length: 12 }, () => getRandomChar(lowerCaseChars + upperCaseChars + numbers)).join('');
      
        return randomPassword;
      }

    async createUserPreferences(user) {
        try {
            const userPreferences = await UserPreferences.create({
            timezone: 'UTC+00:00',
            country: 'US',
            userId: '...', 
            });
        
            console.log('User preferences created:', userPreferences.toJSON());
        } catch (error) {
            console.error('Error creating user preferences:', error);
        }
        }
}

module.exports = UserService;