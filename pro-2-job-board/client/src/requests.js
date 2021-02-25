const GRAPHQL_URL = "http://localhost:9000/graphql";

export const loadJobs = async() => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query JobsQuery {
                    jobs {
                      id,
                      title, 
                      description,
                      company {
                        id,
                        name
                      }
                    }
                }`
        })
    });

    const resBody = await response.json();

    if (resBody.errors) {
        const message = resBody.errors.map((error) => error.message).join("\n");

        throw new Error(message);
    }

    console.log(resBody);

    return resBody.data.jobs;
}

export const loadJob = async(id) => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query JobQuery($id: ID!) {
                    job(id: $id) {
                      id,
                      title, 
                      description,
                      company {
                        id,
                        name
                      }
                    }
                }`,
            variables: {
                id: id
            }
        })
    });

    const resBody = await response.json();

    if (resBody.errors) {
        const message = resBody.errors.map((error) => error.message).join("\n");

        throw new Error(message);
    }

    console.log(resBody);

    return resBody.data.job;
}

export const loadCompany = async(id) => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query CompanyQuery($id: ID!) {
                    company(id: $id) {                  
                        id,
                        name,
                        description,
                        jobs {
                            id, 
                            title, 
                            description
                        }             
                    }
                }`,
            variables: {
                id: id
            }
        })
    });

    const resBody = await response.json();

    if (resBody.errors) {
        const message = resBody.errors.map((error) => error.message).join("\n");

        throw new Error(message);
    }

    console.log(resBody);

    return resBody.data.company;
}


export const createJob = async(input) => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `mutation CreateJob($input: CreateJobInput) {
                job: createJob(input: $input) {
                  id,
                  title,
                  description,
                  company {
                    id,
                    name
                  }
                }
              }`,
            variables: {
                input: input
            }
        })
    });

    const resBody = await response.json();

    if (resBody.errors) {
        const message = resBody.errors.map((error) => error.message).join("\n");

        throw new Error(message);
    }

    console.log(resBody);

    return resBody.data.job;
}