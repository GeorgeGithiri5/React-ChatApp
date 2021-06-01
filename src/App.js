import React from "react";
import "./App.css";
import { ChatEngine } from 'react-chat-engine'
import ChatFeed from './components/ChatFeed'

class App extends React.Component{
  render(){
    return(
      <>
        <ChatEngine
            height = '100vh'
            projectID = "4fc4b474-5e0e-46c9-9b85-d381aabe3828"
            userName = "GeorgeGithiri"
            userSecret = "12345" 
            renderChatFeed = {(chatAppProps)=><ChatFeed {...chatAppProps}/>}
        />
      </>
    )
  }
}

export default App;
