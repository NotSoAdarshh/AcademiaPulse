import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './components/loginPage'
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboardPage'
import SemesterDetails from './components/semesterDetailsPage'
import Planner from './components/plannerPage'
import Tasks from './components/tasksPage'
import Attendence from './components/attendencePage'
import Settings from './components/profileAndSettingsPage'

function App() {
  

  return (
    <Router>
      <div className='bg-bg flex min-h-screen w-full items-start'>
        <Sidebar className ='top-0 sticky'></Sidebar>

        <div className='grow'>
        <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/semester' element={<SemesterDetails/>}></Route>
        <Route path='/planner' element={<Planner/>}></Route>
        <Route path='/tasks' element={<Tasks/>}></Route>
        <Route path='/attendence' element={<Attendence/>}></Route>
        <Route path='/setting' element={<Settings/>}></Route>
      </Routes>
        </div>
      </div>

      
    </Router>
  )
}

export default App
