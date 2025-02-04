import './App.css'
import './assets/DevCL.css'
import { Routes, Route } from 'react-router-dom'
import Collection from './Components/Collection/Collection/Collection'
import { UserCollection } from './Components/UserCollections/UserCollections'
import Home from './Pages/Home/Home'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='collections' element={<UserCollection/>}/>
        <Route path='collections/:id' element={<Collection/>}/>
      </Routes>
    </div>
  )
}

export default App
