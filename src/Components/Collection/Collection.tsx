"use strict";

import { useEffect, useState } from "react";
import { checkListCollection,  CLItem, checkListSection, dummyCheckList, patchNotes, valueChangedData, CLItemTO } from '../../CheckList/interfaces';
import './Collection.css'
import PatchNotes from "../../pastVersions/patchNotes";
import CheckList from "../CheckList/checkLIst"
import { addNewTaskDB, getUserCollection, updateTaskDB, updateVersion } from "../../utils/databaseAccess";

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
        const element = document.getElementById("dummyElement");
        //@ts-ignore
        element?.scrollIntoView({behavior: "smooth", block:"end"});
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

    useEffect(() => {
        document.getElementById("checkList")?.scrollIntoView({behavior: "instant", block:"end"});
    }, [])

    return (
        <div className="collection">
            <div className="collection__check-list" id="checkList">
                {
                    (collection) ?
                    collection.patchNotes.map((patch) => {
                        return (
                            <PatchNotes key={patch._id} patch={patch}></PatchNotes>
                        )
                    }) :
                    <></>
                }
                <hr className="collection__divider"/>
                <div id="dummyElement"></div>
                <CheckList handleValueChanged={onValueChanged} handleNewItemAdded={addNewItem} handleVersionUpdate={pushNewVersion} checkList={collection}></CheckList>
            </div>
            <div className="collection__tool-bar">
                <button className="collection__tool-bar-quick-jump" onClick={jumpToCheckList}>↓</button>
            </div>
        </div>
        
    );
}

export default Collection;