import './App.css'
import './assets/DevCL.css'
import { Routes, Route } from 'react-router-dom'
import Collection from './Components/Collection/Collection/Collection'
import Home from './Pages/Home/Home'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import UserCollection from './Pages/UserCollections/UserCollections'
import UserContextProvider from './Contexts/UserContext'
import ModalContextProvider from './Contexts/Modal/ModalContext'

function App() {
  return (
    <ModalContextProvider>
      <div className='app' id='app'>
        <UserContextProvider>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>}/>
            <Route path='signin' element={<SignIn/>}/>
            <Route path='signup' element={<SignUp/>}/>
          </Route>
          <Route path='collections' element={<UserCollection/>}/>
          <Route path='collections/:id' element={<Collection/>}/>
        </Routes>
        </UserContextProvider>
      </div>
    </ModalContextProvider>
  )
}

export default App
