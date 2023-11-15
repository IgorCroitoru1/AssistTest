const ApiError = require('../exceptions/api-error');

module.exports = function(req,res,next){
    try{
        const userId = req.headers['X-AUTH-USR'];
        if(!userId){
            throw ApiError('Not authorized');
        }

        next();
    }
    catch(e){
        throw ApiError('Not authorized');
    }
}