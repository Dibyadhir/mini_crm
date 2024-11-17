import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import ContactForm from "./components/ContactForm";
import ViewContData from './components/ViewContacts';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/addcontdata' element={<ContactForm />} />
          <Route path='/viewcontdata' element={<ViewContData />}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
