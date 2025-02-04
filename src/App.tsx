import './App.css'
import './assets/DevCL.css'
import { Routes, Route } from 'react-router-dom'
import Collection from './Components/Collection/Collection/Collection'
import { UserCollection } from './Components/UserCollections/UserCollections'
import Home from './Pages/Home/Home'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import { UserContext } from './Contexts/UserContext'
import { useEffect, useRef, useState } from 'react'
import UserAPI from './utils/userAPI'

function App() {
  const userAPI = useRef<UserAPI>(new UserAPI(""));
  const [user, setUser] = useState<any>();

  useEffect(() => {
    //check if local storage has a jwt token
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      userAPI.current.getUser(jwt).then((res) => {
        setUser(res);
      })
    }
  }, [])
  
  return (
    <div className='app'>
      <UserContext.Provider value={{
        user: user,
        api: userAPI.current
      }}>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>}/>
          <Route path='signin' element={<SignIn/>}/>
          <Route path='signup' element={<SignUp/>}/>
        </Route>
        <Route path='collections' element={<UserCollection/>}/>
        <Route path='collections/:id' element={<Collection/>}/>
      </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App
