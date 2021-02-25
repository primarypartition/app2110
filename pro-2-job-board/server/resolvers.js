const db = require('./db');

const Query = {
    greeting: () => 'Hello World!',
    // jobs: () => []
    jobs: () => db.jobs.list(),
    job: (root, args) => db.jobs.get(args.id),
    company: (root, args) => db.companies.get(args.id)
}

const Mutation = {
    // createJob: (root, args) => {
    //     const { companyId, title, description } = args;
    //     const id = db.jobs.create({ companyId, title, description });

    //     return db.jobs.get(id);
    // }
    createJob: (root, { input }) => {
        const id = db.jobs.create(input);

        return db.jobs.get(id);
    }
}


const Job = {
    company: (job) => db.companies.get(job.companyId)
}

const Company = {
    jobs: (company) => db.jobs.list()
        .filter((job) => job.companyId == company.id)
}


module.exports = { Query, Mutation, Job, Company }