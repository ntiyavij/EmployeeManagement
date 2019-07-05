import React from 'react';
import Header from './header/header'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EmployeeList from './employee/EmployeeList';
import EmployeeDetail from './employee/EmployeeDetail';

function App() {
  return (
    <>
   
   <Router>
   <Header/>
     <Switch>
        <Route path="/employee"  exact component={EmployeeList} />
        <Route path="/employee/:empId"  component={EmployeeDetail} />
        </Switch>
  </Router>
    </>
  );
}

export default App;
