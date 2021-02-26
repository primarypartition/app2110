import React, { useState } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { messagesQuery, addMessageMutation, messageAddedSubscription } from './graphql/queries';

const Chat = (props) => {
    const [messages, setMessages] = useState([]);
    // const result = useQuery(messagesQuery);
    // const result = useQuery(messagesQuery, {});
    // console.log(result);

    useQuery(messagesQuery, {
        onCompleted: (data) => {
            setMessages(data.messages);
        }
    });

    const sResult = useSubscription(messageAddedSubscription, {
        onSubscriptionData: (result) => {
            // console.log(result);
            const data = result.subscriptionData.data;
            setMessages(data.messageAdded);
        }
    });

    const { user } = props;

    const [addMessage, mResult] = useMutation(addMessageMutation);
    // mresult have {loading, error, data, called}

    // const [messages, setMessages] = useState([]);
    // const messages = result.data ? result.data.messages : [];

    const handleSend = async(text) => {
        // const message = { id: '', from: '', text };
        // setMessages(messages.concat(message));
        const response = await addMessage({ variables: { input: { text } } });
        // console.log(response);
    };

    // if (result.loading) return "loading...";
    // if (result.error) return "error...";

    return ( <
        section className = "section" >
        <
        div className = "container" >
        <
        h1 className = "title" > Chatting as { user } < /h1> <
        MessageList user = { user }
        messages = { messages }
        /> <
        MessageInput onSend = { handleSend }
        /> < /
        div > <
        /section>
    );
}


export default Chat;