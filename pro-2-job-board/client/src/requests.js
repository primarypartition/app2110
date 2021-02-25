import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';


import { getAccessToken, isLoggedIn } from './auth';

const GRAPHQL_URL = "http://localhost:9000/graphql";

// const client = new ApolloClient({
//     link: new HttpLink({ uri: GRAPHQL_URL }),
//     cache: new InMemoryCache()
// });

const authLink = new ApolloLink((operation, forward) => {
    if (isLoggedIn()) {
        operation.setContext({
            headers: {
                "authorization": "Bearer " + getAccessToken()
            }
        });
    }

    return forward(operation);
});


const client = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({ uri: GRAPHQL_URL })
    ]),
    cache: new InMemoryCache()
});


const jobDetailFragment = gql `
            fragment JobDetail on Job {
                id,
                title, 
                description,
                company {
                    id,
                    name
                }
            }
            `;

const jobsQuery = gql `query JobsQuery {
                        jobs {
                            # id,
                            # title, 
                            # description,
                            # company {
                            #     id,
                            #     name
                            # }
                            ...JobDetail
                        }
                    }
                    ${jobDetailFragment}
                    `;

const jobQuery = gql `query JobQuery($id: ID!) {
                    job(id: $id) {
                    #   id,
                    #   title, 
                    #   description,
                    #   company {
                    #     id,
                    #     name
                    #   }
                        ...JobDetail
                    }
                }
                ${jobDetailFragment}
                `;

const companyQuery = gql `query CompanyQuery($id: ID!) {
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
                    }`;

const createJobMutation = gql `mutation CreateJob($input: CreateJobInput) {
                                job: createJob(input: $input) {
                                #   id,
                                #   title,
                                #   description,
                                #   company {
                                #     id,
                                #     name
                                #   }
                                    ...JobDetail        
                                }
                            }
                            ${jobDetailFragment}
                            `;

// export const loadJobs = async() => {
//     const response = await fetch(GRAPHQL_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//             query: `query JobsQuery {
//                     jobs {
//                       id,
//                       title, 
//                       description,
//                       company {
//                         id,
//                         name
//                       }
//                     }
//                 }`
//         })
//     });

//     const resBody = await response.json();

//     if (resBody.errors) {
//         const message = resBody.errors.map((error) => error.message).join("\n");

//         throw new Error(message);
//     }

//     console.log(resBody);

//     return resBody.data.jobs;
// }

export const loadJobs = async() => {
    // const query = gql `query JobsQuery {
    //     jobs {
    //       id,
    //       title, 
    //       description,
    //       company {
    //         id,
    //         name
    //       }
    //     }
    // }`;

    // const resBody = await client.query({ query });

    const resBody = await client.query({ query: jobsQuery, fetchPolicy: 'no-cache' });

    if (resBody.errors) {
        const message = resBody.errors.map((error) => error.message).join("\n");

        throw new Error(message);
    }

    console.log(resBody);

    return resBody.data.jobs;
}

// export const loadJob = async(id) => {
//     const response = await fetch(GRAPHQL_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//             query: `query JobQuery($id: ID!) {
//                     job(id: $id) {
//                       id,
//                       title, 
//                       description,
//                       company {
//                         id,
//                         name
//                       }
//                     }
//                 }`,
//             variables: {
//                 id: id
//             }
//         })
//     });

//     const resBody = await response.json();

//     if (resBody.errors) {
//         const message = resBody.errors.map((error) => error.message).join("\n");

//         throw new Error(message);
//     }

//     console.log(resBody);

//     return resBody.data.job;
// }

export const loadJob = async(id) => {
    // const query = gql `query JobQuery($id: ID!) {
    //                 job(id: $id) {
    //                   id,
    //                   title, 
    //                   description,
    //                   company {
    //                     id,
    //                     name
    //                   }
    //                 }
    //             }`;

    const variables = {
        id: id
    };

    const resBody = await client.query({ query: jobQuery, variables });

    if (resBody.errors) {
        const message = resBody.errors.map((error) => error.message).join("\n");

        throw new Error(message);
    }

    console.log(resBody);

    return resBody.data.job;
}

// export const loadCompany = async(id) => {
//     const response = await fetch(GRAPHQL_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//             query: `query CompanyQuery($id: ID!) {
//                     company(id: $id) {                  
//                         id,
//                         name,
//                         description,
//                         jobs {
//                             id, 
//                             title, 
//                             description
//                         }             
//                     }
//                 }`,
//             variables: {
//                 id: id
//             }
//         })
//     });

//     const resBody = await response.json();

//     if (resBody.errors) {
//         const message = resBody.errors.map((error) => error.message).join("\n");

//         throw new Error(message);
//     }

//     console.log(resBody);

//     return resBody.data.company;
// }

export const loadCompany = async(id) => {
    // const query = gql `query CompanyQuery($id: ID!) {
    //                 company(id: $id) {                  
    //                     id,
    //                     name,
    //                     description,
    //                     jobs {
    //                         id, 
    //                         title, 
    //                         description
    //                     }             
    //                 }
    //             }`;

    const variables = {
        id: id
    };

    const resBody = await client.query({ query: companyQuery, variables });

    if (resBody.errors) {
        const message = resBody.errors.map((error) => error.message).join("\n");

        throw new Error(message);
    }

    console.log(resBody);

    return resBody.data.company;
}

// export const createJob = async(input) => {
//     const response = await fetch(GRAPHQL_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             "authorization": "Bearer " + getAccessToken()
//         },
//         body: JSON.stringify({
//             query: `mutation CreateJob($input: CreateJobInput) {
//                 job: createJob(input: $input) {
//                   id,
//                   title,
//                   description,
//                   company {
//                     id,
//                     name
//                   }
//                 }
//               }`,
//             variables: {
//                 input: input
//             }
//         })
//     });

//     const resBody = await response.json();

//     if (resBody.errors) {
//         const message = resBody.errors.map((error) => error.message).join("\n");

//         throw new Error(message);
//     }

//     console.log(resBody);

//     return resBody.data.job;
// }

export const createJob = async(input) => {
    // const mutation = gql `mutation CreateJob($input: CreateJobInput) {
    //             job: createJob(input: $input) {
    //               id,
    //               title,
    //               description,
    //               company {
    //                 id,
    //                 name
    //               }
    //             }
    //           }`;

    const variables = {
        input: input
    };

    // const query = gql `query JobQuery($id: ID!) {
    //     job(id: $id) {
    //       id,
    //       title, 
    //       description,
    //       company {
    //         id,
    //         name
    //       }
    //     }
    // }`;

    // const resBody = await client.mutate({ mutation, variables });

    const resBody = await client.mutate({
        mutation: createJobMutation,
        variables,
        update: (cache, mutationResult) => {
            console.log(mutationResult);

            cache.writeQuery({
                // query: query,
                query: jobQuery,
                variables: {
                    id: mutationResult.data.job.id
                },
                data: mutationResult.data
            });
        }
    });

    if (resBody.errors) {
        const message = resBody.errors.map((error) => error.message).join("\n");

        throw new Error(message);
    }

    console.log(resBody);

    return resBody.data.job;
}