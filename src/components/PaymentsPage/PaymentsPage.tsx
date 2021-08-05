import React from 'react';
import Header from './subcomponents/header';
import "./PaymentsPage.scss";
import MainComponent from './subcomponents/MainComponent';

const PaymentsPage = (props: any) => {
  var proj_id = props.match.params.projectID;
  return <div>
    <Header  projectid={proj_id} />
    <MainComponent projectid={proj_id} />
  </div>
};


export default PaymentsPage;
