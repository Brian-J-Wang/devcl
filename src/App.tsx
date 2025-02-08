import './App.css'
import './assets/DevCL.css'
import { Routes, Route } from 'react-router-dom'
import Collection from './Components/Collection/Collection/Collection'
import Home from './Pages/Home/Home'
import UserCollection from './Pages/UserCollections/UserCollections'
import UserContextProvider from './Contexts/UserContext'
import ModalContextProvider from './Contexts/Modal/ModalContext'
import UserCollectionContextProvider from './Contexts/UserCollectionAPI/UserCollectionApiContext'
import NavBar from './Components/NavBar/Navbar'

function App() {
  return (
    <UserContextProvider>
    <ModalContextProvider>
      <div className='app' id='app'>
        <NavBar>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route element={<UserCollectionContextProvider/>}>
              <Route path='collections' element={<UserCollection/>}/>
              <Route path='collections/:id' element={<Collection/>}/>
            </Route>
          </Routes>
        </NavBar>
      </div>
    </ModalContextProvider>
    </UserContextProvider>
  )
}

export default App
