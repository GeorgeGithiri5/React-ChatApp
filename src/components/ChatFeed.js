import { index } from 'd3-array'
import React from 'react'
import { Left } from 'react-bootstrap/lib/Media'
import MessageForm from './MessageForm'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'

const ChatFeed = (props)=>{
    const {chats, activeChat, userName, messages} = props;
    const chat = chats && chats[activeChat]
    const renderReadReceipt = (message, isMyMessage)=>{
        chat.people.map((person, index)=>person.last_read=== message.id && (
            <div key={`read_${index}`}
                className = "read-receipt"
                style = {{
                    float: isMyMessage? 'right' : 'left',
                    backgroundImage: `url(${person.person.avatar})`
                }}
            />
        ))
    }

    console.log(chat, userName, messages)

    const renderMessages = ()=>{
        const keys = Object.keys(messages)
        return keys.map((key, index)=>{
            const message = messages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const isMyMessage = userName === message.sender.username;
            return(
                <div key={`msg_${index}`} style = {{width:'100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage
                            ? <MyMessage message = {message} />
                            : <TheirMessage message = {message} lastMessage = {message[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{marginRight: isMyMessage ? "18px" : '0px', marginLeft: isMyMessage ? '0px':'68px'}}>
                        {renderReadReceipt(message, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    if(!chat) return "Loading.."

    return(
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">
                    {chat.title}
                </div>
                <div className="chat-subtitle">
                    {chat.people.map((person)=>`${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div className={{ height: '100px'}}/>
            <div className="message-form-container">
                <MessageForm {...props} chatId = {activeChat} />
            </div>
        </div>
    )
}

export default ChatFeed