import CheckList from "./CheckList/CheckList";
import { useParams } from 'react-router-dom';
import ItemEditorContext from './ItemEditor/itemEditorContext';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { CLCategories, CLPatch, Collaborators } from './interfaces';
import CollectionAPI, { Task, TaskRequest } from '../../utils/collectionAPI';
import { UserContext } from '../../Contexts/UserContext';
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb';

import './Collection.css';
import CheckListOutline from "./CollectionSidebar/CollectionSidebar";
import InvalidView from "./Views/InvalidView/InvalidView";
import CollaboratorView from "./Views/CollaboratorView/CollaboratorView";
import { ItemEditor } from "./ItemEditor/ItemEditor";

interface CollectionContextProps {
    name: string,
    version: string,
    categories: CLCategories[],
    patches: CLPatch[],
    items: Task[],
    collaborators: Collaborators[]
}

export const CollectionContext = createContext<CollectionContextProps>({
    name: "",
    version: "",
    categories: [],
    patches: [],
    items: [],
    collaborators: []
});

interface CollaboratorApiProps {
    addCollaborator: (alias: string, email: string) =>  Promise<any>;
    removeCollaborator: (alias: string) =>  Promise<any>;
}

export const CollaboratorApiContext = createContext<CollaboratorApiProps>({
    addCollaborator: () => Promise.reject(),
    removeCollaborator: () => Promise.reject()
})

interface CategoryApiProps {
    addCategory: (name: string, format: string) => Promise<any>,
    deleteCategory: (id: string) => Promise<any>,
    editCategory: () => Promise<any>
}

export const CategoryApiContext = createContext<CategoryApiProps>({
    addCategory: () => Promise.reject(),
    deleteCategory: () => Promise.reject(),
    editCategory: () => Promise.reject()
})

interface ItemApiProps {
    postItem: (request: TaskRequest) => Promise<any>,
    updateItem: (request: TaskRequest) => Promise<any>,
    deleteItem: (request: TaskRequest) => Promise<any>
}

export const ItemApiContext = createContext<ItemApiProps>({
    postItem: () => Promise.reject(),
    updateItem: () => Promise.reject(),
    deleteItem: () => Promise.reject()
})

const Collection : React.FC = () => {
    const [ activeItem, setActiveItem ] = useState<Task>();

    const { id } = useParams();
    const userContext = useContext(UserContext);
    const backend = useRef<CollectionAPI>(new CollectionAPI('http://localhost:5081/collections', id!, userContext.token));

    useEffect(() => {
        backend.current = new CollectionAPI('http://localhost:5081/collections', id!, userContext.token)
    }, [userContext.token]);

    const [name, setName] = useState<string>("");
    const [version, setVersion] = useState<string>("");
    const [categories, setCategories] = useState<CLCategories[]>([]);
    const [patches, setPatches] = useState<CLPatch[]>([]);
    const [items, setItems] = useState<Task[]>([]);
    const [collaborators, setCollaborators] = useState<Collaborators[]>([]);

    useEffect(() => {
        backend.current.getCollection().then((res) => {
            setName(res.name);
            setVersion(res.version);
            setCategories(res.categories);
            setPatches(res.patches);
            setItems(res.items);
            setCollaborators(res.collaborators);
        });
    }, []);

    //Collaborator Apis
    const addCollaborator = (alias: string, email: string) => {
        return backend.current.addCollaborator(alias, email).then((res) => {
            const copy = [ ...collaborators ];
            copy.push(res);
            console.log(res);
            setCollaborators(copy);
        });
    }

    const removeCollaborator = (alias: string) => {
        return backend.current.removeCollaborator(alias).then(() => {
            const copy = [...collaborators].filter((collaborators) => collaborators.alias != alias);
            setCollaborators(copy);
        });
    }

    //Category Apis
    const addCategory = (name: string, format: string) => {
        return backend.current.addCategory(name, format).then((res) => {
            const copy = [ ...categories ];
            copy.push({
                _id: res._id,
                name: res.name,
                format: res.format
            })
            setCategories(copy);
        });
    }

    const deleteCategory = (id: string) => {
        return backend.current.deleteCategory(id).then((res) => {
            const copy = [ ...categories ];
            setCategories(copy.filter(item => item._id != res._id))
        });
    } 

    const editCategory = () => {
        return Promise.reject("Not Implemented");
    }

    //Item Api
    const postItem = (request: TaskRequest) => {
        return backend.current.postItem(request).then((res) => {
            const copy = [ ...items ];
            copy.push(res);
            setItems(copy);
        })
    }

    const updateItem = (request: TaskRequest) => {
        return backend.current.updateItem(request).then((res) => {
            const copy = [ ...items ];
            const item = copy.find((item) => item._id == res._id);

            if (!item) return;
            if (res.blurb) item.blurb = res.blurb;

            Object.keys(res.attributes).forEach((key) => {
                item.attributes[key] = res.attributes[key]
            });
            
            setItems(copy);
        });
    }

    const deleteItem = (request: TaskRequest) => {
        return backend.current.deleteItem(request).then(() => {
            const copy = [ ...items ];
            setItems(copy.filter(item => item._id != request._id));
        });
    }

    const [ activePage, setActivePage ] = useState<string>("");

    return (
        <div className='collection'>
            <BreadCrumb/>
            <CollectionContext.Provider value={{
                name: name,
                version: version,
                categories: categories,
                patches: patches,
                items: items,
                collaborators: collaborators
            }}>
            <CollaboratorApiContext.Provider value={{
                addCollaborator,
                removeCollaborator
            }}>
            <CategoryApiContext.Provider value={{
                addCategory,
                deleteCategory,
                editCategory
            }}>
            <ItemApiContext.Provider value={{
                postItem,
                updateItem,
                deleteItem
            }}>
                <ItemEditorContext.Provider value={{ activeItem, setActiveItem }}>
                <CheckListOutline setActivePage={setActivePage}/>
                <div className="collection__content">
                    { RenderRightPanel(activePage) }
                </div>
                <ItemEditor/>
                </ItemEditorContext.Provider>
            </ItemApiContext.Provider>
            </CategoryApiContext.Provider>
            </CollaboratorApiContext.Provider>
            </CollectionContext.Provider>
        </div>
    );
}

const RenderRightPanel = (panelName: string) => {
    console.log(panelName);
    if (panelName == "checklist") {
        return (
            <CheckList/>
        )
    } else if (panelName == "collaborators") {
        return (
            <CollaboratorView/>
        )
    } else {
        return (
            <InvalidView/>
        )
    }
}

export default Collection;