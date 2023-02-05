import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Courses from './Courses'
import Gallery from './components/Gallery/Gallery'
import Home from './components/Landing_page/Home'
import News from './components/News/News'
import QA from './components/QA/QA'
import Footer from './components/Navbar/Footer'
import Header from './components/Navbar/Header'
import Login from './components/Login/Login'
import Register from './components/Login/Register'
import About from './components/About/About'
import Profile from './Profile'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/qa" element={<QA />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
