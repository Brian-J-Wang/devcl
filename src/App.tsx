import './App.css'
import './assets/DevCL.css'
import { Routes, Route } from 'react-router-dom'
import Collection from './Pages/Collection/Collection'
import Home from './Pages/Home/Home'
import UserCollection from './Pages/UserCollections/UserCollections'
import UserContextProvider from './Contexts/UserContext'
import ModalContextProvider from './Contexts/Modal/ModalContext'
import { NavBarContextProvider } from './Components/NavBar/Navbar'
import ProtectedRoute from './Components/Protected/ProtectedRoute'

function App() {
  return (
    <UserContextProvider>
    <ModalContextProvider>
    <NavBarContextProvider>
      <div className='app' id='app'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='collections' element={<UserCollection/>}/>
            <Route path='collections/:id' element={<Collection/>}/>
          </Route>
          
        </Routes>
      </div>
    </NavBarContextProvider>
    </ModalContextProvider>
    </UserContextProvider>
  )
}

export default App
