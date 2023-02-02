import React from 'react'
import About from './components/About/About'
import Courses from './Courses'
import Gallery from './Gallery'
import Home from './components/Landing_page/Home'
import News from './components/News/News'
import QA from './QA'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Navbar/Footer'
import Header from './components/Navbar/Header'
import Login from './components/Login/Login'
import Register from './components/Login/Register'

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
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
