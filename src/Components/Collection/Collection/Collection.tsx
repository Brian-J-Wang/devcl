import { useContext, useEffect, useRef, useState } from "react";
import Category from '../CLCategory/Category';
import { TextButton } from "../../../assets/shared/button/Button";
import { Container } from "../../../assets/shared/container/Container";
import formatMessage from "../../../utils/formatMessage";
import CollectionContext from '../collectionContext';
import DBCollection, { CLCollection, CLPatch, emptyCollection } from '../DBCollection';
import CLPatchElement from '../CLPatch/CLPatch';

import './Collection.css';
import {DBContext} from "../CollectionContext/collectionContext";

interface ICollection {
    collectionId: string
}

export enum PatchType {
    major,
    minor,
    patch
}

const Collection : React.FC<ICollection> = () => {
    const database = useContext(DBContext);

    const jumpToCheckList = () => {
        const element = document.getElementById("check-list");
        //@ts-ignore
        if (element) {
            element.scrollIntoView({behavior: "smooth", block:"start"});
        }
    }

    const copyToClipboard = () => {
        if (database.collection) {
            const message = formatMessage(database.collection);
            navigator.clipboard.writeText(message);
        }
    }

    const pushNewVersion = ( patchType: PatchType) => {
        database.shared.postPatch(patchType);
    }

    const handleKeyboardInput = (evt: any) => {
        if (evt.key == "Enter") {   }
    }

    const handleInputBlur = (evt: any) => {
        updateCheckListName(evt.target.value);
    }

    const updateCheckListName = (newName: string) => {  }

    useEffect(() => {
        document.getElementById("check-list")?.scrollIntoView({behavior: "instant", block:"end"});
    }, []);

    return (
        <div className="collection">
            <div className="collection__check-list" id="checkList">
                {
                    database.collection.patches.map((patch, index) => {
                        const isLatest = database.collection.patches.length - 1 == index;

                        return (<CLPatchElement key={patch._id} patch={patch} isLatest={isLatest}></CLPatchElement>)
                    })
                }
                <hr className="collection__divider"/>
                <div className='collection__container' id='check-list' tabIndex={0}>
                    <div>
                        <Container className='collection__tool-bar_h'>
                            <button onClick={copyToClipboard}> Copy </button>
                            <button onClick={() => pushNewVersion(PatchType.major)}> Major Version </button>
                            <button onClick={() => pushNewVersion(PatchType.minor)}> Minor Version </button>
                            <button onClick={() => pushNewVersion(PatchType.patch)}> Patch </button>
                        </Container>
                        <Container className="collection__items">
                            <div className='collection__header'>
                                <input id="check-list__name" className='collection__name' type="text" defaultValue={database.collection.name} onKeyDown={handleKeyboardInput} onBlur={handleInputBlur}/>
                            </div>
                            {
                                database.collection.categories.map((category) => {
                                    return (
                                        <Category key={category._id} clCategory={category}/>
                                    )
                                })
                            }

                            <div className='collection__footer'>Version {database.collection.version}</div>
                        </Container>
                    </div>
                </div>
            </div>
            <div className="collection__tool-bar_v">
                <TextButton size="m" onClick={jumpToCheckList}>↓</TextButton>
            </div>
        </div>
    );
}

export default Collection;