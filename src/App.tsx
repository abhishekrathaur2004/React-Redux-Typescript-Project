import './App.css'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Footer from './component/Footer'
import { Route, Routes } from 'react-router-dom'

import NotFound from './pages/NotFound'
import SingleCharacter from './pages/SingleCharacter'
import SingleEpisode from './pages/SingleEpisode'
import SingleLocation from './pages/SingleLocation'
import SearchPage from './pages/SearchPage'
function App() {
  
  
  return (
    <div className='app scroll-smooth'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/search" element={<SearchPage/>}></Route>
        <Route path='/character/:characterid' element = {<SingleCharacter/>}/>
        <Route path='/episode/:episodeid' element = {<SingleEpisode/>}/>
        <Route path='/location/:locationid' element = {<SingleLocation/>}/>

        {/* optional route just for the sake of no error /location/id or /home/location/id */}

        <Route path='/home/character/:characterid' element = {<SingleCharacter/>}/>
        <Route path='/home/episode/:episodeid' element = {<SingleEpisode/>}/>
        <Route path='/home/location/:locationid' element = {<SingleLocation/>}/>
        
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    
      <Footer/>
    </div>
  )
}

export default App
