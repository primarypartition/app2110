import React from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';


const Chat = (props) => {
    const { user } = props;
    const messages = [];

    handleSend(text) {

    }

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