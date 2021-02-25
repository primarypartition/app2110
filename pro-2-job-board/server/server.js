const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server-express');


const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const db = require('./db');

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(cors(), bodyParser.json(), expressJwt({
    secret: jwtSecret,
    credentialsRequired: false
}));


const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf8' }));
const resolvers = require('./resolvers');
// const context = ({ req }) => ({ user: req.user });
const context = ({ req }) => ({ user: req.user && db.users.get(req.user.sub) });

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
apolloServer.applyMiddleware({ app, path: '/graphql' });
// http://localhost:9000/graphql

// {
//   greeting
// }

// {
//   jobs {
//     id, 
//     title, 
//     description
//   }
// }

// {
//   jobs {
//     id, 
//     title, 
//     description,
//     company {
//       id,
//       name
//     }
//   }
// }

// {
//     job(id: "rJKAbDd_z") {
//       id,
//       title
//     }
// }

// query JobQuery($id: ID!){
//     job(id: $id) {
//       id,
//       title
//     }
// }
// {
//     "id": "rJKAbDd_z"
// }

// query CompanyQuery($id: ID!){
//     company(id: $id) {
//       id,
//       name
//     }
// }
// {
//     "id": "HJRa-DOuG"
// }

// query CompanyQuery($id: ID!){
//     company(id: $id) {
//       id,
//       name,
//       description,
//       jobs {
//         id, 
//         title, 
//         description
//       }
//     }
//   }

// mutation {
//     createJob(
//       companyId: "HJRa-DOuG",
//         title: "DevOps",
//         description: "DevOps Job description"
//     )
// }

// mutation {
//     job: createJob(
//       companyId: "HJRa-DOuG",
//         title: "Software Engineer 1",
//         description: "Software Engineer 1 Job description"
//     ) {
//       id,
//       title,
//       description,
//       company {
//         id,
//         name
//       }
//     }
// }

// mutation CreateJob($companyId: ID, $title: String, $description: String) {
//     job: createJob(
//         companyId: $companyId,
//         title: $title,
//         description: $description
//     ) {
//         id,
//         title,
//         description,
//         company {
//             id,
//             name
//         }
//     }
// }

// mutation CreateJob($input: CreateJobInput) {
//     job: createJob(input: $input) {
//       id,
//       title,
//       description,
//       company {
//         id,
//         name
//       }
//     }
// }
// {
//     "input":{"companyId": "HJRa-DOuG",
//         "title": "Software Engineer 1",
//         "description": "Software Engineer 1 Job description"}
//   }  

// {
//     "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyeTlwYndkT3oiLCJpYXQiOjE2MTQyMDg3OTR9.Lb5pD3Li9ho6OZ2IehJPIUWKpVxV-ZtjVtAevDZN63E"
//   }


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.list().find((user) => user.email === email);
    if (!(user && user.password === password)) {
        res.sendStatus(401);
        return;
    }
    const token = jwt.sign({ sub: user.id }, jwtSecret);
    res.send({ token });
});

app.listen(port, () => console.info(`Server started on port ${port}`));