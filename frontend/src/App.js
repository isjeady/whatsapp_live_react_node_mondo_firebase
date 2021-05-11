import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import Chat from './chat/Chat';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js'

function App() {
  const [message,setMessage] = useState("MESSAGGIO");

  useEffect(() => {
    const pusher = new Pusher('139e3b7703cbe6a66c04', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe(`messages`);

    channel.bind('inserted', function(data) {
      //alert(JSON.stringify(data));
      setMessage(data.message)
    });
 
  }, [])


  return (
    <div className="app">
      <h1>{message}</h1>
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
