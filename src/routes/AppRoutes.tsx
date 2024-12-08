import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Protected from './Protected';
import Home from '../views/Home';
import Dashboard from '../views/Dashboard';
import Settings from '../views/Settings';
import Form from '../views/Form';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import TestComponents from '../views/TestComponents';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/form/:category/:id?" element={<Form />} />
          <Route path="/test" element={<TestComponents />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
