import './App.css';
import Sidebar from './sidebar/Sidebar';
import Chat from './chat/Chat';
import Login from './auth/Login';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';
import { loadFromLocalStorage} from "./localStore"

function App() {
  const [{user}] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
        <Router>
          <Switch>
            <Route path="/rooms/:roomId">
              <Sidebar />
              <Chat />
            </Route>
            <Route path="/">
            <Sidebar />
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
