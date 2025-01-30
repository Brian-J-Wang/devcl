import './Collection.css';
import DatabaseContext from "../CollectionContext/collectionContext";
import CheckList from "../CheckList/CheckList";
import { useParams } from 'react-router-dom';
import { ItemEditor } from '../ItemEditor/ItemEditor';
import ItemEditorContext from '../ItemEditor/itemEditorContext';
import { useState } from 'react';
import { CLItem } from '../DBCollection';
export enum PatchType {
    major,
    minor,
    patch
}

const Collection : React.FC = () => {
    const { id } = useParams();
    console.log(id);

    const [ activeItem, setActiveItem ] = useState<CLItem>();

    return (
        <div className='collection'>
            <ItemEditorContext.Provider value={{ activeItem, setActiveItem }}>
            <DatabaseContext>
                <CheckList/>
                <ItemEditor/>
            </DatabaseContext>
            </ItemEditorContext.Provider>
        </div>
    );
}

export default Collection;