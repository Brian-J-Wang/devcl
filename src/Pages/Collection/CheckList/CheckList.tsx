import { useEffect, useState } from "react";
import { Container } from "../../../Components/Container/Container";
import Category from "../CLCategory/Category";

import "./CheckList.css"
import CollectionAPI from "../../../utils/collectionAPI";
import { CLCategories, CLItem, CLItemPatch, CLPatch, Collaborators } from "../../../Pages/Collection/interfaces";
import CLItemElement from "../CLItem/CLItem";
import CheckListOutline from "./CheckListOutline/CheckListOutline";

interface CheckListProps {
    api: CollectionAPI;
}

const CheckList: React.FC<CheckListProps> = ({ api }) => {
    const [name, setName] = useState<string>("");
    const [version, setVersion] = useState<string>("");
    const [categories, setCategories] = useState<CLCategories[]>([]);
    const [patches, setPatches] = useState<CLPatch[]>([]);
    const [items, setItems] = useState<CLItem[]>([]);
    const [collaborators, setCollaborators] = useState<Collaborators[]>([]);

    useEffect(() => {
        api.getCollection().then((res) => {
            setName(res.name);
            setVersion(res.version);
            setCategories(res.categories);
            setPatches(res.patches);
            setItems(res.items);
            setCollaborators(res.collaborators);
        });
    }, [])

    const handleKeyboardInput = (evt: any) => {
        if (evt.key == "Enter") {   }
    }

    const handleInputBlur = (evt: any) => {
        updateCheckListName(evt.target.value);
    }

    const updateCheckListName = (newName: string) => { 
        console.log(newName);
    }

    const addNewItem = (categoryId: string, blurb: string) => {
        return api.addNewItem(categoryId, blurb).then((res) => {
            const copy = [ ...items ];
            copy.push(res);
            setItems(copy)
        })
    }

    const updateItem = (itemId: string, update: CLItemPatch) => {
        return api.updateItem(itemId, update).then((res) => {
            const copy = [ ...items ];
            copy.find((item) => item._id == res._id)!.checked = res.checked;
            setItems(copy);
        })
    }

    const deleteItem = (itemId: string) => {
        return api.deleteItem(itemId).then(() => {
            const copy = [ ...items ];
            setItems(copy.filter(item => item._id != itemId));
        })
    }

    const addNewCategory = (name: string, format: string) => {
        return api.addNewCategory(name, format).then((res) => {
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
        return api.deleteCategory(id).then((res) => {
            const copy = [ ...categories ];
            setCategories(copy.filter(item => item._id != res._id))
        })
    }

    const addCollaborator = (alias: string, email: string) => {
        return api.addCollaborator(alias, email).then((res) => {
            const copy = [ ...collaborators ];
            copy.push(res);
            setCollaborators(copy);
        })
    }

    return (
        <>
            <CheckListOutline items={items} categories={categories} patch={patches}
                collaborators={collaborators}
                deleteCategory={deleteCategory}
                createCategory={addNewCategory}
                addCollaborator={addCollaborator}
            />
            <div className="check-list__content">
                <Container className="check-list__items">
                    <div className='check-list__header'>
                        <input id="check-list__name" className='check-list__name' type="text" defaultValue={name} onKeyDown={handleKeyboardInput} onBlur={handleInputBlur}/>
                    </div>
                    {
                        categories.map((category) => {
                            return (
                                <Category key={category._id} name={category.name} id={category._id} addNewItem={addNewItem}> 
                                    {
                                        items.filter((item) => {
                                            return item.category == category._id
                                        }).map((item) => {
                                            return <CLItemElement clItem={item as CLItem} key={item._id} updateItem={updateItem} deleteItem={deleteItem}></CLItemElement>
                                        })
                                    }
                                </Category>
                            )
                        })
                    }

                    <div className='check-list__footer'>Version {version}</div>
                </Container>
            </div>
        </>
    );
}

export default CheckList;