import React from 'react';
import Main from '../Components/Main/Main';
import useTitle from '../Utils/useTitle';


const AdminDashboard = () => {
  useTitle('Dashboard'); // PAGE TITLE

  return (
    <Main />
  )
}

export default AdminDashboard;