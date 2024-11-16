import { ReactNode, useState } from 'react';
import './App.css'
import './assets/DevCL.css'
import Collection from './Components/Collection/Collection/Collection';
import { Popup } from './Components/Popup/Popup';
import PopupContext from './Components/Popup/PopupContext';
import DatabaseContext from './Components/Collection/CollectionContext/collectionContext';

function App() {

  const [activePopup, setActivePopup] = useState<ReactNode | null>();

  return (
    <div className='app'>
      <PopupContext.Provider value={{openPopup: setActivePopup}}>
      <DatabaseContext>
        <Collection collectionId={'67201b8d79cef1f65b14da4a'}></Collection>
        <Popup activePopup={activePopup}/>
      </DatabaseContext>
      </PopupContext.Provider>
      
    </div>
  )
}

export default App
