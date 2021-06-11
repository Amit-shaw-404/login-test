import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './pages/signIn';
import DashBoard from './pages/dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn}/>
        <Route exact path="/:id" component={DashBoard}/>
      </Switch>
    </Router>
  );
}

export default App;
