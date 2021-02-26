# GraphQL

> https://graphql.org/

> https://www.apollographql.com/docs/apollo-server/getting-started/

> https://www.apollographql.com/docs/react/

> https://github.com/davidyaha/graphql-redis-subscriptions


# Commands

> npm install apollo-server graphql

> npm install apollo-server-express graphql

> npm install apollo-boost graphql

> node server.js

> npm install

> npm start

> npm install graphql-subscriptions

> npm install apollo-link-ws subscriptions-transport-ws

> npm install @apollo/react-hooks


# Server 

> node server.js

> npm start


# Apollo Client 3.0

```
https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/

Need only the core client functionality, without any framework-specific integration? Install @apollo/client. Need WebSockets and subscriptions? That's already in @apollo/client, no need to install additional packages. React hooks? Yep, they're in @apollo/client as well.

All the classes and functions we used in the course are still the same, they just need to be imported from the new package. Examples below.

Core Apollo Client

In the Job Board application we installed apollo-boost and wrote this code:

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';

To use Apollo Client 3.0 instead simply install @apollo/client instead of apollo-boost and change the import to be:

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';

WebSockets

In the Chat application we added support for WebSockets and subscription by installing an additional apollo-link-ws package and using the WebSocketLink class:

import { WebSocketLink } from 'apollo-link-ws';
That class is now available in @apollo/client and can be imported as follows:

import { WebSocketLink } from '@apollo/client/link/ws';
React Hooks

Instead of installing @apollo/react-hooks and importing:

import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';

all the hooks are now in @apollo/client:

import { useQuery, useMutation, useSubscription } from '@apollo/client';

```