import React, { Component } from 'react';
import { getLoggedInUser, logout } from './auth';
import Chat from './Chat';
import Login from './Login';
import NavBar from './NavBar';

import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/client';

class App extends Component {
    state = { user: getLoggedInUser() };

    handleLogin(user) {
        this.setState({ user });
    }

    handleLogout() {
        logout();
        this.setState({ user: null });
    }

    render() {
        const { user } = this.state;
        if (!user) {
            return <Login onLogin = { this.handleLogin.bind(this) }
            />;
        }
        return ( <
            ApolloProvider client = { client } >
            <
            div >
            <
            NavBar onLogout = { this.handleLogout.bind(this) }
            /> <
            Chat user = { user }
            /> < /
            div >
            <
            /ApolloProvider>
        );
    }
}

export default App;