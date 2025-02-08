import './Collection.css';
import DatabaseContext from "../CollectionContext/collectionContext";
import CheckList from "../CheckList/CheckList";
import { useParams } from 'react-router-dom';
import { ItemEditor } from '../ItemEditor/ItemEditor';
import ItemEditorContext from '../ItemEditor/itemEditorContext';
import { createContext, useContext, useRef, useState } from 'react';
import { CLItem } from '../DBCollection';
import CollectionAPI from '../../../Contexts/CollectionAPI/CollectionAPI';
import { UserContext } from '../../../Contexts/UserContext';
export enum PatchType {
    major,
    minor,
    patch
}



const Collection : React.FC = () => {
    const { id } = useParams();
    const userContext = useContext(UserContext);
    const collectionAPI = useRef<CollectionAPI>(new CollectionAPI('http://localhost:5081/collections', id!, userContext.token));


    const [ activeItem, setActiveItem ] = useState<CLItem>();

    return (
        <div className='collection'>
            <ItemEditorContext.Provider value={{ activeItem, setActiveItem }}>
            <DatabaseContext>
                <CheckList api={collectionAPI.current}/>
                <ItemEditor/>
            </DatabaseContext>
            </ItemEditorContext.Provider>
        </div>
    );
}

export default Collection;