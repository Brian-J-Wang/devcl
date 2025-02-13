import CheckList from "./CheckList/CheckList";
import { useParams } from 'react-router-dom';
import { ItemEditor } from './ItemEditor/ItemEditor';
import ItemEditorContext from './ItemEditor/itemEditorContext';
import { useContext, useRef, useState } from 'react';
import { CLItem } from './interfaces';
import CollectionAPI from '../../utils/collectionAPI';
import { UserContext } from '../../Contexts/UserContext';
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb';

import './Collection.css';

const Collection : React.FC = () => {
    const [ activeItem, setActiveItem ] = useState<CLItem>();

    const { id } = useParams();
    const userContext = useContext(UserContext);
    const collectionAPI = useRef<CollectionAPI>(new CollectionAPI('http://localhost:5081/collections', id!, userContext.token));

    return (
        <div className='collection'>
            <BreadCrumb/>
            <ItemEditorContext.Provider value={{ activeItem, setActiveItem }}>
                <CheckList api={collectionAPI.current}/>
                <ItemEditor/>
            </ItemEditorContext.Provider>
        </div>
    );
}

export default Collection;