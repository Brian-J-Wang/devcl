import './App.css'
import './assets/DevCL.css'
import { Routes, Route } from 'react-router-dom'
import Collection from './Pages/Collection/Collection'
import Home from './Pages/Home/Home'
import UserCollection from './Pages/UserCollections/UserCollections'
import UserContextProvider from './Contexts/UserContext'
import ModalContextProvider from './Contexts/Modal/ModalContext'
import NavBar from './Components/NavBar/Navbar'

function App() {
  return (
    <UserContextProvider>
    <ModalContextProvider>
      <div className='app' id='app'>
        <NavBar>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='collections' element={<UserCollection/>}/>
            <Route path='collections/:id' element={<Collection/>}/>
          </Routes>
        </NavBar>
      </div>
    </ModalContextProvider>
    </UserContextProvider>
  )
}

export default App
