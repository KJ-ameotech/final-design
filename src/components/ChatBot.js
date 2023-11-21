import React, { useState } from "react";

function ChatBot() {
    const [bot, setBot] = useState(false);
    const [msgTyping, setMsgTyping] = useState('');
    const msgs = [
        {
            id: 1,
            sender: 'bot',
            message: 'Hi, How can I help you?'
        },
        {
            id: 2,
            sender: 'user',
            message: 'Tell me about your website.'
        },
        {
            id: 3,
            sender: 'bot',
            message: 'Please visit - http://localhost:3000/about'
        },
    ]
    const [messages, setMessages] = useState(msgs);
    const handelMsg = (e) => {
        let value = e.target.value;
        setMsgTyping(value);
    }
    const sendMsg = (e) => {
        let items = document.getElementsByClassName('item');
        let id = Number(items[items.length - 1].id) + 1;
        let newMsg = {
            id: id,
            sender: 'user',
            message: msgTyping
        }
        setMessages(prevMsgs => [...prevMsgs, newMsg]);
        console.log('messages>>>', messages);
        setMsgTyping('');
    }
    return (
        <>
            <div className="chat-bot">
                {bot ?
                    <div class="wrapper">
                        <div class="title">Chat Support
                            <span onClick={() => { setBot(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg close-chat" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </span>
                        </div>
                        <div class="box">
                            {messages.map((message, index) => (
                                <>
                                    <div class={`item   ${message.sender === 'bot' ? 'left col-md-12' : 'right'}`} id={message.id}>
                                        <div class="msg">
                                            <p className="messages">{message.message}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div class="typing-area">
                            <div class="input-field">
                                <input type="text" placeholder="Type your message" value={msgTyping} onChange={handelMsg} />
                                {msgTyping.length >= 4 ? <button onClick={sendMsg}>Send</button> : ''}
                            </div>
                        </div>
                    </div>
                    :
                    <button className="chat-btn" onClick={() => { setBot(true) }}>
                        <img className="chat-bot-img" src="/chat-bot.png" />
                    </button>
                }
            </div>
        </>
    )
}

export default ChatBot;