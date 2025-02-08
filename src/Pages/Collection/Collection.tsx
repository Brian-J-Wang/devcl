import './Collection.css';
import CheckList from "./CheckList/CheckList";
import { useParams } from 'react-router-dom';
import { ItemEditor } from './ItemEditor/ItemEditor';
import ItemEditorContext from './ItemEditor/itemEditorContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { CLItem } from './interfaces';
import CollectionAPI from '../../Contexts/CollectionAPI/collectionAPI';
import { UserContext } from '../../Contexts/UserContext';
import { NavBarContext } from '../../Components/NavBar/Navbar';

const Collection : React.FC = () => {
    const [ activeItem, setActiveItem ] = useState<CLItem>();

    const { id } = useParams();
    const userContext = useContext(UserContext);
    const collectionAPI = useRef<CollectionAPI>(new CollectionAPI('http://localhost:5081/collections', id!, userContext.token));

    const navBarContextConsumer = useContext(NavBarContext);
    useEffect(() => {
        navBarContextConsumer.setVisible(false);

        return () => {
            navBarContextConsumer.setVisible(true);
        }
    }, []);

    return (
        <div className='collection'>
            <ItemEditorContext.Provider value={{ activeItem, setActiveItem }}>
                <CheckList api={collectionAPI.current}/>
                <ItemEditor/>
            </ItemEditorContext.Provider>
        </div>
    );
}

export default Collection;