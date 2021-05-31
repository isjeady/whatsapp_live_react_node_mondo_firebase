import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import Chat from './chat/Chat';
import Login from './auth/Login';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js'
import axios from "./axios";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';
import { loadFromLocalStorage} from "./localStore"

function App() {
  const [messages,setMessages] = useState([]);
  const [{user},dispatch] = useStateValue();
  //const [user,setUser] = useState();


  useEffect(() => {
    axios.get("/api/v1/messages/sync").then((response) => {
      //console.log(response)
      setMessages(response.data)
    })
  },[messages])


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
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat messages={messages} />
            </Route>
            <Route path="/">
              <div class="info-center">
                <div class="info-center-item">
                  <Avatar src={loadFromLocalStorage("user")?.photoURL}></Avatar>
                </div>
                <div class="info-center-item">
                   {loadFromLocalStorage("user")?.displayName}
                </div>
                <div class="info-center-item">
                  Seleziona una Chat!
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
