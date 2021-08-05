import React, { Component } from 'react';
// @ts-ignore
import { Route, BrowserRouter as Router } from 'react-router-dom'
import PaymentsPage from '../PaymentsPage';
const App = () => {
  return <div>
    <Router>
    <div>
      <Route path="/:projectID" component={PaymentsPage} />
    </div>
  </Router>
  </div>
};

export default App;
