import './App.css'
import './assets/DevCL.css'
import { Routes, Route } from 'react-router-dom'
import Collection from './Components/Collection/Collection/Collection'
import { UserCollection } from './Components/UserCollections/UserCollections'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='collections' element={<UserCollection/>}/>
        <Route path='collections/:id' element={<Collection/>}/>
      </Routes>
    </div>
  )
}

export default App
