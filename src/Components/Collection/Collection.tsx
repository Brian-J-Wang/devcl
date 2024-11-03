import { useEffect, useState } from "react";
import { checkListCollection, dummyCheckList, patchNotes, CLItemTO, DBUpdateObject } from '../../CheckList/interfaces';
import './Collection.css';
import PatchNotes from "../../pastVersions/patchNotes";
import { addNewTaskDB, getUserCollection, patchItem, updateTaskDB, updateVersion } from "../../utils/databaseAccess";
import CheckList from "../CheckList/checkList";
import { TextButton } from "../../assets/shared/button/button";

interface ICollection {
    url: string
}

export enum PatchType {
    major,
    minor,
    patch
}

const Collection : React.FC<ICollection> = ({ url: collectionId }) => {

    const [ collection, setCollection ] = useState<checkListCollection>(dummyCheckList);

    useEffect(() => {
        getUserCollection(collectionId)
        .then((collection) => {
            setCollection(collection);
        });
    }, []);

    const onValueChanged = ( item : CLItemTO ) => {
        updateTaskDB(collectionId, item)
        .then((res) => {
            const copy = { ... collection };
            const updatedItem = copy.checkList.find(section => section._id == item.section)?.items.find(item => item._id == res._id);

            if (updatedItem != null) {
                updatedItem.checked = res.checked;
            } 

            setCollection(copy);
        })
    }

    //work is going to have to be done here
    const addNewItem = (item: CLItemTO) => {
        addNewTaskDB(collection._id, item)
        .then((res) => {
            const copy = { ... collection };
            const section = copy.checkList.find(section => section._id == item.section);

            if (!section) {
                console.error('section was not found!');

                return;
            }

            section.items.push(res);
            setCollection(copy);
        })
    }  

    const jumpToCheckList = () => {
        const element = document.getElementById("check-list");
        //@ts-ignore
        element?.scrollIntoView({behavior: "smooth", block:"start"});
    }

    const pushNewVersion = ( patchType: PatchType) => {
        updateVersion(collection._id, patchType).then((patchNotes : patchNotes) => {
            const copy = { ... collection };
            copy.patchNotes.push(patchNotes);

            copy.checkList.forEach((section) => {
                section.items = section.items.filter((item) => !item.checked)
            });

            setCollection(copy);  
        });        
    }

    const onNameChanged = (newName: string) => {
        const update : DBUpdateObject= {
            name: newName,
        }

        console.log(JSON.stringify(update));

        patchItem(collection._id, update);
    }

    useEffect(() => {
        document.getElementById("check-list")?.scrollIntoView({behavior: "instant", block:"end"});
    }, [])

    return (
        <div className="collection">
            <div className="collection__check-list" id="checkList">
                {
                    (collection) ?
                    collection.patchNotes.map((patch, index) => {
                        const isLatest = index == collection.patchNotes.length - 1;
                        return (
                            <PatchNotes key={patch._id} patch={patch} isLatest={isLatest}></PatchNotes>
                        )
                    }) :
                    <></>
                }
                <hr className="collection__divider"/>
                <CheckList 
                handleValueChanged={onValueChanged} 
                handleNewItemAdded={addNewItem} 
                handleVersionUpdate={pushNewVersion} 
                handleNameChanged={onNameChanged}
                checkList={collection}/>
                
            </div>
            <div className="collection__tool-bar">
                <TextButton size="m" onClick={jumpToCheckList}>↓</TextButton>
            </div>
        </div>
        
    );
}

export default Collection;