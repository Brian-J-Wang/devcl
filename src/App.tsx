import './App.css'
import './assets/DevCL.css'
import { Routes, Route } from 'react-router-dom'
import Collection from './Components/Collection/Collection/Collection'
import { UserCollection } from './Components/UserCollections/UserCollections'
import Home from './Pages/Home/Home'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>}/>
          <Route path='signin' element={<SignIn/>}/>
          <Route path='signup' element={<SignUp/>}/>
        </Route>
        <Route path='collections' element={<UserCollection/>}/>
        <Route path='collections/:id' element={<Collection/>}/>
      </Routes>
    </div>
  )
}

export default App
