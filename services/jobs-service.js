const Job = require('../models/jobs-model');
const ApiError = require('../exceptions/api-error');
class JobsService {
    async addJobs(userId, jobs) {
        jobs.forEach(async (job) => {
            try {
                await Job.create({
                    title: job.title,
                    company_name: job.company_name,
                    location: job.location,
                    remote: job.remote,
                    job_types: job.job_types,
                    added_by: userId,
                });
            } catch (e) {
                console.error('Error adding job:', e);
            }
        });
    }
    async getAllJobs(){
        try {
            const allJobs = await Job.findAll();
            return allJobs.map(job => job.toJSON());
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw ApiError('Internal Server Error');
        }
    }
}

module.exports = JobsService;