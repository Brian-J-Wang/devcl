import { useEffect, useMemo, useState } from "react";
import formatMessage from "../../../utils/formatMessage";
import { Container } from "../../../Components/Container/Container";
import Category from "../CLCategory/Category";

import "./CheckList.css"
import CollectionAPI, { PatchType } from "../../../utils/collectionAPI";
import { CLCollection, CLItem, CLItemPatch } from "../../../Pages/Collection/interfaces";
import CLItemElement from "../CLItem/CLItem";
import Outline from "./Outline/Outline";
import SubSection from "./Outline/SubSection/SubSection";

interface CheckListProps {
    api: CollectionAPI;
}

const CheckList: React.FC<CheckListProps> = ({ api }) => {
    const [collection, setCollection] = useState<CLCollection>({
        _id: "",
        name: "",
        owner: "",
        version: "",
        categories: [],
        patches: [],
        items: []
    });

    const buildCategoryOutline = (): {
        _id: string,
        name: string,
        details: string
    }[]  => {
        return collection.categories.map((category) => {
            let numItemsCompleted = 0;
            let totalItems = 0;

            collection.items.forEach((item) => {
                if (item.category == category._id) {
                    numItemsCompleted += item.checked ? 1 : 0;
                    totalItems++;
                }
            })
            return {
                _id: category._id,
                name: category.name,
                details: `${numItemsCompleted}/${totalItems}`
            }
        })
    }
    const outlineCategory = useMemo( buildCategoryOutline , [collection]);

    

    useEffect(() => {
        api.getCollection().then((res) => {
            setCollection(res);
        });
    }, [])

    const copyToClipboard = () => {
        if (collection) {
            const message = formatMessage(collection);
            navigator.clipboard.writeText(message);
        }
    }

    const pushNewVersion = ( patchType: PatchType) => {
        return () => {
            api.pushPatch(patchType).then((res) => {
                const copy = { ...collection };
                copy.patches.push(res);
                setCollection(copy);
            })
        }
        
    }

    const handleKeyboardInput = (evt: any) => {
        if (evt.key == "Enter") {   }
    }

    const handleInputBlur = (evt: any) => {
        updateCheckListName(evt.target.value);
    }

    const updateCheckListName = (newName: string) => { 
        console.log(newName);
     }

    //moves the scroll wheel to the checklist
    useEffect(() => {
        document.getElementById("check-list")?.scrollIntoView({behavior: "instant", block:"end"});
    }, []);

    const addNewItem = (categoryId: string, blurb: string) => {
        return api.addNewItem(categoryId, blurb).then((res) => {
            const copy = { ...collection };
            copy.items.push(res);
            setCollection(copy);
        })
    }

    const updateItem = (itemId: string, update: CLItemPatch) => {
        return api.updateItem(itemId, update).then((res) => {
            const copy = { ...collection };
            copy.items.find((item) => item._id == itemId)!.checked = res.checked;
            setCollection(copy);
        })
    }

    const deleteItem = (itemId: string) => {
        return api.deleteItem(itemId).then(() => {
            const copy = { ...collection };
            copy.items = copy.items.filter(item => item._id != itemId);
            setCollection(copy);
        })
    }

    const handleNewCategory = (evt: React.KeyboardEvent) => {
        if (evt.key == 'Enter') {
            const target = (evt.target as HTMLInputElement);
            api.addNewCategory(target.value).then((res) => {
                const copy = { ...collection };
                copy.categories.push({
                    _id: res._id,
                    name: res.name,
                    format: res.format
                })
                setCollection(copy);
                target.value = "";
            });
        }
    }

    return (
        <div className='collection'>
            <Outline>
                <SubSection name="Collaborators" expanded={false}>
                    <></>
                </SubSection>
                <SubSection name="Patches" expanded={false}>
                    <></>
                </SubSection>
                <SubSection name={"Categories"} expanded={true}>
                    {
                        outlineCategory.map((item) => (
                            <div key={item._id} className="">
                                <h4 className="subsection__list-item-title">{item.name}</h4>
                                <small className="subsection__list-item-detail">{item.details}</small>
                            </div>
                        ))
                    }
                </SubSection>
            </Outline>
            <div className="collection__content">
                {/* <Container className='check-list__tool-bar_h'>
                    <button onClick={copyToClipboard}> Copy </button>
                    <button onClick={pushNewVersion(PatchType.major)}> Major Version </button>
                    <button onClick={pushNewVersion(PatchType.minor)}> Minor Version </button>
                    <button onClick={pushNewVersion(PatchType.patch)}> Patch </button>
                </Container> */}
                <Container className="check-list__items">
                    <div className='check-list__header'>
                        <input id="check-list__name" className='check-list__name' type="text" defaultValue={collection.name} onKeyDown={handleKeyboardInput} onBlur={handleInputBlur}/>
                    </div>
                    {
                        collection.categories.map((category) => {
                            return (
                                <Category key={category._id} name={category.name} id={category._id} addNewItem={addNewItem}> 
                                    {
                                        collection.items.filter((item) => {
                                            return item.category == category._id
                                        }).map((item) => {
                                            return <CLItemElement clItem={item as CLItem} key={item._id} updateItem={updateItem} deleteItem={deleteItem}></CLItemElement>
                                        })
                                    }
                                </Category>
                            )
                        })
                    }

                    <div className='check-list__footer'>Version {collection.version}</div>
                </Container>
            </div>
        </div>
    );
}

export default CheckList;