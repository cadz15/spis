import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import AdminCourses from '../Pages/AdminCourses';
import AdminDashboard from '../Pages/AdminDashboard';
import AdminDocument from '../Pages/AdminDocument';
import AdminEvent from '../Pages/AdminEvent';
import AdminQuery from '../Pages/AdminQuery';
import AdminScholarship from '../Pages/AdminScholarship';
import AdminSMSBlast from '../Pages/AdminSMSBlast';
import UnknownError from '../Pages/Error/UnknownError';
import Landing from '../Pages/Landing/Landing';
import ListScholar from '../Pages/ListScholar';
import Profile from '../Pages/Profile';
import RegisterScholar from '../Pages/RegisterScholar';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/admin'  element={<div> <AdminLayout > <Outlet /> </AdminLayout></div> } >
        <Route path='/admin'  element={<AdminDashboard />} />
        <Route path='dashboard'  element={<AdminDashboard />} />
        <Route path='event'  element={<AdminEvent />} />
        <Route path='smsblast'  element={<AdminSMSBlast />} />
        <Route path='scholarship'  element={<AdminScholarship />} />
        <Route path='courses'  element={<AdminCourses />} />
        <Route path='register'  element={<RegisterScholar />} />
        <Route path='list'  element={<ListScholar />} />
        <Route path='scholardocument'  element={<AdminDocument />} />
        <Route path='query'  element={<AdminQuery />} />
        <Route path='profiles'  element={<Profile />} />
      </Route>
      <Route path='/scholar'  element={<div> <AdminLayout > <Outlet /> </AdminLayout></div> } >
        <Route path='/scholar'  element={<AdminDashboard />} />
        <Route path='dashboard'  element={<AdminDashboard />} />
        <Route path='event'  element={<AdminEvent />} />
        <Route path='scholardocument'  element={<AdminDocument />} />
        <Route path='query'  element={<AdminQuery />} />
        <Route path='profiles'  element={<Profile />} />
      </Route>


        
      <Route path='/'  element={<Landing />} />
      <Route path='*'  element={<UnknownError />} />

    </Routes>
  )
}

export default AppRoutes;