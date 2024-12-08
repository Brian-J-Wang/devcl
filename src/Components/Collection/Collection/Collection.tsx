import './Collection.css';
import DatabaseContext from "../CollectionContext/collectionContext";
import CheckList from "../CheckList/CheckList";
import PopupContext from '../../Contexts/Popup';
import { useParams } from 'react-router-dom';
export enum PatchType {
    major,
    minor,
    patch
}

const Collection : React.FC = () => {
    const { id } = useParams();

    console.log(id);

    return (
        <DatabaseContext>
            <PopupContext>
                <CheckList/>
            </PopupContext>
        </DatabaseContext>
    );
}

export default Collection;