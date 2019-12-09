import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './Birthdays.css';
import Nav from './components/Nav';
import About from './components/About';
import Home from './components/Home';
import MemberDetail from './components/MemberDetail';
import MemberForm from './components/MemberForm';
import FamilyMap from './components/FamilyMap';
import Members from './components/Members';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
{/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHCzaK8DC8S03bHh6qA_HiWCXrtadhxt4"></script> */}



function App() {
  return (
    <div>
    <Router>
      <Switch>
      <div className="App">
        <div className="background">
          <div className="main">
            <Nav />
            <Route path="/familytree" exact component={Home}/>
            <Route path="/familytree/dashboard" component={Dashboard}/>
            <Route path="/familytree/about" component={About}/>
            <Route path="/familytree/members" exact component={Members}/>
            <Route path="/familytree/members/:id" component={MemberDetail}/>
            <Route path="/familytree/members/new" component={MemberForm}/>
            <Route path="/familytree/members/map" component={FamilyMap}/>
            <Route path="/familytree/members/update/:id" component={MemberForm}/>
            <Route path="/familytree/admin" component={Admin}/>
          </div> 
        </div>
      </div>
      </Switch>
   </Router>
   </div>
  );
}

export default App;
