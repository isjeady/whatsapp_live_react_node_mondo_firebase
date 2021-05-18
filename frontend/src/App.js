import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import Chat from './chat/Chat';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js'
import axios from "./axios";

function App() {
  const [messages,setMessages] = useState([]);


  useEffect(() => {
    axios.get("/api/v1/messages/sync").then((response) => {
      //console.log(response)
      setMessages(response.data)
    })
  })


  useEffect(() => {
    const pusher = new Pusher('139e3b7703cbe6a66c04', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe(`messages`);

    channel.bind('inserted', function(newMessage) {
      //alert(JSON.stringify(data));
      setMessages([...messages,newMessage])
    });
 
  }, [])


  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
