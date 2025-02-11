import { useEffect, useState } from "react";
import formatMessage from "../../../utils/formatMessage";
import { TextButton } from "../../../Components/Button/Button";
import { Container } from "../../../Components/Container/Container";
import Category from "../CLCategory/Category";
import CLPatchElement from "../CLPatch/CLPatch";

import "./CheckList.css"
import CollectionAPI, { PatchType } from "../../../utils/collectionAPI";
import { CLCollection, CLItem, CLItemPatch } from "../../../Pages/Collection/interfaces";
import CLItemElement from "../CLItem/CLItem";

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

    useEffect(() => {
        api.getCollection().then((res) => {
            setCollection(res);
        });
    }, [])

    const jumpToCheckList = () => {
        document.getElementById("check-list")!.scrollIntoView({behavior: "smooth", block:"start"});
    }

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

    return (
        <div className="container-cl">
            <div className="check-list" id="checkList">
                {
                    collection.patches.map((patch, index) => {
                        const isLatest = collection.patches.length - 1 == index;

                        return (<CLPatchElement key={patch._id} patch={patch} isLatest={isLatest}></CLPatchElement>)
                    })
                }
                <hr className="check-list__divider"/>
                <div className='check-list__container' id='check-list' tabIndex={0}>
                    <div>
                        <Container className='check-list__tool-bar_h'>
                            <button onClick={copyToClipboard}> Copy </button>
                            <button onClick={pushNewVersion(PatchType.major)}> Major Version </button>
                            <button onClick={pushNewVersion(PatchType.minor)}> Minor Version </button>
                            <button onClick={pushNewVersion(PatchType.patch)}> Patch </button>
                        </Container>
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
            </div>
            <div className="check-list__tool-bar_v">
                <TextButton size="m" onClick={jumpToCheckList}>↓</TextButton>
            </div>
        </div>
    );
}

export default CheckList;